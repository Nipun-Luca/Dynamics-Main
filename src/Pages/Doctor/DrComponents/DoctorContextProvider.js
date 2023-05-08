
//****Author- w1785478 *****/
import React, { useState } from 'react';
import DoctorContext from './DoctorContext';

//The DoctorContextProvider component in this code snippet is a wrapper component that provides the DoctorContext to its child components
const DoctorContextProvider = ({ children }) => {
  const [DoctorId, setDoctorId] = useState(null);

  const logout = () => {
          setDoctorId(null);
        };

  return (
    <DoctorContext.Provider value={{ DoctorId, setDoctorId,logout }}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
