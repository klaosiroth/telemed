import { useCallback, useEffect, useState } from 'react';
import { Box, Card, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { useParams } from 'src/routes/hook';
import Iconify from 'src/components/iconify';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
//
import CaseAdminDispenserForm from './case-admin-dispenser-form';

export default function CaseAdminDispenser() {
  const quickEdit = useBoolean();
  const { id: caseId } = useParams();
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`${API_ENDPOINTS.caseDrugs}/${caseId}`);
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Card sx={{ height: 1 }}>
        <CardHeader
          title="รายการจ่ายยา"
          titleTypographyProps={{ variant: 'subtitle1' }}
          action={
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="mingcute:add-line" width={18} />
            </IconButton>
          }
        />
        <Box sx={{ px: 3 }}>
          {!isLoading && data?.length === 0 && <p>ไม่มีรายการจ่ายยา</p>}
          {data ? (
            <Stack spacing={0.5}>
              <Typography variant="body2">
                {data.drug.drugName} - {data.dosage}
              </Typography>
            </Stack>
          ) : null}
        </Box>
      </Card>

      <CaseAdminDispenserForm
        // currentData={data}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        onComplete={fetchData}
      />
    </>
  );
}
