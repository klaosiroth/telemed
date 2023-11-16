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
  cases: '/cases',
  caseMissions: {
    startMission: '/caseMissions/startMission',
    arriveIncident: '/caseMissions/arriveIncident',
    leavingScene: '/caseMissions/leavingScene',
    arriveHospital: '/caseMissions/arriveHospital',
    endMission: '/caseMissions/endMission',
    cancelMission: '/caseMissions/cancelMission',
  },
  drugs: '/drugs',
  drugCategories: '/drugCategories',
  patients: '/patients',
  auth: {
    me: '/auth/me',
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
  },
};
