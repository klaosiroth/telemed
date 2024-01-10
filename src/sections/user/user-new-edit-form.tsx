'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
// routes
import { useParams, useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// types
import { CreateUserDto, User } from 'src/types/user';
// components
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
//
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import { STATUS_OPTIONS } from 'src/constants';

// ----------------------------------------------------------------------

// Define your form schemas and options
const validationSchema = Yup.object().shape({
  // Define validation schema for the information form
  // ...
});

type Props = {
  currentData?: User;
};

type FormValuesProps = CreateUserDto;

type OptionType = {
  value: string;
  label: string;
};

export default function UserNewEditForm({ currentData }: Props) {
  const { id } = useParams();
  const router = useRouter();
  const [roleOptions, setRoleOptions] = useState<OptionType[]>([]);
  const [ambulanceOptions, setAmbulanceOptions] = useState<OptionType[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const [rolesResponse, ambulancesResponse] = await Promise.all([
        axiosInstance.get(API_ENDPOINTS.roles),
        axiosInstance.get(API_ENDPOINTS.ambulances),
      ]);

      const roles = rolesResponse.data.map((item: any) => ({
        value: item.roleId,
        label: item.roleName,
      }));

      const ambulances = ambulancesResponse.data.map((item: any) => ({
        value: item.ambulanceId,
        label: item.licensePlate,
      }));

      setRoleOptions(roles);
      setAmbulanceOptions(ambulances);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Find the 'ambulance' role and set it as the default value
  // const defaultRoleId = roleOptions.find((role) => role.label.toLowerCase() === 'ambulance')?.value;

  // const getDefaultRoleId = useCallback(() => {
  //   const ambulanceRole = roleOptions.find((role) => role.label.toLowerCase() === 'ambulance');
  //   return ambulanceRole?.value || ''; // Return roleId if found, otherwise an empty string
  // }, [roleOptions]);

  const defaultValues = useMemo(
    () => ({
      username: currentData?.username || '',
      password: currentData?.password || '',
      firstname: currentData?.firstname || '',
      lastname: currentData?.lastname || '',
      phone: currentData?.phone || '',
      email: currentData?.email || '',
      avatar: currentData?.avatar || '',
      roleId: currentData?.roleId || '',
      ambulanceId: currentData?.ambulanceId || '',
      isActive: currentData?.isActive || true,
    }),
    [currentData]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit, formState } = methods;
  const { isSubmitting } = formState;
  const values = watch();

  useEffect(() => {
    // Find the 'ambulance' role and set its value as the default roleId
    const ambulanceRole = roleOptions.find((role) => role.label.toLowerCase() === 'ambulance');
    if (ambulanceRole) {
      setValue('roleId', ambulanceRole.value);
    }
  }, [roleOptions, setValue]);

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        if (!currentData) {
          await axiosInstance.post(API_ENDPOINTS.users, data);
        } else {
          await axiosInstance.patch(`${API_ENDPOINTS.users}/${id}`, data);
        }
        reset();
        router.push(paths.dashboard.user.root);
        console.info('Form submitted:', data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [currentData, id, reset, router]
  );

  console.log('values', values);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            }}
          >
            <RHFTextField name="username" label="ชื่อผู้ใช้" />
            <RHFTextField name="password" type="password" label="รหัสผ่าน" />
            <RHFTextField name="email" type="email" label="อีเมล" />
            <RHFTextField name="firstname" label="ชื่อ" />
            <RHFTextField name="lastname" label="นามสกุล" />
            <RHFTextField name="phone" label="เบอร์โทร" />
            <RHFSelect name="isActive" label="สถานะ">
              {STATUS_OPTIONS.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name="roleId" label="สิทธิการใช้งาน">
              {roleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name="ambulanceId" label="ทะเบียนรถ">
              <MenuItem value="">ไม่ระบุ</MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {ambulanceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
        </Stack>
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentData ? 'เพิ่มข้อมูล' : 'อัปเดตข้อมูล'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
