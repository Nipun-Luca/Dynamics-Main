import React, { useState } from 'react';

function MedicalRecords() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', medicalRecord: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at quam velit.' },
    { id: 2, name: 'Jane Smith', medicalRecord: 'Ut pretium diam sit amet diam posuere, quis tincidunt magna commodo.' },
    { id: 3, name: 'Bob Johnson', medicalRecord: 'Maecenas vel enim at velit dignissim lacinia. In hac habitasse platea dictumst.' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    const results = patients.filter(patient =>
      patient.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <h1>View Patient Medical Records</h1>
      <input type="text" placeholder="Search by patient name" value={searchTerm} onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Medical Record</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.length > 0 ? (
            searchResults.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.medicalRecord}</td>
              </tr>
            ))
          ) : (
            patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.medicalRecord}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MedicalRecords;
