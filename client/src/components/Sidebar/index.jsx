import './sidebar.css';
import instance from '../../utils/axiosConfig';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = props => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({});

  const fetchDetails = async () => {
    try {
      const id = localStorage.getItem('id');
      if (id) {
        const response = await instance.get(`/${props.role}/${id}`);
        setDetails(response.data);
      } else {
        console.log('id not found in localstorage');
      }
    } catch (err) {}
  };

  const onBtnlogOut = () => {
    localStorage.removeItem('id');
    navigate(`/login/${props.role}`);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="sidebar">
      <br />
      <div className="img-div">pfp</div>
      <br />
      <h2 style={{ textAlign: 'center' }}>
        {details.firstName + ' ' + details.lastName}
      </h2>
      <br />
      <p>Home</p>
      <p>My Appointments</p>
      <p
        onClick={() => {
          navigate(`/${props.role}/slot`);
        }}
      >
        Add Slots
      </p>
      <p>Edit Profile</p>
      <p onClick={onBtnlogOut}>Log Out</p>
    </div>
  );
};

export default Sidebar;
