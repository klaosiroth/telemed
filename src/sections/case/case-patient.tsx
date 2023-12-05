import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'src/routes/hook';
import { useBoolean } from 'src/hooks/use-boolean';
import { Card, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import { TCase } from 'src/types/case';
import { fDate } from 'src/utils/format-time';
import { PREFIX_LABELS, getLabel } from 'src/utils/label-mapper';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import Iconify from 'src/components/iconify';

import CaseQuickEditForm from './case-quick-edit-form';

export default function CasePatient() {
  const quickEdit = useBoolean();
  const params = useParams();
  const { id: caseId } = params;
  const [data, setData] = useState<TCase | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.cases}/${caseId}`);
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, [caseId]);

  const updateData = useCallback((newData: TCase) => {
    // Update the data in the parent component
    setData(newData);
  }, []);

  return (
    <>
      <Card>
        <CardHeader
          title="ข้อมูลผู้ป่วย"
          action={
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" width={18} />
            </IconButton>
          }
        />
        <Stack spacing={0.5} sx={{ p: 3 }}>
          {data ? (
            <Stack spacing={0.5} sx={{ typography: 'body2' }}>
              <Typography variant="subtitle2">
                {`${getLabel(data.prefixModal, PREFIX_LABELS)} ${data.firstname} ${data.lastname}`}
              </Typography>
              <div>วันเกิด: {fDate(data.birthdate)}</div>
              <div>เลขบัตรประจำตัวประชาชน: {data.idcard}</div>
              <div>วันบัตรหมดอายุ: {fDate(data.idcardExpireDate)}</div>
              <div>เลขที่หนังสือเดือนทาง: {data.passportNo}</div>
              <div>วันหมดอายุหนังสือเดินทาง: {fDate(data.passportExpireDate)}</div>
              <div>เบอร์มือถือ: {data.mobile}</div>
              <div>เบอร์โทรศัพท์: {data.phone}</div>
            </Stack>
          ) : (
            // Render a loading or placeholder component when data is null
            // You can customize this according to your design
            <div>Loading...</div>
          )}
        </Stack>
      </Card>

      {data && (
        <CaseQuickEditForm
          caseId={caseId}
          currentData={data}
          updateData={updateData}
          open={quickEdit.value}
          onClose={quickEdit.onFalse}
        />
      )}
    </>
  );
}
