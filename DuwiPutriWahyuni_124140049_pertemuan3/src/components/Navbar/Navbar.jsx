import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <span className="navbar__brand">Rak Buku</span>
        <nav aria-label="Navigasi utama" className="navbar__links">
          <NavLink to="/" end className="navbar__link">
            Beranda
          </NavLink>
          <NavLink to="/statistik" className="navbar__link">
            Statistik
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
