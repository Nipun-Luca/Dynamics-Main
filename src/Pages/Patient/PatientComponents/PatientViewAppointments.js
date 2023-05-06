import React from 'react'
import { Button, Main,H1,H2,H3, BackLink} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';
import AppointmentsList from './AppointmentsList';

function PatientViewAppointments() {
  return (
   
    <div>
    <PatientHeader/>
    < Main>
    <H1>View Appointments</H1>
    <BackLink as={Link} to="/patientdashboard">
      Back
    </BackLink>
    <H1></H1>
                <H2></H2>

    <div className="govuk-width-container">
      
    
      <div  className="govuk-grid-row">


      <AppointmentsList patientId="1" />

      </div>
      <H1></H1>
      <H2></H2>
      <H3></H3>
    </div>
    </Main>
   
  <Footer/>
  </div>

  )
}

export default PatientViewAppointments
