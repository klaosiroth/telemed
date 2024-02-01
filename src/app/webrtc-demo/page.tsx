'use client';

/* eslint-disable jsx-a11y/media-has-caption */
import { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
// import styles from './page.module.css';
import './styles.css';

const socket = io('http://localhost:8000', {
  autoConnect: false,
});

const roomId = 'webrtc-demo';
// const iceConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

export default function Page() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [stream, setStream] = useState<MediaStream>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    socket.connect();
    setIsConnected(true);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('componentDidMount');
    navigator.mediaDevices.getUserMedia({ audio: true }).then((localStream) => {
      setStream(localStream);
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;

      // Setup peer connection
      const peerConnection = new RTCPeerConnection();

      localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', {
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
            room: roomId,
          });
        }
      };

      peerConnection.ontrack = (event) => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
      };

      socket.emit('audio:create or join', roomId);
    });

    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('candidate', handleCandidate);

    return () => {
      console.log('componentWillUnmount');
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('candidate', handleCandidate);
    };
  }, []);

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    // if (pcRef.current) {
    //   console.error("existing peerconnection");
    //   return;
    // }
    // await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
    // const answer = await pcRef.current.createAnswer();
    // await pcRef.current.setLocalDescription(answer);
    // socket.emit("answer", {
    //   type: "answer",
    //   sdp: answer,
    //   room: roomId,
    // });
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    // if (!pcRef.current) {
    //   console.error("no peerconnection");
    //   return;
    // }
    // await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleCandidate = async (candidate: RTCIceCandidate) => {
    // if (!pcRef.current) {
    //   console.error("no peerconnection");
    //   return;
    // }
    // await pcRef.current.addIceCandidate(candidate);
    // --------------------------------
    // if (!pcRef.current) {
    //   console.error('no peerconnection');
    //   return;
    // }

    // try {
    //   await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    // } catch (error) {
    //   console.error('Error adding ICE candidate:', error);
    // }
  };

  const makeCall = useCallback(async () => {
    // if (pcRef.current) {
    //   const offer = await pcRef.current.createOffer();
    //   await pcRef.current.setLocalDescription(offer);
    //   socket.emit("offer", {
    //     type: "offer",
    //     sdp: offer,
    //     room: roomId,
    //   });
    // }
  }, []);

  return (
    <>
      <h2>Real time communication with WebRTC</h2>
      <p>State: {`${isConnected}`}</p>

      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />

      <div>
        <button type="button" onClick={makeCall}>
          Call
        </button>
      </div>
    </>
  );
}
