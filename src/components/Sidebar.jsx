import logo from '../assets/download.png';
import '../styles.css';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="app-nav">
      <Link to="/home" className="home-link">Home</Link>
      <Link to="/works" className="works-link">My Works</Link>
      <Link to="/about" className="about-link">About Me</Link>
    </nav>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Site logo" />
      </div>

      <Navigation />

      <div className="social">
        <a href="https://www.instagram.com/">Instagram</a>
      </div>
    </aside>
  );
}