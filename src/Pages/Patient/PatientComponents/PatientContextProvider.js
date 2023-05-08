import React, { useState } from 'react';
import PatientContext from './PatientContext';

const PatientContextProvider = ({ children }) => {
  const [NHSNumber, setNHSNumber] = useState(null);

  const patientLogout = () => {
    setNHSNumber(null);
    // Clear any stored data 
   
  };

  return (
    <PatientContext.Provider value={{ NHSNumber, setNHSNumber, patientLogout }}>
      {children}
    </PatientContext.Provider>
  );
  
}; 

export default PatientContextProvider;
