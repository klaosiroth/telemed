import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';

import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';

const OPTIONS = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
  { value: 'option 4', label: 'Option 4' },
  { value: 'option 5', label: 'Option 5' },
  { value: 'option 6', label: 'Option 6' },
  { value: 'option 7', label: 'Option 7' },
  { value: 'option 8', label: 'Option 8' },
];

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentData?: any;
};

type FormValuesProps = any;

export default function CaseDetailsDispenserForm({ currentData, open, onClose }: Props) {
  const Schema = Yup.object().shape({
    // Define validation schema
  });

  const defaultValues = useMemo(
    () => ({
      drugId: currentData?.drugId || '',
      dosage: currentData?.dosage || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentData]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        onClose();
        console.info('DATA', data);
      } catch (error) {
        console.error(error);
      }
    },
    [onClose, reset]
  );

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
              name="autocomplete"
              label="กลุ่มยา"
              options={OPTIONS}
              getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
            />
            <RHFAutocomplete
              name="autocomplete"
              label="ยา"
              options={OPTIONS}
              getOptionLabel={(option: OptionType | string) => (option as OptionType).label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
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
