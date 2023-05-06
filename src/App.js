
import './App.css';

//import React from 'react';
import React, { useState, createContext, useEffect, Navigate } from 'react';

import { BrowserRouter, Route, Routes, Outlet  } from 'react-router-dom';
import PatientContext from './Pages/Patient/PatientComponents/PatientContext';
import PrivateRoute from './Components/PrivateRoute';

//import Appointments from './Pages/Doctor/DrComponents/Appointments';
//import Home from './DrComponents/Home';

//Startup page
import StartUp from './Pages/StartUp/StartUp';

//Footer pages
import TermsOfUse from './Pages/StartUp/TermsOfUse';
import ContactUs from './Pages/StartUp/ContactUs';

//Homepage
import Homepage from './Pages/Homepage';

//Registration
import RegisterNHSNumber from './Pages/Registration/Register-NHSnumber';
import RegisterPersonalDetails from './Pages/Registration/Register-PersonalDetails';
import RegisterEmail from './Pages/Registration/Register-Email';
import RegisterCreatePassword from './Pages/Registration/Register-CreatePassword';

//Login
import PatientLogInPage from './Pages/Login/PatientLogIn';
import StaffLogIn from './Pages/Login/StaffLogIn';
import PatientPassword from './Pages/Login/PatientPassword';
import StaffPassword from './Pages/Login/StaffPassword';
import LoginDenied from './Pages/Login/LoginDenied';

//Patient
import PatientDashboard from './Pages/Patient/PatientComponents/PatientDashboard';
// import PatientLogout from './Pages/Patient/PatientComponents/PatientLogout';
import PatientViewAppointments from './Pages/Patient/PatientComponents/PatientViewAppointments';
import PatientBookAppointment from './Pages/Patient/PatientComponents/PatientBookAppointment';
import PatientCancelAppointment from './Pages/Patient/PatientComponents/PatientCancelAppointment';
import PatientViewPatientRecord from './Pages/Patient/PatientComponents/PatientViewPatientRecord';
import PatientDeregister from './Pages/Patient/PatientComponents/PatientDeregister';
import PatientUpdatePatientRecrods from './Pages/Patient/PatientComponents/PatientUpdatePatientRecrods';
//Doctor
import DoctorDashboard from  './Pages/Doctor/DoctorDashboard';
//import LogoutButton from './Pages/Doctor/DrComponents/ LogoutButton';
import DrAppointments from './Pages/Doctor/DrComponents/DrAppointments';
import MedicalRecords from './Pages/Doctor/DrComponents/MedicalRecords';
import UpdateMedicalRecords  from "./Pages/Doctor/DrComponents/ UpdateMedicalRecords";

//Receptionist
import ReceptionistDashboard from './Pages/Receptionist/ReceptionistDashboard';
import ViewDoctorList from './Pages/Receptionist/ViewDoctorList';
import CancelAppointment from './Pages/Receptionist/CancelAppointment';
import ReceptionistLogout from './Pages/Receptionist/ReceptionistLogout';

export const EmailContext = createContext(null);





function App() {
  
  const [NHSNumber, setNHSNumber] = useState('');

  return (

<div className='main'>
    <PatientContext.Provider value={{ NHSNumber, setNHSNumber }}>
    <Routes>
      {/* Your routes */}
      <Route path="/" element={<StartUp />} />
      <Route path="/termsOFUse" element={<TermsOfUse />} />
      <Route path="/contactUs" element={<ContactUs />} />

      <Route path="/homepage" element={<Homepage />} />

     
      <Route path="/doctor-dashboard" element={<PrivateRoute Component={DoctorDashboard} />}>
      <Route index element={<DoctorDashboard />} />
      <Route path="appointments" element={<DrAppointments />} />
      <Route path="medical-records" element={<MedicalRecords />} />
      {/* <Route path="view-medical-records/:nhsNumber" element={<MedicalRecords />} /> */}
      <Route path="update-medical-records" element={<UpdateMedicalRecords />} />
</Route>



      <Route path="/registerNHSnumber" element={<RegisterNHSNumber />} />
      <Route path="/registerPersonalDetails" element={<RegisterPersonalDetails />} />
      <Route path="/registerEmail" element={<RegisterEmail />} />
      <Route path="/registerCreatePassword" element={<RegisterCreatePassword />} />

      <Route path="/patientLogin" element={<PatientLogInPage />} />
      <Route path="/staffLogin" element={<StaffLogIn />} />
      <Route path="/patientPassword" element={<PatientPassword />} />
      <Route path="/staffPassword" element={<StaffPassword />} />
      <Route path="/loginDenied" element={<LoginDenied />} />


      <Route path="/patientdashboard" element={<PrivateRoute Component={PatientDashboard} />}>
  <Route index element={<PatientDashboard />} />
  <Route path="patient-view-appointment" element={<PatientViewAppointments />} />
  <Route path="patient-book-appointment" element={<PatientBookAppointment />} />
  <Route path="patient-cancel-appointment" element={<PatientCancelAppointment />} />
  <Route path="patient-view-patient-record" element={<PatientViewPatientRecord />} />
  <Route path='patient-update-patient-recrods' element={<PatientUpdatePatientRecrods />} />
  <Route path="patient-deregister" element={<PatientDeregister />} />
  {/* <Route path="patient-logout" element={<PatientLogout />} /> */}
      </Route>

      <Route path="/receptionistdashboard" element={<PrivateRoute Component={ReceptionistDashboard} />} >
        <Route index element={<ReceptionistDashboard />} />
        <Route path="view-doctor-list" element={<ViewDoctorList />} />
          <Route path="receptionist-cancel-appointment" element={<CancelAppointment />} />
        
        <Route path="receptionist-logout" element={<ReceptionistLogout />} />
      </Route>


    </Routes>
    </PatientContext.Provider>
    </div>

  );

}

export default App;


