import React, { useState, useContext,useEffect } from 'react';
import { Table, ErrorText, H3 } from 'govuk-react';
import $ from 'jquery';
import PatientContext from './PatientContext';
const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const { NHSNumber } = useContext(PatientContext); // Use the useContext hook to get the NHSNumber
  console.log(NHSNumber);

  useEffect(() => {
    fetchAppointments(NHSNumber);
  }, [NHSNumber]);

  const fetchAppointments = (NHSNumber) => {
    $.ajax({
      url: 'http://localhost:8000/get_appointments.php',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json', // Add this line
      data: JSON.stringify({ // Convert the data object to a JSON string
        'NHSNumber': NHSNumber,
      }),
      success: (response) => {
        try {
          if (response.appointments) {
            setAppointments(response.appointments);
            setError(null);
          } else {
            setError(response.message || 'Empty response from the server');
          }
        } catch (error) {
          setError('No booked appointments ');
        }
      },
      error: (error) => {
        setError('Fetching appointments failed: ' + error.statusText);
      },
    });
  };
  

  return (
    <>
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : appointments.length ? (
        <Table caption="Your coming appointments">
          <Table.Row>
            <Table.CellHeader>Date</Table.CellHeader>
            <Table.CellHeader>Time</Table.CellHeader>
          </Table.Row>
          {appointments.map((appointment, index) => (
            <Table.Row key={index}>
              <Table.Cell>{appointment.AppointmentDate}</Table.Cell>
              <Table.Cell>{appointment.AppointmentTime}</Table.Cell>
            </Table.Row>
          ))}
        </Table>
      ) : (
        <H3>No appointments booked</H3>
      )}
    </>
  );
};

export default AppointmentList;
