import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Wedding } from './pages/Wedding';
import { Gifts } from './pages/Gifts';
import { RSVP } from './pages/RSVP';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Wedding />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}