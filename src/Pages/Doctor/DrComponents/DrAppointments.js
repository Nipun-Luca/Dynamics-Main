

//****Author- w1785478 *****/
import React, { useState } from 'react';

import { Main,H1, BackLink} from 'govuk-react';

import DoctorFullName from './DoctorFullName';

import { Link } from 'react-router-dom';

import Header from './DrHeader';
import DrAppointmentTable from './DrAppointmentTable';

import Footer from '../../../Components/Footer';



//The DrAppointments component is a React functional component that displays the upcoming appointments for a doctor
function DrAppointments() {
  
  return (
    <div>
        <Header/>
        < Main>
    
        <BackLink as={Link} to="/doctor-dashboard">
          Back
        </BackLink>
        
       
        
        <H1>Upcoming Appointments</H1>

        <DoctorFullName/>

        <div  className="govuk-grid-row">


          <DrAppointmentTable/>

      </div>
      
        </Main>
      <Footer/>
    </div>

  );
}

export default DrAppointments;
