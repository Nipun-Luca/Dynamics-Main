//****Aunthor- w1785478 *****/

import React, { useState } from 'react';

import {  Main,H1, BackLink} from 'govuk-react';

import DoctorFullName from './DoctorFullName';

import { Link } from 'react-router-dom';

import Header from './DrHeader';

import UpdateMedicalRecordComponent from './UpdateMedicalRecordComponents';

import Footer from '../../../Components/Footer';

//The UpdateMedicalRecords function is a React functional component that renders the "Update Patient Medical Record" page within a doctor dashboard.

function UpdateMedicalRecords() {
  return (
    <div>
        <Header/>
        < Main>
        <BackLink as={Link} to="/doctor-dashboard/medical-records">
          Back
        </BackLink>

        <H1>Update Patient Medical Record</H1>
        
        <DoctorFullName/>

        <div  className="govuk-grid-row">
          <UpdateMedicalRecordComponent/>
          
      </div>
      
        </Main>
      <Footer/>
    </div>

  );
}
export default UpdateMedicalRecords;
