import React from 'react'
import { Button, Main,H1} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeaderDeregistration from './PatientHeaderDeregistration';
import Footer from '../../../Components/Footer';
import Deregistration from './Deregistration';
function PatientDeregister() {
  return (
    <div>

    <PatientHeaderDeregistration/>
    < Main>
    <H1>De-Register</H1>
    <H1></H1>

    <div className="govuk-width-container">
    <H1></H1>
      <Deregistration />
    
      <div  className="govuk-grid-row">

      </div>
      
    </div>
    </Main>
  <Footer/>
  </div>
  )
}

export default PatientDeregister