import { useCallback, useEffect, useState } from 'react';
import { Card, CardHeader, Stack, Typography } from '@mui/material';
import { useParams } from 'src/routes/hook';
import { useSnackbar } from 'src/components/snackbar';
import Scrollbar from 'src/components/scrollbar';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import { socket } from 'src/utils/socket';

export default function CaseDetailsDispenser() {
  const { id: caseId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`${API_ENDPOINTS.cases}/${caseId}`);
      setData(res.data.caseDrugs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    socket.connect();
    socket.on('dispenser', () => {
      fetchData();
      enqueueSnackbar('รายการจ่ายยาใหม่');
    });
    fetchData();
    return () => {
      socket.disconnect();
    };
  }, [enqueueSnackbar, fetchData]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card sx={{ height: 1 }}>
      <CardHeader title="รายการจ่ายยา" titleTypographyProps={{ variant: 'subtitle1' }} />
      <Scrollbar sx={{ px: 3, pb: 8 }}>
        {data?.map((item: any, index: number) => (
          <Stack key={index} spacing={0.5}>
            <Typography variant="body2">
              {item.drug.drugName} - {item.dosage}
            </Typography>
          </Stack>
        ))}
      </Scrollbar>
    </Card>
  );
}
