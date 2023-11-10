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
import { Ambulance } from 'src/types/ambulance';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import AmbulanceNewEditForm from '../ambulance-new-edit-form';

// ----------------------------------------------------------------------

export default function AmbulanceEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const [data, setData] = useState<Ambulance | null>(null);

  useEffect(() => {
    // Define an async function to fetch the ambulance data
    async function fetchAmbulanceData() {
      try {
        // Make an API request to get the ambulance data by `id`
        const response = await axiosInstance.get(`${API_ENDPOINTS.ambulances}/${id}`);

        // Set the ambulanceData state with the fetched data
        setData(response.data);
      } catch (error) {
        console.error('Error fetching ambulance data:', error);
      }
    }

    // Call the fetch function when the component mounts or when `id` changes
    fetchAmbulanceData();
  }, [id]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar heading="แก้ไขข้อมูลรถพยาบาล" />

      {data ? <AmbulanceNewEditForm currentData={data} /> : null}
    </Container>
  );
}
