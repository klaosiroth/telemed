// @mui
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { User } from 'src/types/user';
import { fDate } from 'src/utils/format-time';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  index: number;
  row: User;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({ index, row, onEditRow, onDeleteRow }: Props) {
  const confirm = useBoolean();
  const popover = usePopover();

  const { firstname, lastname, phone, email, createdAt, isActive } = row;
  const formattedDate = fDate(createdAt, 'dd/MM/yyyy');

  return (
    <>
      <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{`${firstname} ${lastname}`}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{formattedDate}</TableCell>
        <TableCell>
          <Label variant="soft" color={(isActive === true && 'success') || 'error'}>
            {isActive ? 'ใช้งาน' : 'ไม่ใช้งาน'}
          </Label>
        </TableCell>

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
