import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'src/routes/hook';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';

import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

type FormValuesProps = {
  drugOptions: any;
  caseId: string;
  drugId: string;
  dosage: string;
};

const FormSchema = Yup.object().shape({
  drugOptions: Yup.mixed().required('จำเป็นต้องเลือกรายการยา'),
  dosage: Yup.string().required('กรุณาระบุปริมาณยา'),
});

export default function CaseDetailsDispenserForm({ open, onClose }: Props) {
  const params = useParams();
  const { id: caseId } = params;

  const [drugOptions, setDrugOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(API_ENDPOINTS.drugs);
      const options = res.data.map((item: any) => ({ value: item.drugId, label: item.drugName }));
      setDrugOptions(options);
    };
    fetchData();
  }, []);

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      dosage: '',
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        data.caseId = caseId;
        data.drugId = data.drugOptions.value;
        await axiosInstance.post(`${API_ENDPOINTS.caseDrugs}/${caseId}`, data);
        reset();
        onClose();
        console.info('DATA', data);
      } catch (error) {
        console.error(error);
      }
    },
    [caseId, onClose, reset]
  );

  if (!drugOptions) return <p>No data</p>;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: { maxWidth: 480 },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>การจ่ายยา</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <RHFAutocomplete
              name="drugOptions"
              label="ยา"
              options={drugOptions}
              getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              // value={methods.getValues('drugOptions')} // Use getValues to get the value from react-hook-form
              // onChange={(_, newValue) => methods.setValue('drugOptions', newValue)} // Set the value using setValue
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
            />
            <RHFTextField name="dosage" label="จำนวน/หน่วย" />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            ยกเลิก
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            บันทึก
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
