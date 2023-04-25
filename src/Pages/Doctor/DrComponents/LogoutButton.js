import React, { useContext } from 'react';
import { Button } from 'govuk-react';
import DoctorContext from './DoctorContext';
import { Link } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useContext(DoctorContext);


  const handleLogout = () => {
          // Clear isAuthenticated flag in localStorage
          localStorage.removeItem("isAuthenticated");
      
          // Call the original logout function if you need to do anything else
          if (typeof logout === "function") {
            logout();
          }
        };
      
   
  return (
    <Link to="/staffLogIn">      
          <Button onClick={handleLogout}>
          Logout
          </Button>
    </Link> 
  );
};

export default LogoutButton;

