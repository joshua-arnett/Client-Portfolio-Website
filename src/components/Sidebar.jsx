import logo1 from '../assets/logo1.webp';
import '../styles.css';
import { NavLink, Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

function Navigation() {
  return (
    <nav className="app-nav">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'home-link active-nav-link' : 'home-link'}>Home</NavLink>
      <NavLink to="/works" className={({ isActive }) => isActive ? 'works-link active-nav-link' : 'works-link'}>My Works</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'about-link active-nav-link' : 'about-link'}>About Me</NavLink>
    </nav>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo1} alt="Site logo" />
      </div>

      <Navigation />

      <div className="social-container">
        <Link to="https://www.whatsapp.com/" className="social whatsapp">
          <FaWhatsapp />
        </Link>
        <Link to="https://www.instagram.com/" className="social instagram">
          <FaInstagram />
        </Link>
        <Link to="https://www.gmail.com/" className="social email">
          <HiOutlineMail />
        </Link>
      </div>
    </aside>
  );
}