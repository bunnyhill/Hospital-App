import { useParams } from 'react-router-dom';
import './doctorpage.css';

const DoctorPage = () => {
  const { token } = useParams();
  return (
    <div className="doctor-page">
      <p>{token}</p>
    </div>
  );
};

export default DoctorPage;
