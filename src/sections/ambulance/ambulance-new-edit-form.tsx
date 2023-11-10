import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { useParams, useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// types
import { Ambulance, CreateAmbulanceDTO } from 'src/types/ambulance';
// components
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import { STATUS_OPTIONS } from 'src/constants';

// ----------------------------------------------------------------------

const Schema = Yup.object().shape({
  ambulanceName: Yup.string().required('กรุณาระบุ ยี่ห้อรถ'),
});

// ----------------------------------------------------------------------

type Props = {
  currentData?: Ambulance;
};

type FormValuesProps = CreateAmbulanceDTO;

export default function AmbulanceNewEditForm({ currentData }: Props) {
  const { id } = useParams();
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      ambulanceName: currentData?.ambulanceName || '',
      licensePlate: currentData?.licensePlate || '',
      isActive: currentData?.isActive || true,
    }),
    [currentData]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { reset, watch, handleSubmit, formState } = methods;
  const { isSubmitting } = formState;
  const values = watch();

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        if (!currentData) {
          await axiosInstance.post(API_ENDPOINTS.ambulances, data);
        } else {
          await axiosInstance.patch(`${API_ENDPOINTS.ambulances}/${id}`, data);
        }
        reset();
        router.push(paths.dashboard.ambulance.root);
        console.info('DATA', data);
      } catch (error) {
        console.error(error);
      }
    },
    [currentData, id, reset, router]
  );

  console.log('values', values);

  return (
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
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">ยี่ห้อรถ</Typography>
            <RHFTextField name="ambulanceName" />
          </Stack>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">ทะเบียนรถ</Typography>
            <RHFTextField name="licensePlate" />
          </Stack>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">สถานะ</Typography>
            <RHFSelect name="isActive">
              {STATUS_OPTIONS.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentData ? 'บันทึกข้อมูล' : 'อัพเดตข้อมูล'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}

// ----------------------------------------------------------------------
