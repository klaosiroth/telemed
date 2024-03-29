import { useCallback, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useParams } from 'src/routes/hook';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import { socket } from 'src/utils/socket';
import styles from './case-mission.module.css';

interface CaseMission {
  dateArriveIncident: string;
  dateLeavingScene: string;
  dateArriveHospital: string;
  dateEndMission: string;
}

export default function CaseAdminMission() {
  const { id: caseId } = useParams();
  const [data, setData] = useState<CaseMission | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.cases}/${caseId}`);
      const [caseMission] = response.data.caseMissions;
      setData(caseMission);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error (e.g., show a notification to the user)
    }
  }, [caseId]);

  useEffect(() => {
    fetchData();

    socket.connect();

    const handleMissionUpdate = () => {
      fetchData();
    };

    socket.on('missionUpdate', handleMissionUpdate);

    return () => {
      socket.off('missionUpdate', handleMissionUpdate);
      socket.disconnect();
    };
  }, [fetchData]);

  const renderCard = (title: string, date: string, formatter: (date: Date) => string) => (
    <Card className={styles.menuItem} sx={{ borderRadius: 1 }} variant="outlined">
      <Typography variant="subtitle2">{`${title}: ${formatter(new Date(date))}`}</Typography>
    </Card>
  );

  console.log('data', data);

  return (
    <section className={styles.menu}>
      {renderCard('ถึงที่เกิดเหตุ', data?.dateArriveIncident || '', formatTime)}
      {renderCard('ออกจากที่เกิดเหตุ', data?.dateLeavingScene || '', formatTime)}
      {renderCard('ถึงสถานพยาบาล', data?.dateArriveHospital || '', formatTime)}
      {renderCard('จบภารกิจ', data?.dateEndMission || '', formatTime)}
    </section>
  );
}

function formatTime(date: Date): string {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return dateObject && !Number.isNaN(dateObject.getTime())
    ? `${new Intl.DateTimeFormat('th-TH', { timeStyle: 'short' }).format(dateObject)} น.`
    : '-';
}
