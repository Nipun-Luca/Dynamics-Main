import { H3, ErrorText } from 'govuk-react';
import $ from 'jquery';
import React, { useState, useEffect, useContext } from 'react';
import PatientContext from './PatientContext';

const PatientFullName = () => {
  // Add a new state variable for the patient's full name
  const [patientFullName, setPatientFullName] = useState('');

  const [error, setError] = useState(null);

  const { NHSNumber } = useContext(PatientContext);
  // Add a new useEffect hook to fetch the patient forename when the component is mounted or when the nhsnumber changes

  useEffect(() => {
    if (NHSNumber) {
      fetchPatientFullName(NHSNumber);
    }
  }, [NHSNumber]);

  // Create a new function to fetch the patient forename
  const fetchPatientFullName = (NHSNumber) => {
    $.ajax({
      url: 'http://localhost:8000/PatientName.php',
      method: 'GET',
      dataType: 'json',
      data: {
        'NHSNumber': NHSNumber,
      },
      success: (response) => {
        if (response.Forename) {
          setPatientFullName(response.Forename);
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
        <H3>Welcome, {patientFullName}</H3>
      )}
    </>
  );
};

export default PatientFullName;
