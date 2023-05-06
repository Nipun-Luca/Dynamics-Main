import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    return <Navigate to='/homepage' />;
  }

  return <Outlet />;
};

export default PrivateRoute;


// import React, { useContext } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import DoctorContext from '../Pages/Doctor/DrComponents/DoctorContext';

// const PrivateRoute = () => {
//   const { DoctorId } = useContext(DoctorContext);
 


//   if (!DoctorId) {
//     return <Navigate to='/homepage' />;
//   }

//   return <Outlet />;
// };

// export default PrivateRoute;
