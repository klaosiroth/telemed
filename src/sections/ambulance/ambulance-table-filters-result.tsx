// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = StackProps & {
  onResetFilters: VoidFunction;
  results: number;
};

export default function AmbulanceTableFiltersResult({ onResetFilters, results, ...other }: Props) {
  return (
    <Stack spacing={1.5} {...other}>
      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        <Box sx={{ typography: 'body2' }}>
          <strong>{results}</strong>
          <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
            ผลลัพธ์ที่ตรงกัน
          </Box>
        </Box>

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          ล้าง
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------
