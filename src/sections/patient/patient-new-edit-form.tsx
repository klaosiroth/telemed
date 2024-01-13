'use client';

import { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// routes
import { useParams, useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// types
import { AddressItem } from 'src/types/address';
import { Patient } from 'src/types/patient';
// components
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
//
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import {
  BLOOD_GROUP_OPTIONS,
  GENDER_OPTIONS,
  MARRIAGE_OPTIONS,
  NATIONALITY_OPTIONS,
  PREFIX_OPTIONS,
  RELIGION_OPTIONS,
  STATUS_OPTIONS,
} from 'src/constants';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'info', label: 'ข้อมูลทั่วไป' },
  { value: 'address', label: 'ที่อยู่' },
];

// Define your form schemas and options
const InfoFormSchema = Yup.object().shape({
  // Define validation schema for the information form
  // ...
});

const AddressFormSchema = Yup.object().shape({
  // Define validation schema for the address form
  // ...
});

type Props = {
  currentData?: Patient;
};

type FormValuesProps = Patient | AddressItem;

export default function PatientNewEditForm({ currentData }: Props) {
  const { id } = useParams();

  const router = useRouter();

  const [currentTab, setCurrentTab] = useState('info');

  const defaultValues = useMemo(
    () => ({
      prefixTh: currentData?.prefixTh || 0,
      firstnameTh: currentData?.firstnameTh || '',
      lastnameTh: currentData?.lastnameTh || '',
      gender: currentData?.gender || 0,
      nationality: currentData?.nationality || 0,
      religion: currentData?.religion || 0,
      idcard: currentData?.idcard || '',
      idcardExpireDate: currentData?.idcardExpireDate || null,
      birthdate: currentData?.birthdate || null,
      bloodGroup: currentData?.bloodGroup || 0,
      marriage: currentData?.marriage || 0,
      passportNo: currentData?.passportNo || '',
      passportExpireDate: currentData?.passportExpireDate || null,
      basePassportCountryId: currentData?.basePassportCountryId || '',
      phone: currentData?.phone || '',
      mobile: currentData?.mobile || '',
      email: currentData?.email || '',
      isActive: currentData?.isActive || true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentData]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(currentTab === 'info' ? InfoFormSchema : AddressFormSchema),
    defaultValues,
  });

  const { reset, watch, control, handleSubmit, formState } = methods;
  const { isSubmitting } = formState;
  const values = watch();

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        if (!currentData) {
          await axiosInstance.post(API_ENDPOINTS.patients, data);
        } else {
          await axiosInstance.patch(`${API_ENDPOINTS.patients}/${id}`, data);
        }
        reset();
        router.push(paths.dashboard.patient.root);
        console.info('Form submitted:', data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [currentData, id, reset, router]
  );

  const renderInfo = (
    <>
      <RHFSelect name="prefixTh" label="คำนำหน้า">
        {PREFIX_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </RHFSelect>

      <RHFTextField name="firstnameTh" label="ชื่อ" />

      <RHFTextField name="lastnameTh" label="นามสกุล" />

      <RHFSelect name="gender" label="เพศ">
        {GENDER_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </RHFSelect>

      <RHFSelect name="nationality" label="สัญชาติ">
        {NATIONALITY_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </RHFSelect>

      <RHFSelect name="religion" label="ศาสนา">
        {RELIGION_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </RHFSelect>

      <RHFTextField name="idcard" label="เลขบัตรประจำตัวประชาชน" />

      <Controller
        name="idcardExpireDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="วันบัตรหมดอายุ"
            format="dd/MM/yyyy"
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

      <RHFSelect name="bloodGroup" label="กลุ่มเลือด">
        {BLOOD_GROUP_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </RHFSelect>

      <RHFSelect name="marriage" label="สถานภาพสมรส">
        {MARRIAGE_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </RHFSelect>

      <RHFTextField name="passportNo" label="เลขที่หนังสือเดินทาง" />

      <Controller
        name="passportExpireDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="วันหมดอายุหนังสือเดินทาง"
            format="dd/MM/yyyy"
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

      <RHFTextField name="basePassportCountryId" label="ประเทศที่ออกหนังสือเดินทาง" />

      <RHFTextField name="phone" label="เบอร์โทรศัพท์" />

      <RHFTextField name="mobile" label="เบอร์โทรศัพท์มือถือ" />

      <RHFTextField name="email" label="อีเมล" />

      <RHFSelect name="isActive" label="สถานะ">
        {STATUS_OPTIONS.map((option: any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </RHFSelect>
    </>
  );

  const renderAddress = (
    <>
      <Stack spacing={1.5}>
        <Typography variant="subtitle2">บ้านเลขที่</Typography>
        <RHFTextField name="house_no" placeholder="Ex: ตัวอย่าง..." />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">หมู่บ้าน / อาคาร / ตึก</Typography>
        <RHFTextField name="address1" placeholder="Ex: ตัวอย่าง..." />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">หมู่ที่</Typography>
        <RHFTextField name="address2" placeholder="Ex: ตัวอย่าง..." />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">ซอย</Typography>
        <RHFTextField name="lane" placeholder="Ex: ตัวอย่าง..." />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">ถนน</Typography>
        <RHFTextField name="road" placeholder="Ex: ตัวอย่าง..." />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">ตำบล / แขวง</Typography>
        <RHFTextField name="sub_district" placeholder="Ex: ตัวอย่าง..." />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">อำเภอ / เขต</Typography>
        <RHFTextField name="district" placeholder="Ex: ตัวอย่าง..." />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">จังหวัด</Typography>
        <RHFTextField name="province" placeholder="Ex: ตัวอย่าง..." />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">รหัสไปรษณีย์</Typography>
        <RHFTextField name="postal_code" placeholder="Ex: ตัวอย่าง..." />
      </Stack>
    </>
  );

  console.log('values', values);

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(3, 1fr)',
                }}
              >
                {currentTab === 'info' && renderInfo}

                {currentTab === 'address' && renderAddress}
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentData ? 'บันทึกข้อมูล' : 'อัพเดตข้อมูล'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

// interface CreatePatientDto {
//   nationality: number;
//   prefixTh: number;
//   prefixEn: number;
//   gender: number;
//   birthdate: string; // Should be a valid date-time format
//   firstnameTh: string;
//   firstnameEn: string;
//   lastnameTh: string;
//   lastnameEn: string;
//   idcard: string;
//   idcardExpireDate: string; // Should be a valid date-time format
//   passportNo: string;
//   passportExpireDate: string; // Should be a valid date-time format
//   basePassportCountryId: string;
//   bloodGroup: number;
//   email: string;
//   phone: string;
//   mobile: string;
//   marriage: number;
//   religion: number;
// }

// // Example usage:
// const examplePatient: CreatePatientDto = {
//   nationality: 1,
//   prefixTh: 2,
//   prefixEn: 3,
//   gender: 1,
//   birthdate: '2000-01-01T12:00:00Z', // Replace with a valid date-time
//   firstnameTh: 'John',
//   firstnameEn: 'Doe',
//   lastnameTh: 'Doe',
//   lastnameEn: 'Doe',
//   idcard: '1234567890123',
//   idcardExpireDate: '2023-12-31T12:00:00Z', // Replace with a valid date-time
//   passportNo: 'AB123456',
//   passportExpireDate: '2024-12-31T12:00:00Z', // Replace with a valid date-time
//   basePassportCountryId: 'US',
//   bloodGroup: 1,
//   email: 'john.doe@example.com',
//   phone: '1234567890',
//   mobile: '9876543210',
//   marriage: 1,
//   religion: 1,
// };
// console.log(examplePatient);
