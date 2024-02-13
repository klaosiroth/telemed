import { useEffect, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
// routes
import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hook';
import { socket } from 'src/utils/socket';
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
//
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import styles from './case-mission.module.css';

const CASE_MISSION = {
  START: 1,
  ARRIVE: 2,
  LEAVE: 3,
  HOSPITAL: 4,
  FINISH: 5,
  CANCEL: 6,
};

export default function CaseMission() {
  const router = useRouter();
  const params = useParams();

  const { id } = params;

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [modal4Open, setModal4Open] = useState(false);
  const [isAction1Completed, setIsAction1Completed] = useState(false);
  const [isAction2Completed, setIsAction2Completed] = useState(false);
  const [isAction3Completed, setIsAction3Completed] = useState(false);
  const [isAction4Completed, setIsAction4Completed] = useState(false);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.cases}/${id}`);
        const [caseMission] = response.data.caseMissions;

        // Update state based on API response
        setIsAction1Completed(caseMission.prefixModal >= CASE_MISSION.ARRIVE);
        setIsAction2Completed(caseMission.prefixModal >= CASE_MISSION.LEAVE);
        setIsAction3Completed(caseMission.prefixModal >= CASE_MISSION.HOSPITAL);
        setIsAction4Completed(caseMission.prefixModal >= CASE_MISSION.FINISH);

        console.log('response', caseMission);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, [id]);

  const toggleModal1 = () => {
    setModal1Open((prev) => !prev);
  };

  const toggleModal2 = () => {
    setModal2Open((prev) => !prev);
  };

  const toggleModal3 = () => {
    setModal3Open((prev) => !prev);
  };

  const toggleModal4 = () => {
    setModal4Open((prev) => !prev);
  };

  const handleConfirm1Action = async () => {
    try {
      const caseMissionData = {
        caseId: id,
        prefixModal: CASE_MISSION.ARRIVE,
        dateArriveIncident: new Date(),
      };
      await axiosInstance.post(API_ENDPOINTS.caseMissions.arrive, caseMissionData);
      toggleModal1();
      setIsAction1Completed(true);
      console.log('Modal 1 submitted:', caseMissionData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm2Action = async () => {
    try {
      const caseMissionData = {
        caseId: id,
        prefixModal: CASE_MISSION.LEAVE,
        dateLeavingScene: new Date(),
      };
      await axiosInstance.post(API_ENDPOINTS.caseMissions.leave, caseMissionData);
      toggleModal2();
      setIsAction2Completed(true);
      console.log('Modal 2 submitted:', caseMissionData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm3Action = async () => {
    try {
      const caseMissionData = {
        caseId: id,
        prefixModal: CASE_MISSION.HOSPITAL,
        dateArriveHospital: new Date(),
      };
      await axiosInstance.post(API_ENDPOINTS.caseMissions.hospital, caseMissionData);
      toggleModal3();
      setIsAction3Completed(true);
      console.log('Modal 3 submitted:', caseMissionData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm4Action = async () => {
    try {
      const caseMissionData = {
        caseId: id,
        prefixModal: CASE_MISSION.FINISH,
        dateEndMission: new Date(),
      };
      await axiosInstance.post(API_ENDPOINTS.caseMissions.finish, caseMissionData);
      socket.emit('audio:stop', id);
      socket.emit('CreateCase');
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      setTimeout(async () => {
        toggleModal4();
        setIsAction4Completed(true);
        console.log('Modal 4 submitted:', caseMissionData);
        router.push(paths.dashboard.root);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className={styles.menu}>
        <Button
          className={styles.menuItem}
          color={isAction1Completed ? 'success' : 'inherit'}
          variant="contained"
          onClick={toggleModal1}
        >
          ถึงที่เกิดเหตุ
        </Button>
        <Button
          className={styles.menuItem}
          color={isAction2Completed ? 'success' : 'inherit'}
          variant="contained"
          onClick={toggleModal2}
        >
          ออกจากที่เกิดเหตุ
        </Button>
        <Button
          className={styles.menuItem}
          color={isAction3Completed ? 'success' : 'inherit'}
          variant="contained"
          onClick={toggleModal3}
        >
          ถึงสถานพยาบาล
        </Button>
        <Button
          className={styles.menuItem}
          color={isAction4Completed ? 'success' : 'inherit'}
          variant="contained"
          onClick={toggleModal4}
        >
          จบภารกิจ
        </Button>
      </section>

      <ConfirmDialog
        open={modal1Open}
        onClose={toggleModal1}
        title="ถึงที่เกิดเหตุ"
        content={
          <>
            ยืนยันการถึงสถานที่เกิดเหตุ ช่วยเหลือผู้ป่วย <br />
            {getCurrentDateTimeString()}
          </>
        }
        action={
          <Button variant="contained" color="primary" onClick={handleConfirm1Action}>
            ยืนยัน
          </Button>
        }
      />
      <ConfirmDialog
        open={modal2Open}
        onClose={toggleModal2}
        title="ออกจากที่เกิดเหตุ"
        content={
          <>
            ยืนยันการออกจากสถานที่เกิดเหตุ ช่วยเหลือผู้ป่วย <br />
            {getCurrentDateTimeString()}
          </>
        }
        action={
          <Button variant="contained" color="primary" onClick={handleConfirm2Action}>
            ยืนยัน
          </Button>
        }
      />
      <ConfirmDialog
        open={modal3Open}
        onClose={toggleModal3}
        title="ถึงสถานพยาบาล"
        content={
          <>
            ยืนยันการถึงสถานพยาบาล ช่วยเหลือผู้ป่วย <br />
            {getCurrentDateTimeString()}
          </>
        }
        action={
          <Button variant="contained" color="primary" onClick={handleConfirm3Action}>
            ยืนยัน
          </Button>
        }
      />
      <ConfirmDialog
        open={modal4Open}
        onClose={toggleModal4}
        title="จบภารกิจ"
        content={
          <>
            ยืนยันการจบภารกิจ ช่วยเหลือผู้ป่วย <br />
            {getCurrentDateTimeString()}
          </>
        }
        action={
          <Button variant="contained" color="primary" onClick={handleConfirm4Action}>
            ยืนยัน
          </Button>
        }
      />
    </>
  );
}

const getCurrentDateTimeString = () => {
  const now = new Date();
  const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear() + 543}`;
  const hours = now.getHours();
  const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const formattedTime = `${hours}.${minutes} น.`;
  return `วันที่ ${formattedDate} เวลา ${formattedTime}`;
};
