import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'src/routes/hook';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import styles from './case-mission.module.css';

type Camera = {
  ambulanceCameraId: string;
  // deviceUrl: string; // rtmpStreamURL
  deviceUrlRender: string;
};

export default function CaseVideoPlayer() {
  const { id: caseId } = useParams();
  const [cameras, setCameras] = useState<Camera[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.cases}/${caseId}`);
      const ambulanceCameras = response.data.ambulance?.ambulanceCamera || [];
      setCameras(ambulanceCameras);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [caseId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderVideoPlayers = () =>
    cameras.map((camera) => (
      <div key={camera.ambulanceCameraId} className={styles.video}>
        <ReactPlayer
          url={camera.deviceUrlRender}
          playing
          controls={false}
          width="100%"
          height="100%"
          autoPlay
          loop
          muted
          allowFullScreen
        />
      </div>
    ));

  return <>{renderVideoPlayers()}</>;
}
