import React,{ useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext';

export function Logout() {
    const { logout } = useAuth();
    let navigate =useNavigate();
    
    useEffect(() => {
        const handleLogout = async () => {
          window.localStorage.clear();
          await logout();
          navigate('..');
        };
    
        // Call the handleLogout function when the component mounts
        handleLogout();
      }, [logout, navigate]);
    
      // You can render a loading spinner or a message here if needed
      return <p>Logging out...</p>;
   
}
