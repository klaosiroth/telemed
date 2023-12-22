import { useCallback, useEffect, useState } from 'react';
import { Card, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { useParams } from 'src/routes/hook';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
//
import CaseAdminDispenserForm from './case-admin-dispenser-form';

interface CaseDrug {
  drug: {
    drugName: string;
  };
  dosage: string;
}

export default function CaseAdminDispenser() {
  const quickEdit = useBoolean();
  const { id: caseId } = useParams();
  const [data, setData] = useState<CaseDrug[] | null>(null);
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
        <Scrollbar sx={{ px: 3, pb: 8 }}>
          {data?.map((item: CaseDrug, index: number) => (
            <Stack key={index} spacing={0.5}>
              <Typography variant="body2">
                {item.drug.drugName} - {item.dosage}
              </Typography>
            </Stack>
          ))}
        </Scrollbar>
      </Card>

      <CaseAdminDispenserForm
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        onComplete={fetchData}
      />
    </>
  );
}
