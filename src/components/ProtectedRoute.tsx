import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute: React.FC = () => {
    const context = useContext(UserContext);
    const isLoggedIn = Boolean(context?.userUUID);
  
    if (!isLoggedIn) {
      return <Navigate to="/entry" />;
    }
  
    return <Outlet />;
  };
  
export default ProtectedRoute;