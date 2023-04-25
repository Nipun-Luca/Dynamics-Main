import React from 'react'
import { Button, Main,H1, BackLink} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';
import CancelAppointment from './CancelAppointment';

function PatientCancelAppointment() {
  return (
    <div>
    <PatientHeader/>
    < Main>
    <H1>Cancel appointment</H1>
   

    <div className="govuk-width-container">
      
    
      <div  className="govuk-grid-row">

      <CancelAppointment />
      <BackLink as={Link} to="/patientdashboard">
      Back
    </BackLink>
      </div>
      
    </div>
    </Main>
   
  <Footer/>
  </div>
  )
}

export default PatientCancelAppointment
// import React, { useState } from 'react';

// function UpdateMedicalRecords() {
//   const [patient, setPatient] = useState({ id: 1, name: 'John Doe', medicalRecord: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at quam velit.' });

//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     setPatient(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     // Update the patient's medical record in the database
//   };

//   return (
//     <div>
//       <h1>Update Patient Medical Record</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" name="name" value={patient.name} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label>
//           Medical Record:
//           <textarea name="medicalRecord" value={patient.medicalRecord} onChange={handleInputChange}></textarea>
//         </label>
//         <br />
//         <button type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateMedicalRecords;
