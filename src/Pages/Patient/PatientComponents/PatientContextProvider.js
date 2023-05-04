import React, { useState } from 'react';
import PatientContext from './PatientContext';

const PatientContextProvider = ({ children }) => {
  const [NHSNumber, setNHSNumber] = useState(null);

  const patientLogout = () => {
    setNHSNumber(null);
    // Clear any other stored data related to the authenticated Patient
    // For example, remove items from localStorage or cookies
  };

  return (
    <PatientContext.Provider value={{ NHSNumber, setNHSNumber, patientLogout }}>
      {children}
    </PatientContext.Provider>
  );
  
}; // Add the missing closing brace here

export default PatientContextProvider;
