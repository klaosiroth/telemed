'use client';

// @mui
import Container from '@mui/material/Container';
// components
import TitleBar from 'src/components/title-bar';
import { useSettingsContext } from 'src/components/settings';
//
import DrugNewEditForm from 'src/sections/drug/drug-new-edit-form';

// ----------------------------------------------------------------------

export default function DrugCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar heading="เพิ่มข้อมูลยา" />

      <DrugNewEditForm />
    </Container>
  );
}
