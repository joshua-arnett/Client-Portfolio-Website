import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorksPage from './pages/WorksPage';
import Footer from './components/Footer'
import './styles.css';

// Main app layout:  Top bar on top, page content in the middle, footer below.
export default function App() {
  return (
    <div className="app-container">
      <TopBar />
      <main className="main-page">
        <Routes>
          {/* Redirect the root URL to the home page */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/:slug" element={<WorksPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}