import { useState } from 'react';
import InputBase from '@mui/material/InputBase';

interface Props {
  onSendMessage: (message: string) => void;
}

export default function ChatMessageInput({ onSendMessage }: Props) {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (message) {
        onSendMessage(message);
        console.log(message);
      }
      setMessage(''); // Clear the input field after sending the message
    }
  };

  return (
    <InputBase
      value={message}
      onKeyUp={handleSendMessage}
      onChange={handleMessageChange}
      placeholder="พิมพ์ข้อความ..."
      sx={{
        px: 2,
        height: 56,
        flexShrink: 0,
        borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    />
  );
}
