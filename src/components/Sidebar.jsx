import { useState } from 'react';
import logo1 from '../assets/logo1.webp';
import '../styles.css';
import { FaBars, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import Navigation from './Navigation';
import Menu from './Menu';

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  function openMenu() {
    setIsClosing(false);
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsClosing(true);
    window.setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 250);
  }

  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <img src={logo1} alt="Site logo" />
        </div>

        <button className="mobile-menu-toggle" onClick={openMenu} aria-label="Open menu">
          <FaBars />
        </button>

        <div className="sidebar-content">
          <Navigation />

          <div className="social-container">
            <a href="https://www.whatsapp.com/" className="social whatsapp" target="_blank" rel="noreferrer">
              <FaWhatsapp />
            </a>
            <a href="https://www.instagram.com/" className="social instagram" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.gmail.com/" className="social email" target="_blank" rel="noreferrer">
              <HiOutlineMail />
            </a>
          </div>
        </div>
      </aside>

      <Menu isOpen={isMenuOpen} isClosing={isClosing} onClose={closeMenu} />
    </>
  );
}