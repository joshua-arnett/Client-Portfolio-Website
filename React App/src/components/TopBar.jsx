import { useState } from 'react';
import logo from '../assets/logo.png';
import '../styles.css';
import { FaBars, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { TbBrandLinkedin } from "react-icons/tb";
import Navigation from './Navigation';
import Menu from './Menu';

export default function Topbar() {
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
      <div className="topbar">
        <div className="logo-wrapper">
          <img src={logo} alt="Site logo" />
        </div>

        <button className="mobile-menu-toggle" onClick={openMenu} aria-label="Open menu">
          <FaBars />
        </button>

        <Navigation />

        <div className="social-container">
          <a href="https://wa.me/6287731777090" className="social whatsapp" target="_blank" rel="noreferrer">
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/gabriellagiovanni/" className="social instagram" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/gabriella-giovanni-b511791b7/" className="social linkedin" target="_blank" rel="noreferrer">
            <TbBrandLinkedin />
          </a>
          <a href="mailto:by.gabriellagiovanni@gmail.com" className="social email" target="_blank" rel="noreferrer">
            <HiOutlineMail />
          </a>
        </div>
      </div>

      <Menu isOpen={isMenuOpen} isClosing={isClosing} onClose={closeMenu} />
    </>
  );
}