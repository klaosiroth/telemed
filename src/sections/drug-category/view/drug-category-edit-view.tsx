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
import { DrugCategory } from 'src/types/drug';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import DrugCategoryNewEditForm from 'src/sections/drug-category/drug-category-new-edit-form';

// ----------------------------------------------------------------------

export default function DrugCategoryEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const [data, setData] = useState<DrugCategory | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.drugCategories}/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar heading="แก้ไขข้อมูลกลุ่มยา" />

      {data ? <DrugCategoryNewEditForm currentData={data} /> : null}
    </Container>
  );
}
