/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card, Divider, IconButton, Stack } from '@mui/material';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { AGORA } from 'src/config-global';
import { socket } from 'src/utils/socket';
import { useParams } from 'src/routes/hook';
import { useAuthContext } from 'src/auth/hooks';
import { TChatMessage } from 'src/types/chat';
import Iconify from 'src/components/iconify';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import ChatMessageInput from './chat-message-input';
import ChatMessageList from './chat-message-list';

const channel = 'ambulance';

export default function Chat() {
  const { id: caseId } = useParams();
  const { user } = useAuthContext();
  const [messages, setMessages] = useState<TChatMessage[]>([]);
  // const localAudioRef = useRef<HTMLAudioElement>(null);
  // const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const client = useRef<any>(null);
  const localStream = useRef<any>(null);
  const remoteStream = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(false);

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
    const handleReceiveMessage = (message: TChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('chat:message', handleReceiveMessage);

    return () => {
      socket.off('chat:message', handleReceiveMessage);
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

  useEffect(() => {
    async function initializeAgora() {
      client.current = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });

      // Initialize local stream
      localStream.current = await AgoraRTC.createMicrophoneAudioTrack();
      await client.current.join(AGORA.appId, channel, AGORA.token || null, null);

      // Join the Agora channel
      client.current.on('user-published', async (streamId: any, mediaType: any) => {
        console.log('streamId ====', streamId);
        await client.current.subscribe(streamId, mediaType);
        if (mediaType === 'audio') {
          remoteStream.current = streamId.audioTrack;
          remoteStream.current.play('remote-container');
        }
      });

      client.current.on('user-unpublished', () => {
        if (remoteStream.current) {
          remoteStream.current.stop();
        }
      });

      client.current.publish(localStream.current);
    }

    initializeAgora();

    return () => {
      if (client.current) {
        client.current.leave();
      }
    };
  }, [caseId]);

  const toggleMute = () => {
    if (localStream.current) {
      if (!isMuted) {
        localStream.current.setEnabled(false);
      } else {
        localStream.current.setEnabled(true);
      }
      setIsMuted(!isMuted);
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
          <IconButton onClick={toggleMute}>
            {isMuted ? (
              <Iconify width={18} icon="heroicons-solid:microphone" color="red" />
            ) : (
              <Iconify width={18} icon="heroicons-solid:microphone" />
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
      {/* <div id="local-container" style={{ width: '320px', height: '240px' }} />
      <div id="remote-container" style={{ width: '320px', height: '240px' }} /> */}
      {/* <audio ref={localAudioRef} autoPlay controls muted style={{ display: 'none' }} />
      <audio ref={remoteAudioRef} autoPlay controls style={{ display: 'none' }} /> */}
    </>
  );
}
