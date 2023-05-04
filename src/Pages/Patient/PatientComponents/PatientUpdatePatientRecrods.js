import React from 'react'
import { Button, Main,H1, BackLink} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';
import UpdatePatientRecords from './UpdatePatientRecords';

function PatientUpdatePatientRecrods() {
  return (
    <div><div>  <PatientHeader/>
    < Main>
    <H1>Update Patient Records</H1>
   

    <div className="govuk-width-container">
      
    <UpdatePatientRecords />
      <div  className="govuk-grid-row">

      
      <BackLink as={Link} to="/patient-view-patient-record">
      Back
    </BackLink>
      </div>
      
    </div>
    </Main>
   
  <Footer/></div></div>
  )
}

export default PatientUpdatePatientRecrods