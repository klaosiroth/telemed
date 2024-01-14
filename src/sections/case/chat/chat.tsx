import React, { useCallback, useEffect, useState } from 'react';
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
