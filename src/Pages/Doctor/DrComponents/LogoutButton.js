
/****Author- w1785478 *****/
import React, { useContext } from 'react';
import { Button } from 'govuk-react';
import DoctorContext from './DoctorContext';
import { Link } from 'react-router-dom';

//The LogoutButton component is a functional React component that displays a logout button for the doctor's dashboard. It imports the necessary dependencies and uses the DoctorContext to access the doctor's information.

const LogoutButton = () => {
  const { logout } = useContext(DoctorContext);


  const handleLogout = () => {
          // Clear isAuthenticated flag in localStorage
          localStorage.removeItem("isAuthenticated");
      
          // Call the original logout function if the doctor need to do anything else
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

