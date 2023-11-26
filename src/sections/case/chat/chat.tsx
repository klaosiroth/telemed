/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Card, Divider, IconButton, Stack } from '@mui/material';

import Iconify from 'src/components/iconify';
import ChatMessageInput from './chat-message-input';
import ChatMessageList from './chat-message-list';

const socket = io('http://13.229.132.31:3000'); // Replace with your server URL
// const socket = io('http://localhost:3000', {
//   transports: ['websocket'],
// });

export type IChatMessage = {
  id: string;
  body: string;
  createdAt: Date;
  senderId: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // // Set up event listener for receiving messages from the server
    // socket.on('message', ({ data: message }) => {
    //   // When a new message arrives, update the state to include the message
    //   setMessages((prevMessages) => [...prevMessages, message]);
    // });

    // // Clean up the event listener when the component unmounts
    // return () => {
    //   socket.off('message');
    // };

    const handleReceiveMessage = ({ data: message }: any) => {
      console.log('data message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleConnectError = (error: unknown) => {
      console.error('Socket connection error:', error);
    };

    socket.on('message', handleReceiveMessage);
    socket.on('connect_error', handleConnectError);

    return () => {
      socket.off('message', handleReceiveMessage);
      socket.off('connect_error', handleConnectError);
      // socket.disconnect();
    };
  }, []); // Only run the effect on mount and unmount

  const handleSendMessage = (message: string) => {
    // const newMessage: IChatMessage = {
    //   id: `${Date.now()}`, // You might want to generate a unique ID differently
    //   body: message,
    //   createdAt: new Date(),
    //   senderId: 'user123', // Replace with the actual sender ID
    // };

    // Emit a 'message' event to the server with the new message
    socket.emit('message', { data: message });
  };

  return (
    <Stack component={Card} sx={{ height: '100%' }}>
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
  // --------------------------------------------------
  // const [messages, setMessages] = useState<string[]>([]);
  // const [message, setMessage] = useState('');
  // const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setMessage(event.target.value);
  // };
  // const handleSendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     if (message) {
  //       socket.emit('message', message);
  //       console.log(message);
  //     }
  //     setMessage('');
  //   }
  // };
  // socket.on('message', (message) => {
  //   setMessages([...messages, message]);
  // });
  // return (
  //   <Card>
  //     <Stack
  //       sx={{
  //         width: 1,
  //         height: 1,
  //         overflow: 'hidden',
  //       }}
  //     >
  //       <ChatMessageList messages={messages} />
  //       <ChatMessageInput
  //         onSendMessage={handleSendMessage}
  //         message={message}
  //         handleMessageChange={handleMessageChange}
  //       />
  //     </Stack>
  //   </Card>
  // );
  // --------------------------------------------------
  // const [inputMessage, setInputMessage] = useState('');
  // const [messages, setMessages] = useState<string[]>([]);
  // const handleSubmitNewMessage = () => {
  //   console.log('Emit message');
  //   socket.emit('message', { data: inputMessage });
  //   setInputMessage(''); // Clear the input field after sending the message
  // };
  // const handleNewMessage = (message: string) => {
  //   console.log('handleNewMessage =', message);
  //   setMessages((currentMessages) => [...currentMessages, message]);
  //   setMessages([...messages, message]);
  // };
  // useEffect(() => {
  //   // Listen for 'message' events on the socket
  //   socket.on('message', ({ data }) => {
  //     console.log('On message =', data);
  //     handleNewMessage(data);
  //   });
  //   // Cleanup: Remove the event listener when the component unmounts
  //   return () => {
  //     socket.off('message');
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [messages]); // Re-run the effect if the 'messages' state changes
  // const buildNewMessage = (message: string, index: any) => {
  //   console.log('buildMessage =', message);
  //   return <li key={index}>{message}</li>;
  // };
  // return (
  //   <div>
  //     <ul id="messages">{messages.map((message, index) => buildNewMessage(message, index))}</ul>
  //     <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
  //     <button type="submit" onClick={handleSubmitNewMessage}>
  //       Send
  //     </button>
  //   </div>
  // );
  // --------------------------------------------------
  // const [messages, setMessages] = useState<string[]>([]);
  // const handleSendMessage = (message: string) => {
  //   setMessages([...messages, message]);
  // };
  // return (
  //   <>
  //     <Card>
  //       <Stack
  //         sx={{
  //           width: 1,
  //           height: 1,
  //           overflow: 'hidden',
  //         }}
  //       >
  //         <ChatMessageList messages={messages} />
  //         <ChatMessageInput onSendMessage={handleSendMessage} />
  //       </Stack>
  //     </Card>
  //     <div>Chat</div>
  //   </>
  // );
}

// const currentUser = {
//   id: '1',
//   name: 'John Doe',
//   avatar: '/static/mock-images/avatars/avatar_1.jpg',
// };

const messages = [
  {
    id: '1',
    senderId: '1',
    createdAt: '2021-09-29T00:00:00.000Z',
    body: 'Hello',
  },
  {
    id: '2',
    senderId: '2',
    createdAt: '2021-09-29T00:00:00.000Z',
    body: 'Hi',
  },
  {
    id: '3',
    senderId: '1',
    createdAt: '2021-09-29T00:00:00.000Z',
    body: 'How are you?',
  },
  {
    id: '4',
    senderId: '2',
    createdAt: '2021-09-29T00:00:00.000Z',
    body: 'I am fine, thanks',
  },
  {
    id: '5',
    senderId: '1',
    createdAt: '2021-09-29T00:00:00.000Z',
    body: 'Good to hear that',
  },
  {
    id: '6',
    senderId: '2',
    createdAt: '2021-09-29T00:00:00.000Z',
    body: '😊',
  },
  {
    id: '7',
    senderId: '1',
    createdAt: '2021-09-29T00:00:00.000Z',
    body: 'See you later',
  },
  {
    id: '8',
    senderId: '2',
    createdAt: '2021-09-29T00:00:00.000Z',
    body: 'Bye',
  },
];
