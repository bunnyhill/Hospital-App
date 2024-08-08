import { jwtDecode } from 'jwt-decode';

export const checkToken = role => {
  const token = localStorage.getItem('token');
  try {
    const decoded = jwtDecode(token);
    const timeInS = Date.now() / 1000;
    return decoded && role == decoded.role && decoded.exp > timeInS;
  } catch (err) {
    return false;
  }
};
