import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = {
  heading: string;
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function TitleBar({ heading, action, sx }: Props) {
  return (
    <Box
      sx={{
        mb: { xs: 3, md: 5 },
        ...sx,
      }}
    >
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>{heading && <Typography variant="h4">{heading}</Typography>}</Box>

        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>
    </Box>
  );
}
