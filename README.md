# 🚑 Smart Emergency Response System — Frontend

React.js frontend with live map visualization, dashboard, and emergency management interface.

## 🔗 Live Repositories
- **Frontend:** https://github.com/Sanskarvishwa07/emergency-response-frontend
- **Backend:** https://github.com/Sanskarvishwa07/emergency-response-backend

## 📌 Overview
A modern React.js application that provides:
- Real-time hospital and emergency visualization on Delhi map
- Dashboard with live statistics
- Emergency request submission with auto hospital assignment
- Secure JWT-based login and registration

## ✨ Features
- ✅ Login & Registration with JWT Authentication
- ✅ Dashboard — hospitals, emergencies, available beds
- ✅ Emergency Request Form with auto hospital assignment
- ✅ Live Map — Leaflet.js + OpenStreetMap
- ✅ Hospital markers with coverage circles
- ✅ Emergency location markers with severity info
- ✅ Popup info on map markers
- ✅ Responsive navigation

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | React.js 18 |
| Maps | Leaflet.js + OpenStreetMap |
| HTTP Client | Axios |
| Routing | React Router DOM |
| Auth Storage | localStorage (JWT) |

## 📁 Project Structure
src/
├── App.js
└── components/
├── Login.js
├── Register.js
├── Dashboard.js
├── Emergency.js
└── MapView.js

## 🗺️ Pages
| Page | Route | Description |
|------|-------|-------------|
| Login | / | JWT authentication |
| Register | /register | New user signup |
| Dashboard | /dashboard | Live stats and tables |
| Emergency | /emergency | Submit emergency request |
| Map | /map | Live hospital and emergency map |

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- Backend running on port 8080

### Steps
```bash
git clone https://github.com/Sanskarvishwa07/emergency-response-frontend.git
cd emergency-response-frontend
npm install
npm start
```
App runs at: `http://localhost:3000`

## 🔐 Authentication Flow
1. Register at `/register`
2. Login at `/` — JWT stored in localStorage
3. All API calls use `Authorization: Bearer <token>`
4. Token expires in 24 hours

## 🚀 Future Enhancements
- Route line on map (patient to hospital)
- WebSocket real-time updates
- Mobile responsive design
- Hospital add/edit form on frontend
- Ambulance live tracking

## 👨‍💻 Author
**Sanskar Vishwakarma**
M.Sc. Mathematics with Computer Science — 4th Semester
Jamia Millia Islamia, New Delhi
GitHub: https://github.com/Sanskarvishwa07
