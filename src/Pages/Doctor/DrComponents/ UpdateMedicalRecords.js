import React, { useState } from 'react';

import { Button, Main,H1, BackLink} from 'govuk-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DoctorFullName from './DoctorFullName';

import { Link } from 'react-router-dom';

import Header from './DrHeader';

import ViewMedicalRecords from './ViewMedicalRecords';
import Footer from '../../../Components/Footer';
//import Footer from './../Doctor/DrComponents/DrFooter';

//import Logout from "./Pages/Doctor/components/Logout";

function UpdateMedicalRecords() {
  return (
    <div>
        <Header/>
        < Main>
        <BackLink as={Link} to="/doctor-dashboard/medical-records">
          Back
        </BackLink>

        <H1>Update Patient Medical Record</H1>
        
        <DoctorFullName/>

        <div  className="govuk-grid-row">
          <ViewMedicalRecords/>
          
      </div>
      
        </Main>
      <Footer/>
    </div>

  );
}
export default UpdateMedicalRecords;
