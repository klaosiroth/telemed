'use client';

// @mui
import Container from '@mui/material/Container';
// components
import TitleBar from 'src/components/title-bar';
import { useSettingsContext } from 'src/components/settings';
//
import DrugCategoryNewEditForm from 'src/sections/drug-category/drug-category-new-edit-form';

// ----------------------------------------------------------------------

export default function DrugCategoryCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar heading="เพิ่มข้อมูลกลุ่มยา" />

      <DrugCategoryNewEditForm />
    </Container>
  );
}
