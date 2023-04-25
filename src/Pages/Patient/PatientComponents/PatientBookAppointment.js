
import { Button, Main,H1, BackLink, Select, Radio } from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';
import AppointmentBooking from './AppointmentBooking';
import React, { useState } from 'react';



function PatientBookAppointment() {
  return (
    
    <div>

    <PatientHeader/>
    < Main>
    <H1>Book Appointment</H1>
   

    <div className="govuk-width-container">
      
    
      <div  className="govuk-grid-row">
    
      <AppointmentBooking />
      <BackLink as={Link} to="/patientdashboard">
      Back
    </BackLink>
      </div>
      
    </div>
    </Main>

    

  <Footer/></div>
    
  )
}

export default PatientBookAppointment