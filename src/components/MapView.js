import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [35, 35],
});

const emergencyIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1483/1483336.png',
  iconSize: [35, 35],
});

function MapView() {
  const [hospitals, setHospitals] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hRes = await axios.get('http://localhost:8080/api/hospitals', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHospitals(hRes.data);

        const eRes = await axios.get('http://localhost:8080/api/emergency', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmergencies(eRes.data);
      } catch (error) {
        console.error('Error fetching data');
      }
    };
    fetchData();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🗺️ Live Map</h2>
      <div style={styles.legend}>
        <span style={styles.legendItem}>🏥 Hospital</span>
        <span style={styles.legendItem}>🚨 Emergency</span>
        <span style={styles.legendItem}>🔵 Coverage Area</span>
      </div>
      <MapContainer
        center={[28.5800, 77.2050]}
        zoom={13}
        style={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {hospitals.map(hospital => (
          <React.Fragment key={hospital.id}>
            <Marker
              position={[hospital.latitude, hospital.longitude]}
              icon={hospitalIcon}
            >
              <Popup>
                <div>
                  <h3>🏥 {hospital.name}</h3>
                  <p>📍 {hospital.address}</p>
                  <p>🛏️ Available Beds: <b>{hospital.availableBeds}</b></p>
                  <p>⚕️ Specialization: <b>{hospital.specialization}</b></p>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={[hospital.latitude, hospital.longitude]}
              radius={500}
              color="#1a1a2e"
              fillOpacity={0.1}
            />
          </React.Fragment>
        ))}
        {emergencies.map(emergency => (
          <Marker
            key={emergency.id}
            position={[emergency.patientLat, emergency.patientLon]}
            icon={emergencyIcon}
          >
            <Popup>
              <div>
                <h3>🚨 Emergency #{emergency.id}</h3>
                <p>🤒 Symptoms: <b>{emergency.symptoms}</b></p>
                <p>👤 Age: <b>{emergency.age}</b></p>
                <p>⚠️ Severity: <b>{emergency.severityScore?.toFixed(2)}</b></p>
                <p>📏 Distance: <b>{emergency.distanceKm?.toFixed(2)} km</b></p>
                <p>🚦 Status: <b style={{color: 'orange'}}>{emergency.status}</b></p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    minHeight: '90vh',
  },
  title: {
    color: '#1a1a2e',
    marginBottom: '10px',
  },
  legend: {
    display: 'flex',
    gap: '20px',
    marginBottom: '15px',
    backgroundColor: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: 'fit-content',
  },
  legendItem: {
    fontSize: '14px',
    color: '#333',
  },
  map: {
    height: '600px',
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },
};

export default MapView;