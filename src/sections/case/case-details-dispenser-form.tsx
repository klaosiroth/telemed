import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

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

  const defaultValues = useMemo(() => {
    // ...
  }, []);

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(async (data: FormValuesProps) => {
    try {
      // ..,
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>การจ่ายยา</DialogTitle>
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
            <RHFTextField name="field1" label="ฟิลด์ที่1" />
            <RHFTextField name="field2" label="ฟิลด์ที่2" />
            <RHFTextField name="field3" label="ฟิลด์ที่3" />
            <RHFTextField name="field4" label="ฟิลด์ที่4" />
          </Box>
        </DialogContent>
      </FormProvider>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          ยกเลิก
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          บันทึก
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
