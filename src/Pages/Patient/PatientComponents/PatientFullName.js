
import { H3, ErrorText } from 'govuk-react';
import $ from 'jquery';
import React, { useState, useEffect,useContext } from 'react';
import PatientContext from './PatientContext';


const PatientFullName = () => {

  // Add a new state variable for the doctor's full name
  const [PatientForename, setPatientForename] = useState('');
  
  const [error, setError] = useState(null);
  

  const { nhsNumber } = useContext(PatientContext);
  // Add a new useEffect hook to fetch the patient forename when the component is mounted or when the nhsnumber changes

  useEffect(() => {
    if (nhsNumber) {
      fetchPatientForename(nhsNumber);
    }
  }, [nhsNumber]);

  // Create a new function to fetch the patient forename
  const fetchPatientForename = (nhsNumber) => {
    $.ajax({
      url: 'http://localhost:8000/fetchDoctorName.php',
      method: 'GET',
      dataType: 'json',
      data: {
        'nhsNumber': nhsNumber,
      },
      success: (response) => {
        if (response.Forename) {
          setPatientForename(response.Forename);
          setError(null);
        } else {
          setError(response.message || 'Empty response from the server');
        }
      },
      error: (error) => {
        setError('Fetching patient name failed: ' + error.statusText);
      },
    });
  };

  return (
    <>
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <H3>Welcome, {PatientForename}</H3>
      )}
    </>
  );
};

export default PatientFullName;





