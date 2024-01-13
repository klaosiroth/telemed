import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './case.css';
import { socket } from 'src/utils/socket';

const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-6 h-6">
  <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
</svg>
`;

const customIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(svgString)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function CaseAdminLocationTracker() {
  const [position, setPosition] = useState<[number, number]>([12.68832, 100.98156]);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    socket.connect();

    const handleLocationUpdate = (data: [number, number]) => {
      setPosition(data);

      if (mapRef.current) {
        mapRef.current.setView(data, mapRef.current.getZoom());
      }
    };

    socket.on('location', handleLocationUpdate);

    return () => {
      socket.off('location', handleLocationUpdate);
      socket.disconnect();
    };
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: '100%', height: 'calc(100% - 48px)' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>Your current location</Popup>
      </Marker>
    </MapContainer>
  );
}
