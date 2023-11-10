// @mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { DrugCategory } from 'src/types/drug';
// components
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  index: number;
  row: DrugCategory;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function DrugCategoryTableRow({ index, row, onEditRow, onDeleteRow }: Props) {
  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row.drugCategoryName}</TableCell>
        <TableCell>This is an example category&apos;s drug with some details.</TableCell>
        <TableCell>createdAt</TableCell>
        <TableCell align="right">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
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
