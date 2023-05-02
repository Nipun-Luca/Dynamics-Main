import React from 'react';
import { Button, Main,H1} from 'govuk-react';
import { Link, useLocation } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';

function PatientDashboard() {
  //PATIENT NHS NUMBER
  const location = useLocation();
  const nhsNumber = location.state?.nhsNumber;


  return (
 
      <div>
        <PatientHeader/>
        < Main>
        <H1>Patient Dashboard</H1>
       

        <div className="govuk-width-container">
          
        
          <div  className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
              <Button as={Link} to='patient-view-appointment'>View Appointment </Button>
            </div>
            <div className="govuk-grid-column-one-third">
              <Button as={Link} to='patient-book-appointment'>Book Appointment</Button>
            </div>
           
            <div className="govuk-grid-column-one-third">
              <Button as={Link} to='patient-cancel-appointment'>Cancel Appointment</Button>
            </div>
            <div className="govuk-grid-column-one-third">
              <Button as={Link} to='patient-view-patient-record'>View Patient Records</Button>
            </div>
            <div className="govuk-grid-column-one-third">
              <Button as={Link} to='patient-deregister'>Patient deregister</Button>
            </div>
          </div>
          
          {/* <Routes>
            <Route path='/'  element={<Home/>} />
            <Route path='/appointments' element={<Appointments/>} />
            <Route path='/medical-records' element={<MedicalRecords/>} />
            <Route path='/update-medical-records' element={<UpdateMedicalRecords/>} />
            <Route path='/logout' element={<Logout/>} />
          </Routes> */}
        </div>
        </Main>
      <Footer/>
      </div>
    
  );
}

export default PatientDashboard;