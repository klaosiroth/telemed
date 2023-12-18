import React, { useCallback, useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import Label from 'src/components/label';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';

interface Ambulance {
  ambulanceId: number;
  isActive: boolean;
  isMission: boolean;
  ambulanceName: string;
  licensePlate: string;
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
  }, [fetchData]);

  const handleClick = useCallback(
    (ambulance: Ambulance) => {
      if (!ambulance.isActive) {
        // Vehicle is not ready for use, do nothing
        return;
      }
      router.push(paths.dashboard.caseAdmin.details('16a2c786-d4f4-4951-be41-9cb6ce0762e0'));
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
