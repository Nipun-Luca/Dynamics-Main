import React, { useState } from 'react';

function UpdateMedicalRecords() {
  const [patient, setPatient] = useState({ id: 1, name: 'John Doe', medicalRecord: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at quam velit.' });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPatient(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Update the patient's medical record in the database
  };

  return (
    <div>
      <h1>Update Patient Medical Record</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={patient.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Medical Record:
          <textarea name="medicalRecord" value={patient.medicalRecord} onChange={handleInputChange}></textarea>
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default UpdateMedicalRecords;
