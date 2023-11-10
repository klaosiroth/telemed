'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
// routes
import { useParams, useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// types
import { CreateDrugCategoryDTO, DrugCategory } from 'src/types/drug';
// components
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import { STATUS_OPTIONS } from 'src/constants';

// ----------------------------------------------------------------------

const Schema = Yup.object().shape({
  drugCategoryName: Yup.string().required('กรุณาระบุ ชื่อกลุ่มยา'),
});

// ----------------------------------------------------------------------

type Props = {
  currentData?: DrugCategory;
};

type FormValuesProps = CreateDrugCategoryDTO;

export default function DrugCategoryNewEditForm({ currentData }: Props) {
  const { id } = useParams();
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      drugCategoryName: currentData?.drugCategoryName || '',
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

  useEffect(() => {
    if (currentData) {
      reset(defaultValues);
    }
  }, [currentData, defaultValues, reset]);

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        if (!currentData) {
          await axiosInstance.post(API_ENDPOINTS.drugCategories, data);
        } else {
          await axiosInstance.patch(`${API_ENDPOINTS.drugCategories}/${id}`, data);
        }
        router.push(paths.dashboard.drugCategory.root);
        console.info('Form submitted:', data);
        reset();
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
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="drugCategoryName" label="ชื่อกลุ่มยา" />
            <RHFSelect name="isActive" label="สถานะ">
              {STATUS_OPTIONS.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
          {/* <RHFTextField name="drugCategoryDetail" label="รายละเอียดยา" multiline rows={4} /> */}
        </Stack>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentData ? 'บันทึกข้อมูล' : 'อัพเดตข้อมูล'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
