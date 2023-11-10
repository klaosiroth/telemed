'use client';

// @mui
import Container from '@mui/material/Container';
// components
import TitleBar from 'src/components/title-bar';
import { useSettingsContext } from 'src/components/settings';
//
import AmbulanceNewEditForm from 'src/sections/ambulance/ambulance-new-edit-form';

// ----------------------------------------------------------------------

export default function AmbulanceCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar heading="เพิ่มข้อมูลรถพยาบาล" />

      <AmbulanceNewEditForm />
    </Container>
  );
}
