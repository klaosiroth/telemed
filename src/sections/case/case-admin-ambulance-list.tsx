import React, { useCallback, useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import Label from 'src/components/label';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import { socket } from 'src/utils/socket';

type Case = {
  caseId: string;
};

interface Ambulance {
  ambulanceId: number;
  isActive: boolean;
  isMission: boolean;
  ambulanceName: string;
  licensePlate: string;
  cases: Case[];
}

export default function CaseAdminAmbulanceList() {
  const router = useRouter();
  const [ambulances, setAmbulances] = useState<Ambulance[] | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get<Ambulance[]>(API_ENDPOINTS.ambulances);
      const ambulanceData = response.data.filter((ambulance: Ambulance) => ambulance.isActive);
      setAmbulances(ambulanceData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    socket.connect();
    socket.on('CreateCase', () => fetchData());

    return () => {
      socket.disconnect();
      socket.off('CreateCase');
    };
  }, [fetchData]);

  const handleClick = useCallback(
    (ambulance: Ambulance) => {
      // Vehicle is not ready for use, not in a mission, or has no cases, do nothing
      if (!ambulance.isActive || !ambulance.isMission || !ambulance.cases.length) return;

      const { caseId } = ambulance.cases[0];
      router.push(paths.dashboard.caseAdmin.details(caseId));
    },
    [router]
  );

  if (!ambulances) return null; // or render a loading state
  console.log('ambulances', ambulances);

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {ambulances.map((ambulance: Ambulance) => (
        <Card
          key={ambulance.ambulanceId}
          style={{ cursor: ambulance.isMission ? 'pointer' : 'not-allowed' }}
          onClick={() => ambulance.isMission && handleClick(ambulance)}
        >
          <img
            src="https://cf.autodeft2.pw/uploads/images/ablvan1.jpg"
            alt="รถพยาบาล"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <CardContent>
            <Label variant="soft" color={ambulance.isMission ? 'success' : 'error'}>
              {ambulance.isMission ? 'กำลังปฎิบัติภารกิจ' : 'ไม่ได้ปฎิบัติภารกิจ'}
            </Label>
            <Typography variant="h6">{ambulance.ambulanceName}</Typography>
            <Typography variant="body2">ทะเบียนรถ: {ambulance.licensePlate}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
