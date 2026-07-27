import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="app-nav">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'home-link active-nav-link' : 'home-link'}>Home</NavLink>
      <NavLink to="/works" className={({ isActive }) => isActive ? 'works-link active-nav-link' : 'works-link'}>My Works</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'about-link active-nav-link' : 'about-link'}>About Me</NavLink>
    </nav>
  );
}