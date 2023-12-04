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

import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

import styles from './case-mission.module.css';

const PAIN_SCORE_OPTIONS = [
  { value: 'ผู้ป่วยวิกฤต', label: 'ผู้ป่วยวิกฤต' },
  { value: 'ผู้ป่วยฉุกเฉิน', label: 'ผู้ป่วยฉุกเฉิน' },
  { value: 'ผู้ป่วยรีบด่วน', label: 'ผู้ป่วยรีบด่วน' },
  { value: 'ผู้ป่วยกึ่งรีบด่วน', label: 'ผู้ป่วยกึ่งรีบด่วน' },
  { value: 'ผู้ป่วยไม่รีบด่วน', label: 'ผู้ป่วยไม่รีบด่วน' },
];

const PUPILS_OPTIONS = [
  { value: 'Reaction', label: 'Reaction' },
  { value: 'Sluggish', label: 'Sluggish' },
  { value: 'No Reaction', label: 'No Reaction' },
  { value: 'Close', label: 'Close' },
];

const ARI_OPTIONS = [
  { value: 'มีไข้', label: 'มีไข้' },
  { value: 'ไอ จาม', label: 'ไอ จาม' },
  { value: 'เจ็บคอ', label: 'เจ็บคอ' },
  { value: 'คัดจมูก', label: 'คัดจมูก' },
  { value: 'มีน้ำมูก', label: 'มีน้ำมูก' },
  { value: 'มีเสมหะ', label: 'มีเสมหะ' },
];

// const E_OPTIONS = [
//   { value: 'E1', label: 'ไม่ลืมตา ไม่ตอบสนองต่อสิ่งกระตุ้นใดๆ' },
//   { value: 'E2', label: 'ลืมตาเมื่อเจ็บ' },
//   { value: 'E3', label: 'ลืมตาเมื่อเรียก' },
//   { value: 'E4', label: 'ลืมตาได้เอง' },
// ];

// const M_OPTIONS = [
//   { value: 'M1', label: 'ไม่มีการเคลื่อนไหวใดๆต่อสิ่งกระตุ้น ไม่ตอบสนองต่อความเจ็บปวด' },
//   { value: 'M2', label: 'ตอบสนองต่อการกระตุ้นที่ทำให้เจ็บ โดย แขน ขาเหยียดเกร็ง' },
//   { value: 'M3', label: 'ตอบสนองต่อการกระตุ้นที่ทำให้เจ็บ โดย แขน ขางอเข้าผิดปกติ' },
//   { value: 'M4', label: 'ตอบสนองต่อการทำให้เจ็บแบบปกติ เช่น เคลื่อนแขนขาหนี' },
//   { value: 'M5', label: 'ตอบสนองต่อการทำให้เจ็บ ถูกตำแหน่งที่ทำให้เจ็บ เช่น การปัดสิ่งกระตุ้น' },
//   { value: 'M6', label: 'เคลื่อนไหวได้ตามคำสั่งถูกต้อง' },
// ];

// const V_OPTIONS = [
//   { value: 'V1', label: 'ไม่พูด ไม่ส่งเสียงใดๆ' },
//   { value: 'V2', label: 'ส่งเสียงอือ อา ไม่เป็นคำพูด' },
//   { value: 'V3', label: 'ส่งเสียงพูดเป็นคำๆ แต่ฟังไม่รู้เรื่อง' },
//   { value: 'V4', label: 'พูดเป็นคำๆ แต่ไม่ถูกต้องกับเหตุการณ์' },
//   { value: 'V5', label: 'ถามตอบรู้เรื่องปกติ' },
// ];

type PatientStatus = {
  caseId: string;
  pulseValue: string;
  pulseRateValue: string;
  bloodPressureRateValue: string;
  respiratoryValue: string;
  bloodPressureValue: string;
  planScoreValue: string;
  nauroValue: string;
  gcsValue: string;
  dtxValue: string;
  pupilsValue: string;
  ariValue: string;
};

export default function CasePatientStatus() {
  const params = useParams();
  const { id: caseId } = params;

  const [data, setData] = useState<PatientStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const quickForms = {
    pulse: useBoolean(),
    pulseRate: useBoolean(),
    bloodPressure: useBoolean(),
    bloodPressureRate: useBoolean(),
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
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isEditing = !!data; // Check if data is present to determine if it's an edit operation

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <>
      <div className={styles.staus}>
        <div className={styles.statusTitle}>รายละเอียด</div>

        <div className={styles.statusBlocks}>
          <Card className={styles.statusBlock} onClick={quickForms.pulse.onTrue}>
            <Typography variant="subtitle2">Pulse</Typography>
            <Typography variant="body2">{data.pulseValue}</Typography>
          </Card>
          <Card className={styles.statusBlock} onClick={quickForms.pulseRate.onTrue}>
            <Typography variant="subtitle2">อัตราชีพจร</Typography>
            <Typography variant="body2">{data.pulseRateValue} / m</Typography>
          </Card>
          <Card className={styles.statusBlock} onClick={quickForms.bloodPressureRate.onTrue}>
            <Typography variant="subtitle2">ความดันโลหิต</Typography>
            <Typography variant="body2">{data.bloodPressureRateValue} bpm</Typography>
          </Card>
          <Card className={styles.statusBlock} onClick={quickForms.respiratory.onTrue}>
            <Typography variant="subtitle2">Respiratory rate</Typography>
            <Typography variant="body2">{data.respiratoryValue}</Typography>
          </Card>
          <Card className={styles.statusBlock} onClick={quickForms.bloodPressure.onTrue}>
            <Typography variant="subtitle2">Blood pressure</Typography>
            <Typography variant="body2">{data.bloodPressureValue}</Typography>
          </Card>
          <Card className={styles.statusBlock}>
            <Typography variant="subtitle2">Body Temperature</Typography>
            <Typography variant="body2">ขาดฟิลด์</Typography>
          </Card>
          <Card className={styles.statusBlock} onClick={quickForms.planScore.onTrue}>
            <Typography variant="subtitle2">Plan score</Typography>
            <Typography variant="body2">{data.planScoreValue}</Typography>
          </Card>
          <Card className={styles.statusBlock} onClick={quickForms.nauro.onTrue}>
            <Typography variant="subtitle2">Nauro</Typography>
            <Typography variant="body2">{data.nauroValue}</Typography>
          </Card>
          <Card className={styles.statusBlock} onClick={quickForms.gcs.onTrue}>
            <Typography variant="subtitle2">GCS</Typography>
            <Typography variant="body2">{data.gcsValue}</Typography>
          </Card>
          <Card className={styles.statusBlock} onClick={quickForms.dtx.onTrue}>
            <Typography variant="subtitle2">DTX</Typography>
            <Typography variant="body2">{data.dtxValue}</Typography>
          </Card>
          <Card className={styles.statusBlock} onClick={quickForms.pupils.onTrue}>
            <Typography variant="subtitle2">Pupils</Typography>
            <Typography variant="body2">{data.pupilsValue}</Typography>
          </Card>
          <Card className={styles.statusBlock} onClick={quickForms.ari.onTrue}>
            <Typography variant="subtitle2">ARI</Typography>
            <Typography variant="body2">{data.ariValue}</Typography>
          </Card>
        </div>
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

      <CasePatientStatusForm
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
  isEditing: boolean;
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
  const params = useParams();
  const { id: caseId } = params;

  const defaultValues = useMemo(() => ({ [fieldName]: data || '' }), [data, fieldName]);

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
                <MenuItem value="">ไม่ระบุ</MenuItem>
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
            {isEditing ? 'แก้ไข' : 'บันทึก'}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
