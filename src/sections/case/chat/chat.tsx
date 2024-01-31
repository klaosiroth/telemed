/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card, Divider, IconButton, Stack } from '@mui/material';
import { socket } from 'src/utils/socket';
import { useParams } from 'src/routes/hook';
import { useAuthContext } from 'src/auth/hooks';
import { TChatMessage } from 'src/types/chat';
import Iconify from 'src/components/iconify';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import ChatMessageInput from './chat-message-input';
import ChatMessageList from './chat-message-list';

export default function Chat() {
  const { id: caseId } = useParams();
  const { user } = useAuthContext();
  const [messages, setMessages] = useState<TChatMessage[]>([]);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const audioStream = useRef<MediaStream | null>(null);
  const [hasCallBeenMade, setHasCallBeenMade] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`${API_ENDPOINTS.chats}/${caseId}`);
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching chat data:', error);
      // Handle the error, e.g., show a user-friendly message to the user
    }
  }, [caseId]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.emit('chat:room', caseId);
      socket.emit('audio:create or join', caseId);
    }

    const handleConnectError = (error: unknown) => {
      console.error('Socket connection error:', error);
    };

    socket.on('connect_error', handleConnectError);

    fetchData();

    return () => {
      socket.off('connect_error', handleConnectError);
      socket.disconnect();
    };
  }, [caseId, fetchData]); // Only run the effect on mount and unmount

  useEffect(() => {
    setupMedia();

    const handleReceiveMessage = (message: TChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('chat:message', handleReceiveMessage);
    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('candidate', handleCandidate);

    return () => {
      socket.off('chat:message', handleReceiveMessage);
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('candidate', handleCandidate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendMessage = (message: string) => {
    const payload = {
      message,
      senderId: user?.userId,
      roomId: caseId,
    };

    socket.emit('chat:message', payload);
    axiosInstance.post(API_ENDPOINTS.chats, payload);
  };

  const setupMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true },
      });
      audioStream.current = stream;
      if (localAudioRef.current) localAudioRef.current.srcObject = stream;
      const iceConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
      pcRef.current = new RTCPeerConnection(iceConfig);

      stream.getTracks().forEach((track) => pcRef.current!.addTrack(track, stream));

      pcRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('audio:candidate', {
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
            room: caseId,
          });
        }
      };

      pcRef.current.ontrack = (event) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = event.streams[0];
        }
      };
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  }, [caseId]);

  async function makeCall() {
    if (pcRef.current) {
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);
      socket.emit('audio:offer', {
        type: 'offer',
        sdp: offer,
        room: caseId,
      });
    }
  }

  async function handleOffer(offer: RTCSessionDescriptionInit) {
    if (!pcRef.current) {
      console.error('existing peerconnection');
      return;
    }
    await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pcRef.current.createAnswer();
    await pcRef.current.setLocalDescription(answer);
    socket.emit('audio:answer', {
      type: 'answer',
      sdp: answer,
      room: caseId,
    });

    // if (pcRef.current) {
    //   await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
    //   const answer = await pcRef.current.createAnswer();
    //   await pcRef.current.setLocalDescription(answer);
    //   socket.emit('audio:answer', {
    //     type: 'answer',
    //     sdp: answer,
    //     room: caseId,
    //   });
    // }
  }

  async function handleAnswer(answer: RTCSessionDescriptionInit) {
    if (!pcRef.current) {
      console.error('no peerconnection');
      return;
    }
    await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));

    // if (pcRef.current) {
    //   await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    // }
  }

  async function handleCandidate(candidate: RTCIceCandidate) {
    if (!pcRef.current) {
      console.error('no peerconnection');
      return;
    }
    await pcRef.current.addIceCandidate(candidate);

    // pcRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
  }

  const toggleAudio = async () => {
    if (!isAudioEnabled && !hasCallBeenMade) {
      await makeCall();
      setHasCallBeenMade(true);
    }

    if (audioStream.current) {
      audioStream.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <>
      <Stack component={Card} sx={{ height: '600px' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
          flexShrink={0}
          sx={{ height: 48, pl: 2, pr: 1 }}
        >
          <IconButton onClick={toggleAudio}>
            {isAudioEnabled ? (
              <Iconify width={18} icon="heroicons-solid:microphone" />
            ) : (
              <Iconify width={18} icon="heroicons-solid:microphone" color="red" />
            )}
          </IconButton>
          <IconButton>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          <ChatMessageList messages={messages} />
          <ChatMessageInput onSendMessage={handleSendMessage} />
        </Stack>
      </Stack>
      <audio ref={localAudioRef} autoPlay controls muted />
      <audio ref={remoteAudioRef} autoPlay controls />
      {/* <audio ref={localAudioRef} autoPlay controls style={{ display: 'none' }} />
      <audio ref={remoteAudioRef} autoPlay controls style={{ display: 'none' }} /> */}
    </>
  );
}
