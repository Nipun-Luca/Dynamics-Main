//----------------------
////Author: w1822557
//----------------------

import React, { useState } from 'react';
import ReceptionistContext from './ReceptionistContext';

const ReceptionistContextProvider = ({ children }) => {
  const [ReceptionistId, setReceptionistId] = useState(null);

  const logout = () => {
          setReceptionistId(null);
          // Clear any other stored data related to the authenticated doctor
          // For example, remove items from localStorage or cookies
        };


  return (
    <ReceptionistContext.Provider value={{ ReceptionistId, setReceptionistId,logout }}>
      {children}
    </ReceptionistContext.Provider>
  );
};

export default ReceptionistContextProvider;