
//****Author- w1785478 *****/
import { H3, ErrorText } from 'govuk-react';
import $ from 'jquery';
import React, { useState, useEffect,useContext } from 'react';
import DoctorContext from './DoctorContext';

//The DoctorFullName component is a React functional component that fetches and displays the full name of a doctor using their DoctorId
const DoctorFullName = () => {

  // Add a new state variable for the doctor's full name
  const [doctorFullName, setDoctorFullName] = useState('');
  
  const [error, setError] = useState(null);
  
  
  const { DoctorId } = useContext(DoctorContext);
  
  // Add a new useEffect hook to fetch the doctor's full name when the component is mounted or when the DoctorId changes
  useEffect(() => {
    if (DoctorId) {
      fetchDoctorName(DoctorId);
    }
  }, [DoctorId]);

  // Create a new function to fetch the doctor's full name
  const fetchDoctorName = (DoctorId) => {
    $.ajax({
      url: 'http://localhost:8000/fetchDoctorName.php',
      method: 'GET',
      dataType: 'json',
      data: {
        'DoctorId': DoctorId,
      },
      success: (response) => {
        if (response.fullName) {
          setDoctorFullName(response.fullName);
          setError(null);
        } else {
          setError(response.message || 'Empty response from the server');
        }
      },
      error: (error) => {
        setError('Fetching doctor name failed: ' + error.statusText);
      },
    });
  };

  return (
    <>
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <H3>Welcome, Dr. {doctorFullName}</H3>
      )}
    </>
  );
};

export default DoctorFullName;





