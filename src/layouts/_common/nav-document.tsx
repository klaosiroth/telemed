// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// hooks
// routes
import { paths } from 'src/routes/paths';
// components

// ----------------------------------------------------------------------

export default function NavDocument() {
  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Button variant="contained" href={paths.userManual} target="_blank" rel="noopener">
          คู่มือการใช้งาน
        </Button>
        <Stack spacing={0.5} sx={{ mt: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            ต้องการความช่วยเหลือ?
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
