// @mui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { Drug } from 'src/types/drug';
// components
import Iconify from 'src/components/iconify';
import { fDate } from 'src/utils/format-time';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  index: number;
  row: Drug;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function DrugTableRow({ index, row, onEditRow, onDeleteRow }: Props) {
  const confirm = useBoolean();

  const popover = usePopover();

  const formattedDate = fDate(row.createdAt, 'dd/MM/yyyy');

  return (
    <>
      <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row.drugCategory.drugCategoryName}</TableCell>
        <TableCell>{row.drugName}</TableCell>
        <TableCell>{row.drugGenericName}</TableCell>
        <TableCell>{formattedDate}</TableCell>
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          แก้ไข
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          ลบ
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="ยืนยันการลบข้อมูล"
        content="คุณแน่ใจหรือไม่ว่าต้องการลบ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            ลบข้อมูล
          </Button>
        }
      />
    </>
  );
}
