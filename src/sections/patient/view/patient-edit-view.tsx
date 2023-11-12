'use client';

import { useEffect, useState } from 'react';
// @mui
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
// components
import TitleBar from 'src/components/title-bar';
import { useSettingsContext } from 'src/components/settings';
//
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import PatientNewEditForm from 'src/sections/patient/patient-new-edit-form';

// ----------------------------------------------------------------------

export default function PatientEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.patients}/${id}`);
        const transformedData = transformData(response.data);
        setData(transformedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar heading="แก้ไขข้อมูลผู้ป่วย" />

      {data ? <PatientNewEditForm currentData={data} /> : null}
    </Container>
  );
}

// ----------------------------------------------------------------------

const transformData = (data: any) => ({
  ...data,
  idcardExpireDate: data.idcardExpireDate ? new Date(data.idcardExpireDate) : null,
  birthdate: data.birthdate ? new Date(data.birthdate) : null,
  passportExpireDate: data.passportExpireDate ? new Date(data.passportExpireDate) : null,
});
