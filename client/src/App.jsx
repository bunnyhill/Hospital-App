import './App.css';

import RolePage from './pages/RolePage';
import LoginPage from './pages/LoginPage';
import DoctorHomePage from './pages/DoctorHomePage';
import DoctorAppointmentPage from './pages/DoctorAppointmentPage';
import DoctorSlotPage from './pages/DoctorSlotPage';
import DoctorEditProfilePage from './pages/DoctorEditProfilePage';

import UserHomePage from './pages/UserHomePage';
import UserAppointmentPage from './pages/UserAppointmentPage';
import UserSlotPage from './pages/UserSlotPage';
import UserEditProfilePage from './pages/UserEditProfilePage';

import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/role" element={<RolePage />} />
      <Route path="/login/:role" element={<LoginPage />} />

      <Route element={<PrivateRoute role="doctor" />}>
        <Route path="/doctor/home" element={<DoctorHomePage />} />
        <Route
          path="/doctor/my-appointments"
          element={<DoctorAppointmentPage />}
        />
        <Route path="/doctor/add-slots" element={<DoctorSlotPage />} />
        <Route
          path="/doctor/edit-profile"
          element={<DoctorEditProfilePage />}
        />
      </Route>

      <Route element={<PrivateRoute role="user" />}>
        <Route path="/user/home" element={<UserHomePage />} />
        <Route path="/user/my-appointments" element={<UserAppointmentPage />} />
        <Route path="/user/available-slots" element={<UserSlotPage />} />
        <Route path="/user/edit-profile" element={<UserEditProfilePage />} />
      </Route>
    </Routes>
  );
};

export default App;
