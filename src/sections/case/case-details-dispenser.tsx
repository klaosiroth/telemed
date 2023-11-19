import { Box, Card, CardHeader, IconButton } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import CaseDetailsDispenserForm from './case-details-dispenser-form';

export default function CaseDetailsDispenser() {
  const quickEdit = useBoolean();

  return (
    <>
      <Card sx={{ height: 1 }}>
        <CardHeader
          title="รายการจ่ายยา"
          action={
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          }
        />
        <Box sx={{ px: 3 }}>
          <ul>
            <li>คลอร์เฟนิรามีนมาลีเอต (chlorpheniramine maleate) - 10 มิลลิกรัม</li>
            <li>แวเลียม (Valium) - 5 มิลลิกรัม</li>
          </ul>
        </Box>
      </Card>

      <CaseDetailsDispenserForm
        currentData="123"
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />
    </>
  );
}
