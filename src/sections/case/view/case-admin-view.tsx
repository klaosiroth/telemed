'use client';

// @mui
import Container from '@mui/material/Container';

// components
import TitleBar from 'src/components/title-bar';
import { useSettingsContext } from 'src/components/settings';
import CaseAdminAmbulanceList from '../case-admin-ambulance-list';

// ----------------------------------------------------------------------

export default function CaseAdminView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar heading="รถปฏิบัติภารกิจ" />

      <CaseAdminAmbulanceList />
    </Container>
  );
}
