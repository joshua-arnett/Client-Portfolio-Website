import { NavLink } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export default function Menu({ isOpen, isClosing, onClose }) {
  return (
    <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`} onClick={onClose}>
      <div className="mobile-menu-panel" onClick={(event) => event.stopPropagation()}>
        <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
          ×
        </button>

        <nav className="mobile-app-nav">
          <NavLink to="/home" onClick={onClose}>Home</NavLink>
          <NavLink to="/works" onClick={onClose}>My Works</NavLink>
          <NavLink to="/about" onClick={onClose}>About Me</NavLink>
        </nav>

        <div className="mobile-social-container">
          <a href="https://www.whatsapp.com/" target="_blank" rel="noreferrer" onClick={onClose}>
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" onClick={onClose}>
            <FaInstagram />
          </a>
          <a href="https://www.gmail.com/" target="_blank" rel="noreferrer" onClick={onClose}>
            <HiOutlineMail />
          </a>
        </div>
      </div>
    </div>
  );
}