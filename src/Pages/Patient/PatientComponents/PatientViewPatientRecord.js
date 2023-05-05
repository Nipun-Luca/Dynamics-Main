import React from 'react'
import { Button, Main,H1, BackLink} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';
import PatientUpdatePatientRecrods from './PatientUpdatePatientRecrods';
import ViewPatientRecords from './ViewPatientRecords';

function PatientViewPatientRecord() {
  return (
    <div>  <PatientHeader/>
    < Main>
    <H1>View Patient Records</H1>
    <BackLink as={Link} to="/patientdashboard">
      Back
    </BackLink>

    <div className="govuk-width-container">
      
    
      <div  className="govuk-grid-row">

      <ViewPatientRecords />
      <Button as={Link} to='/patientdashboard/patient-update-patient-recrods'>Update Patient Records</Button>
    
      </div>
      <div className="govuk-grid-column-one-third">
  
             
            </div>
    </div>
    </Main>
   
  <Footer/></div>
  )
}

export default PatientViewPatientRecord
