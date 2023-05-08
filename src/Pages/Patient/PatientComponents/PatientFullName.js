import { H3, ErrorText } from 'govuk-react';
import $ from 'jquery';
import React, { useState, useEffect, useContext } from 'react';
import PatientContext from './PatientContext';
// This code is implemented toghether with Khandakar
const PatientFullName = () => {
  // state variable for patient's name
  const [patientFullName, setPatientFullName] = useState('');

  const [error, setError] = useState(null);

  const { NHSNumber } = useContext(PatientContext);


  useEffect(() => {
    if (NHSNumber) {
      fetchPatientFullName(NHSNumber);
    }
  }, [NHSNumber]);

  // Ajax query to obtain patient name
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
