import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Emergency from './components/Emergency';
import MapView from './components/MapView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={styles.nav}>
          <h2 style={styles.logo}>🚑 Emergency Response</h2>
          <div>
            <Link to="/" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/emergency" style={styles.link}>Emergency</Link>
            <Link to="/map" style={styles.link}>🗺️ Map</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/map" element={<MapView />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  nav: {
    backgroundColor: '#1a1a2e',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#e94560',
    margin: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '20px',
    fontSize: '16px',
  }
};

export default App;