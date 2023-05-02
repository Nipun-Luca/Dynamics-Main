import React, { useState } from 'react';

import { Button, Main,H1, BackLink} from 'govuk-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DoctorFullName from './DoctorFullName';

import { Link } from 'react-router-dom';

import Header from './DrHeader';
import DrAppointmentTable from './DrAppointmentTable';

import Footer from '../../../Components/Footer';
//import Footer from './../Doctor/DrComponents/DrFooter';

//import Logout from "./Pages/Doctor/components/Logout";




function MedicalRecords() {
  
  return (
    <div>
        <Header/>
        < Main>
    
        <BackLink as={Link} to="/doctor-dashboard">
          Back
        </BackLink>
        
       
        
        <H1>View Patient Medical Record</H1>

        <DoctorFullName/>

        <div  className="govuk-grid-row">


          <DrAppointmentTable/>

      </div>
      
        </Main>
      <Footer/>
    </div>

  );
}

export default MedicalRecords;
