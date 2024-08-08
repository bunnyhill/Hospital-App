import './usersidebar.css';
import instance from '../../utils/axiosConfig';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSidebar = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({});

  const fetchDetails = async () => {
    try {
      const id = localStorage.getItem('id');
      if (id) {
        const response = await instance.get(`/user/${id}`);
        setDetails(response.data);
      } else {
        console.log('id not found in localstorage');
      }
    } catch (err) {}
  };

  const onBtnlogOut = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    navigate(`/login/user`);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="user-sidebar">
      <br />
      <div className="img-div">img</div>
      <br />
      <h2 style={{ textAlign: 'center' }}>
        {details.firstName + ' ' + details.lastName}
      </h2>
      <br />
      <p
        onClick={() => {
          navigate('/user/home');
        }}
      >
        Home
      </p>
      <p
        onClick={() => {
          navigate('/user/my-appointments');
        }}
      >
        My Appointments
      </p>
      <p
        onClick={() => {
          navigate(`/user/available-slots`);
        }}
      >
        Available Slots
      </p>
      <p
        onClick={() => {
          navigate('/user/edit-profile');
        }}
      >
        Edit Profile
      </p>
      <p onClick={onBtnlogOut}>Log Out</p>
    </div>
  );
};

export default UserSidebar;
