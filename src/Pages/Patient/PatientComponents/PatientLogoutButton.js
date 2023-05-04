import React, { useContext } from 'react';
import { Button } from 'govuk-react';
import PatientContext from './PatientContext';
import { Link } from 'react-router-dom';

const PatientLogoutButton = () => {
  const { patientLogout } = useContext(PatientContext);


  const handlePatientLogout = () => {
          // Clear isAuthenticated flag in localStorage
          localStorage.removeItem("isAuthenticated");
      
          // Call the original logout function if you need to do anything else
          if (typeof patientLogout === "function") {
            patientLogout();
          }
        };
      
   
  return (
    <Link to="/homepage">      
          <Button onClick={handlePatientLogout}>
          Logout
          </Button>
    </Link> 
  );
};

export default PatientLogoutButton;

