import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import { useCallback } from 'react';
import { PatientTableFilterValue, PatientTableFilters } from 'src/types/patient';

type Props = {
  filters: PatientTableFilters;
  onFilters: (name: string, value: PatientTableFilterValue) => void;
  canReset: boolean;
  onResetFilters: VoidFunction;
};

export default function PatientTableToolbar({
  filters,
  onFilters,
  canReset,
  onResetFilters,
}: Props) {
  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ p: 2.5 }}
    >
      <TextField
        fullWidth
        value={filters.name}
        onChange={handleFilterName}
        placeholder="ค้นหาชื่อผู้ป่วยหรือรหัส..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {canReset && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          ล้าง
        </Button>
      )}
    </Stack>
  );
}
