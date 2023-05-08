
import { Button, Main,H1, BackLink, Select, Radio } from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';
import AppointmentBooking from './AppointmentBooking';
import React, { useState } from 'react';

//Book appointment page

function PatientBookAppointment() {
  return (
    
    <div>

    <PatientHeader/>
    < Main>
    <H1>Book Appointment</H1>
    <BackLink as={Link} to="/patientdashboard">
      Back
    </BackLink>

    <div className="govuk-width-container">
      
    
      <div  className="govuk-grid-row">
    <H1></H1>
      <AppointmentBooking />

      </div>
      
    </div>
    </Main>

    

  <Footer/></div>
    
  )
}

export default PatientBookAppointment