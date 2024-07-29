import './login.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const { role } = useParams();

  const navigate = useNavigate();

  const [userToken, setUserToken] = useState('');

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const onchange = (e, key) => {
    setLoginDetails({ ...loginDetails, [key]: e.target.value });
  };

  console.log(loginDetails);

  const onBtnLogin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/${role}/login`,
        loginDetails
      );
      setUserToken(response.data.token);
      navigate(`/${role}/${response.data.token}`);
    } catch (e) {
      console.log('wrong email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="username-container">
          <label>Username</label>
          <input
            onChange={e => {
              onchange(e, 'email');
            }}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="password-container">
          <label>Password</label>
          <input
            onChange={e => {
              onchange(e, 'password');
            }}
            type="password"
            placeholder="Password"
          />
        </div>
        <button onClick={onBtnLogin}>Login</button>
      </div>
    </div>
  );
};
export default Login;
