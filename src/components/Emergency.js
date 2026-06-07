import React, { useState } from 'react';
import axios from 'axios';

function Emergency() {
  const [form, setForm] = useState({
    patientLat: '',
    patientLon: '',
    age: '',
    symptoms: '',
    symptomWeight: '',
    trafficLevel: 'LOW'
  });
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/emergency',
        {
          patientLat: parseFloat(form.patientLat),
          patientLon: parseFloat(form.patientLon),
          age: parseInt(form.age),
          symptoms: form.symptoms,
          symptomWeight: parseInt(form.symptomWeight),
          trafficLevel: form.trafficLevel
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data);
      setMessage('✅ Emergency request submitted!');
    } catch (error) {
      setMessage('❌ Error! Please login first.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🚨 Emergency Request</h2>

        <input
          style={styles.input}
          name="patientLat"
          placeholder="Patient Latitude (e.g. 28.5800)"
          value={form.patientLat}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="patientLon"
          placeholder="Patient Longitude (e.g. 77.2050)"
          value={form.patientLon}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="age"
          placeholder="Patient Age"
          value={form.age}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="symptoms"
          placeholder="Symptoms (e.g. Chest Pain)"
          value={form.symptoms}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="symptomWeight"
          placeholder="Symptom Weight (1-10)"
          value={form.symptomWeight}
          onChange={handleChange}
        />

        <select
          style={styles.input}
          name="trafficLevel"
          value={form.trafficLevel}
          onChange={handleChange}
        >
          <option value="LOW">LOW Traffic</option>
          <option value="MEDIUM">MEDIUM Traffic</option>
          <option value="HIGH">HIGH Traffic</option>
        </select>

        <button style={styles.button} onClick={handleSubmit}>
          🚑 Send Emergency Request
        </button>

        {message && <p style={styles.message}>{message}</p>}

        {result && (
          <div style={styles.result}>
            <h3>📋 Result</h3>
            <p>🏥 <b>Hospital ID:</b> {result.assignedHospitalId}</p>
            <p>📍 <b>Distance:</b> {result.distanceKm?.toFixed(2)} km</p>
            <p>⚠️ <b>Severity Score:</b> {result.severityScore?.toFixed(2)}</p>
            <p>🚦 <b>Status:</b> {result.status}</p>
            <p>🕐 <b>Time:</b> {result.createdAt}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px',
    backgroundColor: '#f0f0f0',
    minHeight: '90vh',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    color: '#e94560',
    marginBottom: '20px',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  message: {
    textAlign: 'center',
    marginTop: '15px',
    color: '#333',
  },
  result: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f8f8f8',
    borderRadius: '10px',
    border: '1px solid #ddd',
  }
};

export default Emergency;