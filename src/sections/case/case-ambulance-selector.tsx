import { useState } from 'react';
import { Card, CardContent, Typography, Button, Modal, Grid } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';

export default function CaseAmbulanceSelector() {
  const router = useRouter();
  const [selectedAmbulance, setSelectedAmbulance] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAmbulanceSelection = (ambulance: any) => {
    setSelectedAmbulance(ambulance);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.ambulances}/${selectedAmbulance.id}`
      );
      router.push(paths.dashboard.case.patient);
      console.info('Ambulance selected:', response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setSelectedAmbulance(null);
    setShowModal(false);
  };

  const ambulanceData = [
    {
      id: '18ded263-1274-47ca-b34d-1b0ffb317845',
      name: 'รถพยาบาล 1',
      imageUrl: 'https://cf.autodeft2.pw/uploads/images/ablvan1.jpg',
      status: 'Active',
      registration: '9 กก 9999',
      brand: 'Toyota',
    },
    {
      id: 'd3666de8-1ef9-4ee3-9cad-6a46a16e56c4',
      name: 'รถพยาบาล 2',
      imageUrl: 'https://cf.autodeft2.pw/uploads/images/ablvan1.jpg',
      status: 'Inactive',
      registration: '8 สส 8888',
      brand: 'Ford',
    },
    {
      id: 'ffccf0f6-472c-4f02-931e-a6fccee4276c',
      name: 'รถพยาบาล 3',
      imageUrl: 'https://cf.autodeft2.pw/uploads/images/ablvan1.jpg',
      status: 'Active',
      registration: '1 กก 111',
      brand: 'Chevrolet',
    },
  ];

  return (
    <Grid container spacing={3}>
      {ambulanceData.map((ambulance) => (
        <Grid item key={ambulance.id} xs={12} sm={6} md={4}>
          <Card
            onClick={() => handleAmbulanceSelection(ambulance)}
            style={{
              cursor: 'pointer',
              border: ambulance.status === 'Active' ? '2px solid green' : '2px solid red',
            }}
          >
            <img
              src={ambulance.imageUrl}
              alt={ambulance.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6">{ambulance.name}</Typography>
              <Typography>ทะเบียนรถ: {ambulance.registration}</Typography>
              <Typography>ยี่ห้อ: {ambulance.brand}</Typography>
              <Typography color={ambulance.status === 'Active' ? 'success.main' : 'error.main'}>
                สถานะ: {ambulance.status === 'Active' ? 'พร้อมใช้งาน' : 'ไม่พร้อมใช้งาน'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Modal for confirmation */}
      <Modal open={showModal} onClose={handleCancel}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Card>
            <CardContent>
              {selectedAmbulance && (
                <>
                  <Typography variant="h6">รถพยาบาลที่เลือก: {selectedAmbulance.name}</Typography>
                  <Typography>ทะเบียนรถ: {selectedAmbulance.registration}</Typography>
                  <Typography>ยี่ห้อ: {selectedAmbulance.brand}</Typography>
                </>
              )}
            </CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px' }}>
              <Button variant="outlined" onClick={handleCancel}>
                ยกเลิก
              </Button>
              <Button variant="contained" onClick={handleConfirm} color="primary">
                ยืนยัน
              </Button>
            </div>
          </Card>
        </div>
      </Modal>
    </Grid>
  );
}

// import React, { useState } from 'react';
// import { Card, CardContent, Typography, Button, Grid, Badge, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// const AmbulanceSelector = () => {
//   const [selectedAmbulance, setSelectedAmbulance] = useState<any | null>(null);
//   const [showDialog, setShowDialog] = useState(false);

//   const handleAmbulanceSelection = (ambulance: any) => {
//     setSelectedAmbulance(ambulance);
//     setShowDialog(true);
//   };

//   const handleConfirm = () => {
//     console.log(
//       `Ambulance ${selectedAmbulance.name} with registration ${selectedAmbulance.registration} selected.`
//     );
//     setShowDialog(false);
//   };

//   const handleCancel = () => {
//     setSelectedAmbulance(null);
//     setShowDialog(false);
//   };

//   const ambulanceData = [
//     { id: 1, name: 'Ambulance 1', imageUrl: 'ambulance1.jpg', status: 'Active', registration: 'ABC 123', brand: 'Toyota' },
//     { id: 2, name: 'Ambulance 2', imageUrl: 'ambulance2.jpg', status: 'Inactive', registration: 'XYZ 789', brand: 'Ford' },
//     { id: 3, name: 'Ambulance 3', imageUrl: 'ambulance3.jpg', status: 'Active', registration: 'PQR 456', brand: 'Chevrolet' },
//   ];

//   return (
//     <Grid container spacing={3}>
//       {ambulanceData.map((ambulance) => (
//         <Grid item key={ambulance.id} xs={12} sm={6} md={4}>
//           <Card
//             onClick={() => handleAmbulanceSelection(ambulance)}
//             style={{
//               cursor: 'pointer',
//               border: ambulance.status === 'Active' ? '2px solid green' : '2px solid red',
//             }}
//           >
//             <img
//               src={ambulance.imageUrl}
//               alt={ambulance.name}
//               style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//             />
//             <CardContent>
//               <Typography variant="h6">{ambulance.name}</Typography>
//               <Typography>Registration: {ambulance.registration}</Typography>
//               <Typography>Brand: {ambulance.brand}</Typography>
//               <Badge
//                 color={ambulance.status === 'Active' ? 'success' : 'error'}
//                 badgeContent={ambulance.status}
//               />
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}

//       {/* Dialog for confirmation */}
//       <Dialog open={showDialog} onClose={handleCancel}>
//         <DialogTitle>Confirm Ambulance Selection</DialogTitle>
//         <DialogContent>
//           {selectedAmbulance && (
//             <>
//               <Typography variant="h6">Selected Ambulance: {selectedAmbulance.name}</Typography>
//               <Typography>Registration: {selectedAmbulance.registration}</Typography>
//               <Typography>Brand: {selectedAmbulance.brand}</Typography>
//               <Badge
//                 color={selectedAmbulance.status === 'Active' ? 'success' : 'error'}
//                 badgeContent={selectedAmbulance.status}
//               />
//             </>
//           )}
//           <Typography>Are you sure you want to select this ambulance?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancel} variant="outlined">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirm} variant="contained" color="primary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Grid>
//   );
// };

// export default AmbulanceSelector;
