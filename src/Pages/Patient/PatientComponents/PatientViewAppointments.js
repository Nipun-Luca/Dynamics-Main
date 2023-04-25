import React from 'react'
import { Button, Main,H1, BackLink} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';
import AppointmentsList from './AppointmentsList';

function PatientViewAppointments() {
  return (
   
    <div>
    <PatientHeader/>
    < Main>
    <H1>View Appointments</H1>
   

    <div className="govuk-width-container">
      
    
      <div  className="govuk-grid-row">


      <AppointmentsList patientId="1" />

      </div>
      <BackLink as={Link} to="/patientdashboard">
      Back
    </BackLink>
    </div>
    </Main>
   
  <Footer/>
  </div>

  )
}

export default PatientViewAppointments

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
