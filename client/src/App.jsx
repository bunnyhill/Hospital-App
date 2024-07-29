import './App.css';
import { Routes, Route } from 'react-router-dom';
import Role from './pages/Role';
import Login from './pages/Login';
import DoctorPage from './pages/DoctorPage';
import UserPage from './pages/UserPage';

const App = () => {
  return (
    <Routes>
      <Route path="/role" element={<Role />} />
      <Route path="/login/:role" element={<Login />} />
      <Route path="/doctor/:token" element={<DoctorPage />} />
      <Route path="/user/:token" element={<UserPage />} />
    </Routes>
  );
};

export default App;
