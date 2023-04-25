import React, { useState } from 'react';
import DoctorContext from './DoctorContext';

const DoctorContextProvider = ({ children }) => {
  const [DoctorId, setDoctorId] = useState(null);

  const logout = () => {
          setDoctorId(null);
          // Clear any other stored data related to the authenticated doctor
          // For example, remove items from localStorage or cookies
        };


  return (
    <DoctorContext.Provider value={{ DoctorId, setDoctorId,logout }}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
