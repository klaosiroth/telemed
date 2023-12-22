/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Card, Divider, IconButton, Stack } from '@mui/material';
import { socket } from 'src/utils/socket';
import { useParams } from 'src/routes/hook';
import { useAuthContext } from 'src/auth/hooks';
import { TChatMessage } from 'src/types/chat';
import Iconify from 'src/components/iconify';
import ChatMessageInput from './chat-message-input';
import ChatMessageList from './chat-message-list';

export default function Chat() {
  const { id: caseId } = useParams();
  const { user } = useAuthContext();
  const [messages, setMessages] = useState<TChatMessage[]>([]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.emit('chat:room', caseId);
    }

    const handleConnectError = (error: unknown) => {
      console.error('Socket connection error:', error);
    };

    socket.on('connect_error', handleConnectError);

    return () => {
      socket.off('connect_error', handleConnectError);
      socket.disconnect();
    };
  }, [caseId]); // Only run the effect on mount and unmount

  useEffect(() => {
    const handleReceiveMessage = (message: TChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('chat:message', handleReceiveMessage);

    return () => {
      socket.off('chat:message', handleReceiveMessage);
    };
  }, []);

  const handleSendMessage = (message: string) => {
    socket.emit('chat:message', {
      message,
      senderId: user?.userId,
      roomId: caseId,
    });
  };

  return (
    <Stack component={Card} sx={{ height: '600px' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        flexGrow={1}
        flexShrink={0}
        sx={{ height: 48, pl: 2, pr: 1 }}
      >
        <IconButton>
          <Iconify width={18} icon="heroicons-solid:microphone" />
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
  );
}
