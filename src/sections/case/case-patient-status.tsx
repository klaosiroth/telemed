import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { useParams } from 'src/routes/hook';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import Typography from '@mui/material/Typography';
import styles from './case-mission.module.css';

type PatientStatus = {
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

// async function getData(caseId: string) {
//   try {
//     const res = await axiosInstance.get(`${API_ENDPOINTS.casePatientStatus}/${caseId}`);
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.
//     console.log('Case Patient Status:', res.data);
//     return res.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

export default function CasePatientStatus() {
  // const caseId = '16a2c786-d4f4-4951-be41-9cb6ce0762e0';
  // const res = await axiosInstance.get(`${API_ENDPOINTS.casePatientStatus}/${caseId}`);
  // const data: PatientStatus = await res.data;
  const params = useParams();
  const { id: caseId } = params;

  const [data, setData] = useState<PatientStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axiosInstance.get(`${API_ENDPOINTS.casePatientStatus}/${caseId}`);
      setData(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, [caseId]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className={styles.status}>
      <div className={styles.statusTitle}>รายละเอียด</div>

      <div className={styles.statusBlocks}>
        {/* Render patient status cards */}
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">Pulse</Typography>
          <Typography variant="body2">{data.pulseValue}</Typography>
        </Card>
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">อัตราชีพจร</Typography>
          <Typography variant="body2">{data.pulseRateValue}</Typography>
        </Card>
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">ความดันโลหิต</Typography>
          <Typography variant="body2">{data.bloodPressureRateValue}</Typography>
        </Card>
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">Respiratory rate</Typography>
          <Typography variant="body2">{data.respiratoryValue}</Typography>
        </Card>
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">Blood pressure</Typography>
          <Typography variant="body2">{data.bloodPressureValue}</Typography>
        </Card>
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">Body Temperature</Typography>
          <Typography variant="body2">ขาดฟิลด์</Typography>
        </Card>
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">Plan score</Typography>
          <Typography variant="body2">{data.planScoreValue}</Typography>
        </Card>
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">Nauro</Typography>
          <Typography variant="body2">{data.nauroValue}</Typography>
        </Card>
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">GCS</Typography>
          <Typography variant="body2">{data.gcsValue}</Typography>
        </Card>
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">DTX</Typography>
          <Typography variant="body2">{data.dtxValue}</Typography>
        </Card>
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">Pupils</Typography>
          <Typography variant="body2">{data.pupilsValue}</Typography>
        </Card>
        <Card className={styles.statusBlock}>
          <Typography variant="subtitle2">ARI</Typography>
          <Typography variant="body2">{data.ariValue}</Typography>
        </Card>
      </div>
    </div>
  );
}
