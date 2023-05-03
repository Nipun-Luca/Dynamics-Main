import React, { useState } from 'react';
import PatientContext from './PatientContext';


const PatientContextProvider = ({ children }) => {
  const [nhsNumber, setNhsNumber] = useState(null);

  const patientLogout = () => {
          setNhsNumber(null);
          // Clear any other stored data related to the authenticated doctor
          // For example, remove items from localStorage or cookies
        };


  return (
    <PatientContext.Provider value={{ nhsNumber, setNhsNumber,patientLogout }}>
      {children}
    </PatientContext.Provider>
  );
};

export default DoctorContextProvider;
