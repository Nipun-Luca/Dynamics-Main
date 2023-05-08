
/****Author- w1785478 *****/
import React, { useState } from 'react';

import { Main,H1, BackLink} from 'govuk-react';

import DoctorFullName from './DoctorFullName';

import { Link } from 'react-router-dom';

import Header from './DrHeader';

import ViewMedicalRecords from './ViewMedicalRecords';

import Footer from '../../../Components/Footer';



//The MedicalRecords component is a functional React component that displays a page for viewing patient medical records. It includes a Header, DoctorFullName, ViewMedicalRecords, and Footer components, as well as a back link to the doctor dashboard appointments page.

function MedicalRecords() {
  
  return (
    <div>
        <Header/>
        < Main>
        <BackLink as={Link} to="/doctor-dashboard/appointments">
          Back
        </BackLink>

        <H1>View Patient Medical Record</H1>
        
        <DoctorFullName/>

        <div  className="govuk-grid-row">
          <ViewMedicalRecords/>
          
      </div>
      
        </Main>
      <Footer/>
    </div>

  );
}

export default MedicalRecords;