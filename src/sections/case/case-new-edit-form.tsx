import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
//
import { Case, CreateCaseDTO, CreateCaseMissionDTO } from 'src/types/case';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import { PREFIX_OPTIONS } from 'src/constants';

// Define your form schemas and options
const Schema = Yup.object().shape({
  // Define validation schema
});

type Props = {
  currentData?: Case;
};

type FormValuesProps = CreateCaseDTO | CreateCaseMissionDTO;

export default function CaseNewEditForm({ currentData }: Props) {
  const router = useRouter();

  const confirm = useBoolean();

  const defaultValues = useMemo(
    () => ({
      prefixModal: currentData?.prefixModal || 0,
      firstname: currentData?.firstname || '',
      lastname: currentData?.lastname || '',
      birthdate: currentData?.birthdate || null,
      idcard: currentData?.idcard || '',
      idcardExpireDate: currentData?.idcardExpireDate || null,
      passportNo: currentData?.passportNo || '',
      passportExpireDate: currentData?.passportExpireDate || null,
      phone: currentData?.phone || '',
      mobile: currentData?.mobile || '',
      isActive: currentData?.isActive || true,
      severityLevel: 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentData]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, watch, control, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (currentData) {
      reset(defaultValues);
    }
  }, [currentData, defaultValues, reset]);

  const handleConfirm = () => {
    confirm.onTrue();
  };

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        const response = await axiosInstance.post(API_ENDPOINTS.cases, data);
        const newCaseId = response.data.caseId;
        const caseMissionData = {
          caseId: newCaseId,
          // * Set default values for new case mission
          // prefixModal: 1,
          // dateStartMission: new Date(),
        };
        await axiosInstance.post(API_ENDPOINTS.caseMissions.start, { caseMissionData });
        router.push(paths.dashboard.case.details(newCaseId));
        console.info('Form submitted:', data, caseMissionData);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [router]
  );

  console.log('values', values);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 3 }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
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

            <RHFTextField name="phone" label="เบอร์โทรศัพท์" />
            <RHFTextField name="mobile" label="เบอร์โทรศัพท์มือถือ" />
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
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <Button variant="contained" onClick={handleConfirm}>
              {!currentData ? 'เริ่มภารกิจ' : 'อัพเดต'}
            </Button>
          </Stack>
        </Card>
      </FormProvider>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="ยืนยันการเปิดภารกิจ ช่วยเหลือผู้ป่วย"
        content={
          <>
            เริ่มออกปฏิบัติการ <strong>{getCurrentDateTimeString()}</strong>
          </>
        }
        action={
          <Button variant="contained" color="primary" onClick={() => handleSubmit(onSubmit)()}>
            ยืนยัน
          </Button>
        }
      />
    </>
  );
}

const getCurrentDateTimeString = () => {
  const now = new Date();
  const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear() + 543}`;
  const hours = now.getHours();
  const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const formattedTime = `${hours}.${minutes} น.`;
  return `วันที่ ${formattedDate} เวลา ${formattedTime}`;
};
