import React from 'react'
import { Button, Main, H1,H2,H3,  BackLink} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';
import PatientUpdatePatientRecrods from './PatientUpdatePatientRecrods';
import ViewPatientRecords from './ViewPatientRecords';
//Patient view patient records page
function PatientViewPatientRecord() {
  return (
    <div>  <PatientHeader/>
    < Main>
    <H1>View Patient Records</H1>
    <BackLink as={Link} to="/patientdashboard">
      Back
    </BackLink>
    <H1></H1>
                <H2></H2>
    <div className="govuk-width-container">
      
    
      <div  className="govuk-grid-row">

      <ViewPatientRecords />
      <Button as={Link} to='/patientdashboard/patient-update-patient-recrods'>Update Patient Records</Button>
      <H1></H1>
      <H2></H2>
      <H3></H3>
      </div>
      <div className="govuk-grid-column-one-third">
  
             
            </div>
    </div>
    </Main>
   
  <Footer/></div>
  )
}

export default PatientViewPatientRecord
