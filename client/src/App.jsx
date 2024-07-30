import './App.css';
import { Routes, Route } from 'react-router-dom';
import Role from './pages/Role';
import Login from './pages/Login';
import DoctorHomePage from './pages/DoctorHomePage';
import UserPage from './pages/UserPage';
import DoctorSlotPage from './pages/DoctorSlotPage';

const App = () => {
  return (
    <Routes>
      <Route path="/role" element={<Role />} />
      <Route path="/login/:role" element={<Login />} />
      <Route path="/doctor/home" element={<DoctorHomePage />} />
      <Route path="/user/home" element={<UserPage />} />
      <Route path="/doctor/slot" element={<DoctorSlotPage />} />
    </Routes>
  );
};

export default App;
