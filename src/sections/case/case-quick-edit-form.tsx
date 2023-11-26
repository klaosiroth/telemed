import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// utils
import { PREFIX_OPTIONS } from 'src/constants';
// types
import { ICase } from 'src/types/case';
// components
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentData?: ICase;
  paramId?: string;
  updateData: (newData: FormValuesProps) => void;
};

type FormValuesProps = ICase;

export default function CaseQuickEditForm({
  paramId,
  currentData,
  open,
  onClose,
  updateData,
}: Props) {
  const defaultValues = useMemo(() => {
    const birthdate = currentData?.birthdate ? new Date(currentData.birthdate) : null;
    return {
      prefixModal: currentData?.prefixModal || 0,
      firstname: currentData?.firstname || '',
      lastname: currentData?.lastname || '',
      birthdate, // Use the parsed birthdate
      idcard: currentData?.idcard || '',
      idcardExpireDate: currentData?.idcardExpireDate
        ? new Date(currentData.idcardExpireDate)
        : null,
      passportNo: currentData?.passportNo || '',
      passportExpireDate: currentData?.passportExpireDate || null,
      phone: currentData?.phone || '',
      mobile: currentData?.mobile || '',
    };
  }, [currentData]);

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await axiosInstance.patch(`${API_ENDPOINTS.cases}/${paramId}`, data);
        onClose();
        // Call the callback function to update the data in the parent component
        updateData(data);
        console.info('DATA', data);
      } catch (error) {
        console.error(error);
      }
    },
    [onClose, paramId, updateData]
  );

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
      open={open}
      onClose={onClose}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>แก้ไขข้อมูลผู้ป่วย</DialogTitle>
        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            mt={1}
          >
            <RHFSelect name="prefixModal" label="คำนำหน้า">
              {PREFIX_OPTIONS.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField name="firstname" label="ชื่อ" />
            <RHFTextField name="lastname" label="นามสกุล" />
            <Controller
              name="birthdate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="วันเกิด"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
            <RHFTextField name="idcard" label="เลขบัตรประจำตัวประชาชน" />
            <Controller
              name="idcardExpireDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="วันบัตรหมดอายุ"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
            <RHFTextField name="passportNo" label="เลขที่หนังสือเดินทาง" />
            <Controller
              name="passportExpireDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="วันหมดอายุหนังสือเดินทาง"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
            <RHFTextField name="phone" label="เบอร์มือถือ" />
            <RHFTextField name="mobile" label="เบอร์โทรศัพท์" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            ยกเลิก
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            อัปเดต
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
