//****Author w1785478***
import React, { useEffect } from 'react';
import { Button, Main,H1} from 'govuk-react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Header from './DrComponents/DrHeader';
import DoctorFullName from './DrComponents/DoctorFullName';
//import LogoutButton from './DrComponents/LogoutButton';
import Footer from '../../Components/Footer';
//import Footer from './../Doctor/DrComponents/DrFooter';
// import Home from './DrComponents/Home';

// import Logout from './DrComponents/Logout';
// import Appointments from './DrComponents/Appointments';
// import MedicalRecords from './DrComponents/MedicalRecords';
// import UpdateMedicalRecords from "./DrComponents/UpdateMedicalRecords";

function DoctorDashboard() {

  ////Author: w1820984 <
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);
  ////Author: w1820984 >

  return (
      <div>
        <Header/>
        < Main>
        {/* <LogoutButton /> */}

        <H1>Doctor Dashboard</H1>
        
        <DoctorFullName/>

        <div className="govuk-width-container">
          
        
          <div  className="govuk-grid-row">
            <div className="govuk-grid-column-one-third">
              <Button as={Link} to='appointments'>View Appointments</Button>
            </div>
            <div className="govuk-grid-column-one-third">
              <Button as={Link} to='medical-records'>View Medical Records </Button>
            </div>
            <div className="govuk-grid-column-one-third">
              <Button as={Link} to='medical-records'>Update Medical Records</Button>
            </div>
          </div>
          <Outlet />
          
        </div>
        </Main>
      <Footer/>
      </div>
    
  );
}

export default DoctorDashboard;
