'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
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
import { Drug, DrugCategory, CreateDrugDTO } from 'src/types/drug';
// components
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import { STATUS_OPTIONS } from 'src/constants';

// ----------------------------------------------------------------------

const Schema = Yup.object().shape({
  drugName: Yup.string().required('กรุณาระบุ ชื่อยา'),
  drugDetail: Yup.string().required('กรุณาระบุ รายละเอียดยา'),
  drugGenericName: Yup.string().required('กรุณาเลือก ชื่อสามัญทางยา'),
  drugCategoryId: Yup.string().required('กรุณาระบุ หมวดยา'),
});

// ----------------------------------------------------------------------

type Props = {
  currentData?: Drug;
};

type FormValuesProps = CreateDrugDTO;

export default function DrugNewEditForm({ currentData }: Props) {
  const { id } = useParams();
  const router = useRouter();

  const [drugCategories, setDrugCategories] = useState<DrugCategory[]>([]);

  useEffect(() => {
    async function fetchData() {
      const categories = await fetchDrugCategoryData();
      setDrugCategories(categories);
    }

    fetchData();
  }, []);

  const defaultValues = useMemo(
    () => ({
      drugName: currentData?.drugName || '',
      drugDetail: currentData?.drugDetail || '',
      drugGenericName: currentData?.drugGenericName || '',
      drugCategoryId: currentData?.drugCategoryId || '',
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
          await axiosInstance.post(API_ENDPOINTS.drugs, data);
        } else {
          await axiosInstance.patch(`${API_ENDPOINTS.drugs}/${id}`, data);
        }
        reset();
        router.push(paths.dashboard.drug.root);
        console.log('Form submitted:', data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
    [currentData, id, reset, router]
  );

  console.log('values', values);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 5 }}>
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
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">ชื่อยา</Typography>
              <RHFTextField name="drugName" />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">ชื่อสามัญทางยา</Typography>
              <RHFTextField name="drugGenericName" />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">หมวดยา</Typography>
              <RHFSelect name="drugCategoryId">
                {drugCategories.map((category) => (
                  <MenuItem key={category.drugCategoryId} value={category.drugCategoryId}>
                    {category.drugCategoryName}
                  </MenuItem>
                ))}
              </RHFSelect>
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
          <RHFTextField name="drugDetail" label="รายละเอียดยา" fullWidth multiline rows={4} />
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

// ----------------------------------------------------------------------

const fetchDrugCategoryData = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.drugCategories);
    return response.data; // Assuming the API response contains an array of drug categories.
  } catch (error) {
    console.error('Error fetching drug categories:', error);
    return [];
  }
};

// <RHFTextField name="name" label="ชื่อยา" />
// <RHFTextField name="name" label="ชื่อสามัญทางยา" />
// <RHFTextField name="name" label="หมวดยา" />
// <RHFTextField name="name" label="สถานะ" />
