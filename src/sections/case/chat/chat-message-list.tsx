import React from 'react';
import Box from '@mui/system/Box';
import Scrollbar from 'src/components/scrollbar';
import ChatMessageItem from './chat-message-item';

type Props = {
  messages: any[];
};

export default function ChatMessageList({ messages }: Props) {
  const scrollbarRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollbarRef.current) {
      // @ts-ignore
      scrollbarRef.current.scrollIntoView({ smooth: true });
    }
  }, []);

  console.log('messages', messages);

  return (
    <Scrollbar ref={scrollbarRef} sx={{ p: 3, height: 1 }}>
      <Box>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
        {/* {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              isMine={message.senderId === currentUser.id}
            />
          ))} */}
      </Box>
    </Scrollbar>
  );
}
