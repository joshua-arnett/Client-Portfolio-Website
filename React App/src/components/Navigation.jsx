import { NavLink } from 'react-router-dom';

// TopBar navigation links for the main pages.
export default function Navigation() {
  return (
    <nav className="app-nav">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'home-link active-nav-link' : 'home-link'}>HOME</NavLink>
      <NavLink to="/works" className={({ isActive }) => isActive ? 'works-link active-nav-link' : 'works-link'}>MY WORKS</NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? 'contact-link active-nav-link' : 'contact-link'}>CONTACT ME</NavLink>
    </nav>
  );
}