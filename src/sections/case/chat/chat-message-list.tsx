import { useCallback, useEffect, useRef } from 'react';
import Box from '@mui/system/Box';
import { TChatMessage } from 'src/types/chat';
import Scrollbar from 'src/components/scrollbar';
import ChatMessageItem from './chat-message-item';

type Props = {
  messages: TChatMessage[];
};

export default function ChatMessageList({ messages }: Props) {
  const scrollbarRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (scrollbarRef.current) {
  //     // @ts-ignore
  //     scrollbarRef.current.scrollIntoView({ smooth: true });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (scrollbarRef.current) {
  //     // Scroll to the bottom of the chat when new messages are received
  //     scrollbarRef.current.scrollTop = scrollbarRef.current.scrollHeight;
  //   }
  // }, [messages]);

  const scrollMessagesToBottom = useCallback(() => {
    if (!messages) {
      return;
    }

    if (!scrollbarRef.current) {
      return;
    }

    if (scrollbarRef.current) {
      scrollbarRef.current.scrollTop = scrollbarRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    scrollMessagesToBottom();
  }, [scrollMessagesToBottom]);

  return (
    <Scrollbar ref={scrollbarRef} sx={{ p: 3, height: 1 }}>
      <Box>
        {messages.map((message) => (
          <ChatMessageItem key={message.id} messages={message} />
        ))}
      </Box>
    </Scrollbar>
  );
}
