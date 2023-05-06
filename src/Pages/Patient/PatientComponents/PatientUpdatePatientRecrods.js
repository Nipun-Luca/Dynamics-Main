import React from 'react'
import { Button, Main,H1 ,H2, BackLink} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';
import UpdatePatientRecords from './UpdatePatientRecords';

function PatientUpdatePatientRecrods() {
  return (
    <div><div>  <PatientHeader/>
    < Main>
    <H1>Update Patient Records</H1>
    <BackLink as={Link} to="/patientdashboard/patient-view-patient-record">
      Back
    </BackLink>
    <H1></H1>
                <H2></H2>
    <div className="govuk-width-container">
      
    <UpdatePatientRecords />
      <div  className="govuk-grid-row">

      

      </div>
      
    </div>
    </Main>
   
  <Footer/></div></div>
  )
}

export default PatientUpdatePatientRecrods