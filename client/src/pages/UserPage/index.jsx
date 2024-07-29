import { useParams } from 'react-router-dom';
import './userpage.css';

const UserPage = () => {
  const { token } = useParams();
  return (
    <div className="user-page">
      <p>{token}</p>
    </div>
  );
};

export default UserPage;
