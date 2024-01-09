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
import UserNewEditForm from 'src/sections/user/user-new-edit-form';

// ----------------------------------------------------------------------

export default function UserEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.users}/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar heading="แก้ไขข้อมูลผู้ใช้" />

      {data ? <UserNewEditForm currentData={data} /> : null}
    </Container>
  );
}
