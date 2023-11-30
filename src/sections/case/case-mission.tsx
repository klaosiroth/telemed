// 'use client';

import { useState } from 'react';
// @mui
import Button from '@mui/material/Button';
// routes
import { useParams } from 'src/routes/hook';
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
//
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import styles from './case-mission.module.css';

const CASE_MISION = {
  START: 1,
  ARRIVE: 2,
  LEAVE: 3,
  HOSPITAL: 4,
  FINISH: 5,
  CANCLE: 6,
};

const CaseMission = () => {
  const params = useParams();

  const { id } = params;

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [modal4Open, setModal4Open] = useState(false);

  // const handleModal1Click = () => {
  //   setModal1Open(!modal1Open);
  // };

  // const handleModal2Click = () => {
  //   setModal2Open(!modal2Open);
  // };

  // const handleModal3Click = () => {
  //   setModal3Open(!modal3Open);
  // };

  // const handleModal4Click = () => {
  //   setModal4Open(!modal4Open);
  // };

  // const handleFormSubmit = (formData: any) => {
  //   // Make API request using formData
  //   // Implement your API logic here
  // };

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
        prefixModal: CASE_MISION.ARRIVE,
        dateArriveIncident: new Date(),
      };
      await axiosInstance.post(API_ENDPOINTS.caseMissions.arrive, caseMissionData);
      toggleModal1();
      console.log('Modal 1 submitted:', caseMissionData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm2Action = async () => {
    try {
      const caseMissionData = {
        caseId: id,
        prefixModal: CASE_MISION.LEAVE,
        dateArriveIncident: new Date(),
      };
      await axiosInstance.post(API_ENDPOINTS.caseMissions.leave, caseMissionData);
      toggleModal2();
      console.log('Modal 2 submitted:', caseMissionData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm3Action = async () => {
    try {
      const caseMissionData = {
        caseId: id,
        prefixModal: CASE_MISION.HOSPITAL,
        dateArriveIncident: new Date(),
      };
      await axiosInstance.post(API_ENDPOINTS.caseMissions.hospital, caseMissionData);
      toggleModal3();
      console.log('Modal 3 submitted:', caseMissionData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm4Action = async () => {
    try {
      const timestamp = new Date().toISOString();
      await new Promise((resolve) => setTimeout(resolve, 500));
      toggleModal4();
      console.log('Modal 4 submitted:', timestamp);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className={styles.menu}>
        <Button className={styles.menuItem} variant="contained" onClick={toggleModal1}>
          ถึงที่เกิดเหตุ
        </Button>
        <Button className={styles.menuItem} variant="contained" onClick={toggleModal2}>
          ออกจากที่เกิดเหตุ
        </Button>
        <Button className={styles.menuItem} variant="contained" onClick={toggleModal3}>
          ถึงสถานพยาบาล
        </Button>
        <Button className={styles.menuItem} variant="contained" onClick={toggleModal4}>
          จบภาระกิจ
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
        title="จบภาระกิจ"
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
};

export default CaseMission;

// const stypes = {
//   `.menu {
//     grid-area: menu;
//     display: flex;
//     gap: 0.5rem;

//   }

//   .menuItem {
//     flex: 1;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     text-align: center;
//     height: 100%;
//     position: relative;
//   }

//   .menuItem::before {
//     content: "";
//     display: inline-block;
//     vertical-align: middle;
//     height: 100%;
//   }
//   `
// }

const getCurrentDateTimeString = () => {
  const now = new Date();
  const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear() + 543}`;
  const hours = now.getHours();
  const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const formattedTime = `${hours}.${minutes} น.`;
  return `วันที่ ${formattedDate} เวลา ${formattedTime}`;
};
// import { useState } from 'react';
// import Button from '@mui/material/Button';
// import { useParams } from 'src/routes/hook';
// import { ConfirmDialog } from 'src/components/custom-dialog';
// import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
// import styles from './case-mission.module.css';

// const CASE_MISSION = {
//   START: 1,
//   ARRIVE: 2,
//   LEAVE: 3,
//   HOSPITAL: 4,
//   FINISH: 5,
//   CANCEL: 6,
// };

// const modalTitles = {
//   1: 'ถึงที่เกิดเหตุ',
//   2: 'ออกจากที่เกิดเหตุ',
//   3: 'ถึงสถานพยาบาล',
//   4: 'จบภาระกิจ',
// };

// const CaseMission = () => {
//   const params = useParams();
//   const { id } = params;

//   const [modals, setModals] = useState([false, false, false, false]);

//   const toggleModal = (index: number) => {
//     setModals((prevModals) => {
//       const updatedModals = [...prevModals];
//       updatedModals[index] = !updatedModals[index];
//       return updatedModals;
//     });
//   };

//   const handleConfirmAction = async (prefixModal: number) => {
//     try {
//       const caseMissionData = {
//         caseId: id,
//         prefixModal,
//         dateArriveIncident: new Date(),
//       };

//       await axiosInstance.post(API_ENDPOINTS.caseMissions[prefixModal], {
//         caseMissionData,
//       });

//       const modalIndex = prefixModal - 1;
//       toggleModal(modalIndex);
//       console.log(`Modal ${modalIndex + 1} submitted:`, caseMissionData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const createModal = (index) => (
//     <ConfirmDialog
//       key={index}
//       open={modals[index]}
//       onClose={() => toggleModal(index)}
//       title={modalTitles[index + 1]}
//       content={`ยืนยันการ${modalTitles[index + 1]} ช่วยเหลือผู้ป่วย\n${getCurrentDateTimeString()}`}
//       action={
//         <Button variant="contained" color="primary" onClick={() => handleConfirmAction(index + 1)}>
//           ยืนยัน
//         </Button>
//       }
//     />
//   );

//   return (
//     <div>
//       <section className={styles.menu}>
//         {[1, 2, 3, 4].map((index) => (
//           <Button
//             key={index}
//             className={styles.menuItem}
//             variant="contained"
//             onClick={() => toggleModal(index - 1)}
//           >
//             {modalTitles[index]}
//           </Button>
//         ))}
//       </section>

//       {modals.map((_, index) => createModal(index))}
//     </div>
//   );
// };

// export default CaseMission;

// const getCurrentDateTimeString = () => {
//   const now = new Date();
//   const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear() + 543}`;
//   const hours = now.getHours();
//   const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
//   const formattedTime = `${hours}.${minutes} น.`;
//   return `วันที่ ${formattedDate} เวลา ${formattedTime}`;
// };
