import React from 'react'
import { Button, Main,H1, BackLink} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';
import CancelAppointment from './CancelAppointment';

function PatientCancelAppointment() {
  return (
    <div>
    <PatientHeader/>
    < Main>
    <H1>Cancel appointment</H1>
    <BackLink as={Link} to="/patientdashboard">
      Back
    </BackLink>

    <div className="govuk-width-container">
      
    
      <div  className="govuk-grid-row">
      <H1></H1>
      <CancelAppointment />
   
      </div>
      
    </div>
    </Main>
   
  <Footer/>
  </div>
  )
}

export default PatientCancelAppointment
