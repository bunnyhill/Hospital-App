import { checkToken } from '../../utils/localFunctions';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = props => {
  return checkToken(props.role) ? (
    <Outlet />
  ) : (
    <Navigate to={`/login/${props.role}`} />
  );
};

export default PrivateRoute;
