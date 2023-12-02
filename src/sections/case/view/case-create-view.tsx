'use client';

// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CaseNewEditForm from '../case-new-edit-form';

// ----------------------------------------------------------------------

export default function CaseCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        เริ่มภารกิจ
      </Typography>

      <CaseNewEditForm />
    </Container>
  );
}
