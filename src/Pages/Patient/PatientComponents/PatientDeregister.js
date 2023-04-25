import React from 'react'
import { Button, Main,H1} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';

function PatientDeregister() {
  return (
    <div>

    <PatientHeader/>
    < Main>
    <H1>De-Register</H1>
   

    <div className="govuk-width-container">
      
    
      <div  className="govuk-grid-row">

      </div>
      
    </div>
    </Main>
  <Footer/>
  </div>
  )
}

export default PatientDeregister