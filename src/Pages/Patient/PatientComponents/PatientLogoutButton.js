import React, { useContext } from 'react';
import { Button } from 'govuk-react';
import PatientContext from './PatientContext';
import { Link } from 'react-router-dom';

const PatientLogoutButton = () => {
  const { patientLogout } = useContext(PatientContext);


  const handlePatientLogout = () => {
          // Clear isAuthenticated condition
          localStorage.removeItem("isAuthenticated");
      
          // Call  logout method
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

