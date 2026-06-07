import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [hospitals, setHospitals] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchHospitals();
    fetchEmergencies();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/hospitals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHospitals(response.data);
    } catch (error) {
      console.error('Error fetching hospitals');
    }
  };

  const fetchEmergencies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/emergency', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmergencies(response.data);
    } catch (error) {
      console.error('Error fetching emergencies');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Dashboard</h2>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <h1 style={styles.statNumber}>{hospitals.length}</h1>
          <p>Total Hospitals</p>
        </div>
        <div style={styles.statCard}>
          <h1 style={styles.statNumber}>{emergencies.length}</h1>
          <p>Total Emergencies</p>
        </div>
        <div style={styles.statCard}>
          <h1 style={styles.statNumber}>
            {hospitals.reduce((sum, h) => sum + h.availableBeds, 0)}
          </h1>
          <p>Available Beds</p>
        </div>
      </div>

      {/* Hospitals Table */}
      <h3 style={styles.subtitle}>🏥 Hospitals</h3>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>Name</th>
            <th>Address</th>
            <th>Available Beds</th>
            <th>Specialization</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map(h => (
            <tr key={h.id} style={styles.tableRow}>
              <td>{h.name}</td>
              <td>{h.address}</td>
              <td>{h.availableBeds}</td>
              <td>{h.specialization}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Emergencies Table */}
      <h3 style={styles.subtitle}>🚨 Emergency Requests</h3>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>ID</th>
            <th>Symptoms</th>
            <th>Age</th>
            <th>Severity Score</th>
            <th>Distance (km)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {emergencies.map(e => (
            <tr key={e.id} style={styles.tableRow}>
              <td>{e.id}</td>
              <td>{e.symptoms}</td>
              <td>{e.age}</td>
              <td>{e.severityScore?.toFixed(2)}</td>
              <td>{e.distanceKm?.toFixed(2)}</td>
              <td style={{color: e.status === 'PENDING' ? 'orange' : 'green'}}>
                {e.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f0f0f0',
    minHeight: '90vh',
  },
  title: {
    color: '#1a1a2e',
    marginBottom: '20px',
  },
  subtitle: {
    color: '#1a1a2e',
    marginTop: '30px',
    marginBottom: '10px',
  },
  statsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#e94560',
    margin: 0,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  tableHeader: {
    backgroundColor: '#1a1a2e',
    color: 'white',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    textAlign: 'center',
    padding: '10px',
  },
};

export default Dashboard;