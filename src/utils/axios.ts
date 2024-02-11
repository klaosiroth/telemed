import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const API_ENDPOINTS = {
  ambulances: '/ambulances',
  ambulanceCameras: '/ambulanceCameras',
  chats: '/chat-messages',
  cases: '/cases',
  caseAudio: '/cases/audio',
  caseDrugs: '/caseDrugs',
  caseMissions: {
    start: '/caseMissions/startMission',
    arrive: '/caseMissions/arriveIncident',
    leave: '/caseMissions/leavingScene',
    hospital: '/caseMissions/arriveHospital',
    finish: '/caseMissions/endMission',
    cancel: '/caseMissions/cancelMission',
  },
  casePatientStatus: '/casePatientStatus',
  drugs: '/drugs',
  drugCategories: '/drugCategories',
  patients: '/patients',
  users: '/users',
  roles: '/roles',
  auth: {
    me: '/auth/me',
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
  },
};
