import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <BrowserRouter>
      {/* Simple navigation bar linking to each page */}
      <nav style={navStyle}>
        <span style={{ fontWeight: '700', fontSize: '16px' }}>MedCare Plus</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <NavLink to="/" end style={linkStyle}>Home</NavLink>
          <NavLink to="/doctors" style={linkStyle}>Doctors</NavLink>
          <NavLink to="/booking" style={linkStyle}>Book Appointment</NavLink>
        </div>
      </nav>

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 24px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e5e7eb',
};

const linkStyle = ({ isActive }) => ({
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  color: isActive ? '#2563eb' : '#374151',
});

export default App;
