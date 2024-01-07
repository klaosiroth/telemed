import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'src/routes/hook';
import { useBoolean } from 'src/hooks/use-boolean';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { socket } from 'src/utils/socket';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import {
  ARI_OPTIONS,
  EYE_OPENING_OPTIONS,
  MOTOR_RESPONSE_OPTIONS,
  PAIN_SCORE_OPTIONS,
  PUPILS_OPTIONS,
  VERBAL_RESPONSE_OPTIONS,
} from 'src/constants';

import styles from './case-mission.module.css';

type PatientStatus = {
  caseId: string;
  pulseValue: string;
  pulseRateValue: string;
  bloodPressureRateValue: string;
  respiratoryValue: string;
  bloodPressureValue: string;
  bodyTemperatureValue: string;
  planScoreValue: string;
  nauroValue: string;
  gcsValue: string;
  dtxValue: string;
  pupilsValue: string;
  ariValue: string;
};

export default function CasePatientStatus() {
  const { id: caseId } = useParams();
  const [data, setData] = useState<PatientStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const quickForms = {
    pulse: useBoolean(),
    pulseRate: useBoolean(),
    bloodPressure: useBoolean(),
    bloodPressureRate: useBoolean(),
    bodyTemperature: useBoolean(),
    respiratory: useBoolean(),
    planScore: useBoolean(),
    nauro: useBoolean(),
    dtx: useBoolean(),
    pupils: useBoolean(),
    gcs: useBoolean(),
    ari: useBoolean(),
    // Add more forms for other fields
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`${API_ENDPOINTS.casePatientStatus}/${caseId}`);
      setData(res.data.casePatientStatus);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    // Establish the socket connection
    socket.connect();

    // Listen for the event
    socket.on('status', () => {
      // Update the data in real-time
      fetchData();
    });

    fetchData();

    return () => {
      // Disconnect the socket when the component is unmounted
      socket.disconnect();
    };
  }, [fetchData]);

  const isEditing = !!data; // Check if data is present to determine if it's an edit operation

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  console.log('data', data);

  // prettier-ignore
  const statusBlocks = [
    { label: 'Pulse', value: data.pulseValue, onClick: quickForms.pulse.onTrue },
    { label: 'อัตราชีพจร', value: data.pulseRateValue, onClick: quickForms.pulseRate.onTrue },
    { label: 'ความดันโลหิต', value: data.bloodPressureRateValue, onClick: quickForms.bloodPressureRate.onTrue },
    { label: 'Respiratory rate', value: data.respiratoryValue, onClick: quickForms.respiratory.onTrue },
    { label: 'Blood pressure', value: data.bloodPressureValue, onClick: quickForms.bloodPressure.onTrue },
    { label: 'Body Temperature', value: data.bodyTemperatureValue, onClick: quickForms.bodyTemperature.onTrue },
    { label: 'Plan score', value: data.planScoreValue, onClick: quickForms.planScore.onTrue },
    { label: 'Nauro', value: data.nauroValue, onClick: quickForms.nauro.onTrue },
    { label: 'GCS', value: data.gcsValue, onClick: quickForms.gcs.onTrue },
    { label: 'DTX', value: data.dtxValue, onClick: quickForms.dtx.onTrue },
    { label: 'Pupils', value: data.pupilsValue, onClick: quickForms.pupils.onTrue },
    { label: 'ARI', value: data.ariValue, onClick: quickForms.ari.onTrue },
  ]

  const renderStatusBlocks = () =>
    statusBlocks.map((statusBlock, index) => (
      <Card key={index} className={styles.statusBlock} onClick={statusBlock.onClick}>
        <Typography variant="subtitle2">{statusBlock.label}</Typography>
        <Typography variant="body2">{statusBlock.value}</Typography>
      </Card>
    ));

  return (
    <>
      <div className={styles.staus}>
        <div className={styles.statusTitle}>รายละเอียด</div>
        <div className={styles.statusBlocks}>{renderStatusBlocks()}</div>
      </div>

      <CasePatientStatusForm
        open={quickForms.pulse.value}
        onClose={quickForms.pulse.onFalse}
        data={data.pulseValue}
        fieldName="pulseValue"
        isEditing={isEditing}
        onComplete={fetchData}
      />

      <CasePatientStatusForm
        open={quickForms.pulseRate.value}
        onClose={quickForms.pulseRate.onFalse}
        data={data.pulseRateValue}
        fieldName="pulseRateValue"
        isEditing={isEditing}
        onComplete={fetchData}
      />

      <CasePatientStatusForm
        open={quickForms.bloodPressure.value}
        onClose={quickForms.bloodPressure.onFalse}
        data={data.bloodPressureValue}
        fieldName="bloodPressureValue"
        isEditing={isEditing}
        onComplete={fetchData}
      />

      <CasePatientStatusForm
        open={quickForms.bloodPressureRate.value}
        onClose={quickForms.bloodPressureRate.onFalse}
        data={data.bloodPressureRateValue}
        fieldName="bloodPressureRateValue"
        isEditing={isEditing}
        onComplete={fetchData}
      />

      <CasePatientStatusForm
        open={quickForms.bodyTemperature.value}
        onClose={quickForms.bodyTemperature.onFalse}
        data={data.bodyTemperatureValue}
        fieldName="bodyTemperatureValue"
        isEditing={isEditing}
        onComplete={fetchData}
      />

      <CasePatientStatusForm
        open={quickForms.respiratory.value}
        onClose={quickForms.respiratory.onFalse}
        data={data.respiratoryValue}
        fieldName="respiratoryValue"
        isEditing={isEditing}
        onComplete={fetchData}
      />

      <CasePatientStatusForm
        open={quickForms.nauro.value}
        onClose={quickForms.nauro.onFalse}
        data={data.nauroValue}
        fieldName="nauroValue"
        isEditing={isEditing}
        onComplete={fetchData}
      />

      <CasePatientStatusForm
        open={quickForms.dtx.value}
        onClose={quickForms.dtx.onFalse}
        data={data.dtxValue}
        fieldName="dtxValue"
        isEditing={isEditing}
        onComplete={fetchData}
      />

      <CasePatientGCSForm
        open={quickForms.gcs.value}
        onClose={quickForms.gcs.onFalse}
        data={data.gcsValue}
        fieldName="gcsValue"
        isEditing={isEditing}
        onComplete={fetchData}
      />

      <CasePatientStatusForm
        open={quickForms.planScore.value}
        onClose={quickForms.planScore.onFalse}
        data={data.planScoreValue}
        fieldName="planScoreValue"
        isEditing={isEditing}
        options={PAIN_SCORE_OPTIONS}
        onComplete={fetchData}
      />

      <CasePatientStatusForm
        open={quickForms.pupils.value}
        onClose={quickForms.pupils.onFalse}
        data={data.pupilsValue}
        fieldName="pupilsValue"
        isEditing={isEditing}
        options={PUPILS_OPTIONS}
        onComplete={fetchData}
      />

      <CasePatientStatusForm
        open={quickForms.ari.value}
        onClose={quickForms.ari.onFalse}
        data={data.ariValue}
        fieldName="ariValue"
        isEditing={isEditing}
        options={ARI_OPTIONS}
        onComplete={fetchData}
      />
    </>
  );
}

type FormProps = {
  open: boolean;
  onClose: VoidFunction;
  data: string;
  isEditing?: boolean;
  fieldName: string;
  options?: any[];
  onComplete: () => void;
};

type FormValuesProps = PatientStatus;

export function CasePatientStatusForm({
  open,
  onClose,
  data,
  isEditing,
  fieldName,
  options,
  onComplete,
}: FormProps) {
  const { id: caseId } = useParams();

  const defaultValues = useMemo(() => ({ [fieldName]: data || '' }), [data, fieldName]);

  console.log('defaultValues', defaultValues);

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = useCallback(
    async (formValues: FormValuesProps) => {
      try {
        if (isEditing) {
          // Edit existing data
          await axiosInstance.patch(`${API_ENDPOINTS.casePatientStatus}/${caseId}`, formValues);
        } else {
          // Create new data
          await axiosInstance.post(API_ENDPOINTS.casePatientStatus, formValues);
        }
        reset();
        onClose();
        console.info('DATA', formValues);

        // Emit socket event to server
        socket.emit('status');

        // Refetch data after successful submission
        onComplete();
      } catch (error) {
        console.error(error);
      }
    },
    [caseId, isEditing, onClose, onComplete, reset]
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: { maxWidth: 360 },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{fieldName}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {options ? (
              <RHFSelect name={fieldName} label={fieldName}>
                <MenuItem value="-">ไม่ระบุ</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            ) : (
              <RHFTextField name={fieldName} label={fieldName} />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            ยกเลิก
          </Button>

          <Button variant="contained" color="primary" type="submit">
            {isEditing ? 'อัปเดต' : 'บันทึก'}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

function CasePatientGCSForm({ open, onClose, onComplete }: any) {
  const params = useParams();
  const { id: caseId } = params;

  const defaultValues = useMemo(
    () => ({
      eyeOpeningValue: '',
      motorResponseValue: '',
      verbalResponseValue: '',
    }),
    []
  );

  const methods = useForm<any>({
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = useCallback(
    async (formValues: any) => {
      try {
        await axiosInstance.patch(`${API_ENDPOINTS.casePatientStatus}/${caseId}`, formValues);
        reset();
        onClose();
        socket.emit('status');
        onComplete();
      } catch (error) {
        console.error(error);
      }
    },
    [caseId, onClose, onComplete, reset]
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: { maxWidth: 360 },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>GCS</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <RHFSelect name="eyeOpeningValue" label="Eye Opening">
              {EYE_OPENING_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFSelect name="motorResponseValue" label="Motor Response">
              {MOTOR_RESPONSE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFSelect name="verbalResponseValue" label="Verbal Response">
              {VERBAL_RESPONSE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            ยกเลิก
          </Button>

          <Button variant="contained" color="primary" type="submit">
            อัปเดต
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
