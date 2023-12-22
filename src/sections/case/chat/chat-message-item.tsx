import { formatDistanceToNowStrict } from 'date-fns';
import { Stack, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { TChatMessage } from 'src/types/chat';

type Props = {
  messages: TChatMessage;
  // isMe: boolean;
};

export default function ChatMessageItem({ messages }: Props) {
  const { user } = useAuthContext();
  const { firstname, userId }: any = user;
  const { message, createdAt, senderId } = messages;

  const isMe = senderId === userId;

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...(!isMe && {
          mr: 'auto',
        }),
      }}
    >
      {!isMe && `${firstname},`} &nbsp;
      {formatDistanceToNowStrict(new Date(createdAt), {
        addSuffix: true,
      })}
    </Typography>
  );

  const renderBody = (
    <Typography
      variant="body2"
      sx={{
        p: 1,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        bgcolor: 'background.neutral',
        ...(isMe && {
          color: 'grey.800',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {message}
    </Typography>
  );
  return (
    <Stack direction="row" justifyContent={isMe ? 'flex-end' : 'unset'} sx={{ mb: 2 }}>
      <Stack alignItems={isMe ? 'flex-end' : 'unset'}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: 'relative',
            '&:hover': {
              '& .message-actions': {
                opacity: 1,
              },
            },
          }}
        >
          {renderBody}
        </Stack>

        {/* {renderInfo} */}
      </Stack>
    </Stack>
  );
}
