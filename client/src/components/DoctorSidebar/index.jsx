import './doctorsidebar.css';
import instance from '../../utils/axiosConfig';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const DoctorSidebar = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({});

  const fetchDetails = async () => {
    try {
      const id = localStorage.getItem('id');
      if (id) {
        const response = await instance.get(`/doctor/${id}`);
        setDetails(response.data);
      } else {
        console.log('id not found in localstorage');
      }
    } catch (err) {}
  };

  const onBtnlogOut = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    navigate(`/login/doctor`);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const onBtnDownloadPdf = async () => {
    const id = '668fa692508e4d49da85130a';
    const response = await instance.get(`/department/pdf/${id}`);
    html2pdf().from(response.data).save();
  };

  return (
    <div className="doctor-sidebar">
      <br />
      <div className="img-div">img</div>
      <br />
      <h2 style={{ textAlign: 'center' }}>
        {details.firstName + ' ' + details.lastName}
      </h2>
      <br />
      <p
        onClick={() => {
          navigate('/doctor/home');
        }}
      >
        Home
      </p>
      <p
        onClick={() => {
          navigate('/doctor/my-appointments');
        }}
      >
        My Appointments
      </p>
      <p
        onClick={() => {
          navigate(`/doctor/add-slots`);
        }}
      >
        Add Slots
      </p>
      <p
        onClick={() => {
          navigate('/doctor/edit-profile');
        }}
      >
        Edit Profile
      </p>
      <p onClick={onBtnlogOut}>Log Out</p>
      <button onClick={onBtnDownloadPdf}>Download PDF</button>
    </div>
  );
};

export default DoctorSidebar;
