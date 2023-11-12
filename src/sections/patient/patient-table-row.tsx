import { add, differenceInMonths, differenceInYears, format, parseISO } from 'date-fns';
// @mui
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { Patient } from 'src/types/patient';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  index: number;
  row: Patient;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function PatientTableRow({ index, row, onEditRow, onDeleteRow }: Props) {
  const confirm = useBoolean();

  const popover = usePopover();

  const {
    hn,
    prefixTh,
    birthdate,
    firstnameTh,
    lastnameTh,
    nationality,
    phone,
    mobile,
    isActive,
    // ... other properties
  } = row;

  // Format the birthdate using date-fns
  // const formattedBirthdate = birthdate ? format(parseISO(birthdate), 'yyyy-MM-dd') : '';

  // Convert the birthdate to Buddhist Era (พ.ศ.) by adding 543 years
  const formattedBirthdate = birthdate
    ? format(add(parseISO(birthdate), { years: 543 }), 'dd/MM/yyyy')
    : '';

  // Calculate the age from the birthdate
  const age = birthdate ? calculateAge(parseISO(birthdate)) : { years: 0, months: 0 };

  return (
    <>
      <TableRow>
        <TableCell>{index + 1}</TableCell>

        <TableCell>{hn}</TableCell>

        <TableCell>{createFullname(prefixTh, firstnameTh, lastnameTh)}</TableCell>

        <TableCell>{formattedBirthdate}</TableCell>

        <TableCell>
          {age.years} ปี {age.months} เดือน
        </TableCell>

        <TableCell>{NATIONALITY_LABELS[nationality]}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone || mobile}</TableCell>

        <TableCell>สร้างเมื่อ</TableCell>

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

// ----------------------------------------------------------------------

export const calculateAge = (birthdate: Date): { years: number; months: number } => {
  const currentDate = new Date();
  const years = differenceInYears(currentDate, birthdate);
  const months = differenceInMonths(currentDate, birthdate) % 12;
  return { years, months };
};

const createFullname = (prefix: number, firstname: string, lastname: string): string => {
  const fullname = `${PREFIX_LABELS[prefix]} ${firstname} ${lastname}`;
  return fullname;
};

const PREFIX_LABELS: { [key: number]: string } = {
  1: 'ดช.',
  2: 'ดญ.',
  3: 'นาย',
  4: 'นางสาว',
  5: 'นาง',
  6: 'อื่นๆ',
};

const NATIONALITY_LABELS: { [key: number]: string } = {
  1: 'คนไทย',
  2: 'ต่างชาติ',
  // Add more entries as needed
};
