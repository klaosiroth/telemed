/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Convert the SVG to a data URL
const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-6 h-6">
  <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
</svg>
`;

// Define a custom icon
const customIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(svgString)}`, // Convert the SVG to base64
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  // popupAnchor: [0, -32], // Popup anchor point
});

export default function CaseLocationTracker() {
  const [position, setPosition] = useState<[number, number]>([13.7563, 100.5018]); // Initial map center coordinates
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Function to get the current location
    const getCurrentLocation = () => {
      // Get user's current location using geolocation API
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]);

          // Check if the map ref is available
          if (mapRef.current) {
            // Set the view to the new coordinates
            mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    };

    // Get the current location immediately when the component mounts
    getCurrentLocation();

    // Set up an interval to get the current location every 5 minutes
    const intervalId = setInterval(() => {
      getCurrentLocation();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once when the component mounts

  console.log('current position', position);

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
      {/* renderMarker */}
      <Marker position={position} icon={customIcon}>
        <Popup>Your current location</Popup>
      </Marker>
    </MapContainer>
  );
}
