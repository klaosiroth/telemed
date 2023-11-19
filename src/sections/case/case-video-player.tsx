import styles from './case-mission.module.css';

export default function CaseVideoPlayer() {
  // const videoUrl =
  //   'https://isgpopen.ezvizlife.com/v3/openlive/BB0537990_1_1.m3u8?expire=1762614043&id=646485035898208256&c=8a5f635eb0&t=a66b8f5f7e5045239d63b15b362b7559a966de4facb5ac9d8329f5e21756ff39&ev=100';
  // const rtmpUrl =
  //   'rtmp://vtmsgpzl.ezvizlife.com:1935/v3/openlive/BB0537990_1_2?expire=1762614043&id=646485036133388288&c=8a5f635eb0&t=e8b1959a31016dd957ddcf40e9233e5eb5c4b4a0e50ead1fe4f655699929643f&ev=100';

  return (
    <>
      {[...Array(4)].map((_, index) => (
        <div key={index} className={styles.video}>
          RTMP Video Streaming
          {/* <iframe
            title="Video Player"
            width="100%"
            height="auto"
            src={`https://isgpopen.ezviz.com/console/h5videoPlayer.html?videoUrl=${encodeURIComponent(
              videoUrl
            )}`}
            allowFullScreen
          /> */}
        </div>
      ))}
    </>
  );
}
