'use client';

import { useCallback, useState } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
//
import CaseAdminMission from '../case-admin-mission';
import CaseAdminDispenser from '../case-admin-dispenser';
import CaseAdminLocationTracker from '../case-admin-location-tracker';
import VideoPlayer from '../case-video-player';
import Chat from '../chat';
import CasePatient from '../case-patient';
import CasePatientStatus from '../case-patient-status';
import styles from '../case-mission.module.css';

const TABS = [
  { value: 'map', label: 'แผนที่' },
  { value: 'info', label: 'ข้อมูลผู้ป่วย' },
];

export default function CaseAdminDetailsView() {
  const [currentTab, setCurrentTab] = useState('map');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={false}>
      <div className={styles.gridContainer}>
        <CaseAdminMission />
        <section className={styles.main}>
          <div className={styles.tabs}>
            <Tabs value={currentTab} onChange={handleChangeTab}>
              {TABS.map((tab) => (
                <Tab key={tab.value} value={tab.value} label={tab.label} />
              ))}
            </Tabs>
            {currentTab === 'map' && <CaseAdminLocationTracker />}
            {currentTab === 'info' && <CasePatient />}
          </div>
          <CasePatientStatus />
        </section>
        <section className={styles.videoContainer}>
          <VideoPlayer />
        </section>
        <aside className={styles.sidebar}>
          <Chat />
        </aside>
        <section className={styles.note}>
          <CaseAdminDispenser />
        </section>
      </div>
    </Container>
  );
}
