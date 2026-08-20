import { NavLink } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar — Navigation component.
 * Uses React Router <NavLink> so navigation happens without a full-page reload.
 */
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">MedCare Plus</div>

      <div className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          Doctors
        </NavLink>

        <NavLink
          to="/booking"
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          Book Appointment
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
