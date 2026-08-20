import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Navigation component
import Navbar from './components/Navbar';

// Page components
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is rendered on every page */}
      <Navbar />

      {/* Route definitions */}
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
