import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MyWorksPage from './pages/MyWorksPage';
import Footer from './components/Footer'
import './styles.css';

// Main app layout: sidebar on the left, page content in the middle, footer below.
export default function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-shell">
        <main className="main-page">
          <Routes>
            {/* Redirect the root URL to the home page */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/works" element={<MyWorksPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}