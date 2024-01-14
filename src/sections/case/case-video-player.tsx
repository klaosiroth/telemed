import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'src/routes/hook';
import axiosInstance, { API_ENDPOINTS } from 'src/utils/axios';
import styles from './case-mission.module.css';

type Camera = {
  ambulanceCameraId: string;
  deviceUrl: string;
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
          // url={camera.deviceUrl} // rtmpStreamURL
          url="https://isgpopen.ezvizlife.com/v3/openlive/BB0537990_1_2.m3u8?expire=1765456203&id=658405916897087488&c=d8add32561&t=114eebb148ae7e95457c9098d60d66631ab4425c0e68a258560fccf285b201d7&ev=100"
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
