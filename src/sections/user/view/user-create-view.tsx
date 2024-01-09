'use client';

// @mui
import Container from '@mui/material/Container';
// components
import TitleBar from 'src/components/title-bar';
import { useSettingsContext } from 'src/components/settings';
//
import UserNewEditForm from 'src/sections/user/user-new-edit-form';

// ----------------------------------------------------------------------

export default function UserCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TitleBar heading="เพิ่มข้อมูลผู้ใช้งาน" />

      <UserNewEditForm />
    </Container>
  );
}
