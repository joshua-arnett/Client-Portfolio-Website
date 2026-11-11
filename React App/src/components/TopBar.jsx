import { useState } from 'react';
import logo from '../assets/logo.png';
import '../styles.css';
import { FaBars } from 'react-icons/fa';
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
      </div>

      <Menu isOpen={isMenuOpen} isClosing={isClosing} onClose={closeMenu} />
    </>
  );
}