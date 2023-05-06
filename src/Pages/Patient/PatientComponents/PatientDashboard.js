
import React, { useEffect } from 'react';
import { Button, Main,H1,H2} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';
//import PatientContext from '.././PatientComponents/PatientContext.js';
import PatientFullName from './PatientFullName'; // Add this import statement



function PatientDashboard() {
  //PATIENT NHS NUMBER
  //pass: hellohello
  //email: adriaRos@gmail.com
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);


  return (
 
      <div>
        <PatientHeader/>
        < Main>
        <H1>Patient Dashboard</H1>
       <PatientFullName/>
       <H1></H1>
              <H2></H2>
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
              <H1></H1>
              <H2></H2>
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