'use client';

import { useCallback, useState } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
//
import CaseChat from '../case-chat';
import CaseMission from '../case-mission';
import CaseDetailsDispenser from '../case-details-dispenser';
import CaseLocationTracker from '../case-location-tracker';
import VideoPlayer from '../case-video-player';
import styles from '../case-mission.module.css';

const TABS = [
  { value: 'map', label: 'แผนที่' },
  { value: 'info', label: 'ข้อมูลผู้ป่วย' },
];

export default function CaseDetailsView() {
  const [currentTab, setCurrentTab] = useState('map');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={false}>
      <div className={styles.gridContainer}>
        <CaseMission />
        <section className={styles.main}>
          <div className={styles.tabs}>
            <Tabs value={currentTab} onChange={handleChangeTab}>
              {TABS.map((tab) => (
                <Tab key={tab.value} value={tab.value} label={tab.label} />
              ))}
            </Tabs>
            {currentTab === 'map' && <CaseLocationTracker />}
            {currentTab === 'info' && <>ข้อมูลผู้ป่วย</>}
          </div>
          <div className={styles.status}>
            <div className={styles.statusTitle}>รายละเอียด</div>
            <div className={styles.statusBlocks}>
              <Card className={styles.statusBlock}>
                <div>Pulse</div>
                <div>-1</div>
              </Card>
              <Card className={styles.statusBlock}>
                <div>อัตราชีพจร</div>
                <div>80 /m</div>
              </Card>
              <Card className={styles.statusBlock}>
                <div>ความดันโลหิต</div>
                <div>120/72 BP</div>
              </Card>
              <Card className={styles.statusBlock}>
                <div>Respiratory rate</div>
                <div>0</div>
              </Card>
              <Card className={styles.statusBlock}>
                <div>Blood pressure</div>
                <div>-</div>
              </Card>
              <Card className={styles.statusBlock}>
                <div>Body Temperature</div>
                <div>-1</div>
              </Card>
              <Card className={styles.statusBlock}>
                <div>Plan score</div>
                <div>5</div>
              </Card>
              <Card className={styles.statusBlock}>
                <div>Nauro</div>
                <div>-</div>
              </Card>
              <Card className={styles.statusBlock}>
                <div>GCS</div>
                <div>E4-M6-V5</div>
              </Card>
              <Card className={styles.statusBlock}>
                <div>DTX</div>
                <div>123</div>
              </Card>
              <Card className={styles.statusBlock}>
                <div>Pupils</div>
                <div>Reaction</div>
              </Card>
              <Card className={styles.statusBlock}>
                <div>ARI</div>
                <div>-</div>
              </Card>
            </div>
          </div>
        </section>
        <section className={styles.videoContainer}>
          <VideoPlayer />
        </section>
        <aside className={styles.sidebar}>
          <CaseChat />
        </aside>
        <section className={styles.note}>
          <CaseDetailsDispenser />
        </section>
      </div>
    </Container>
  );
}
