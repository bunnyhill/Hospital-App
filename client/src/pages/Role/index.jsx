import './role.css';
import { useNavigate } from 'react-router-dom';

const Role = () => {
  const navigate = useNavigate();

  return (
    <div className="role-page">
      <div className="roles-container">
        <button
          onClick={() => {
            navigate(`/login/user`);
          }}
        >
          User
        </button>
        <button
          onClick={() => {
            navigate('/login/doctor');
          }}
        >
          Doctor
        </button>
        <button
          onClick={() => {
            navigate(`/login/admin`);
          }}
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default Role;
