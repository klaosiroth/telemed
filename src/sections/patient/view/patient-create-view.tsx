'use client';

// @mui
import Container from '@mui/material/Container';
// components
import TitleBar from 'src/components/title-bar';
import { useSettingsContext } from 'src/components/settings';
//
import PatientNewEditForm from 'src/sections/patient/patient-new-edit-form';

// ----------------------------------------------------------------------

export default function PatientCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar heading="เพิ่มข้อมูลผู้ป่วย" />

      <PatientNewEditForm />
    </Container>
  );
}
