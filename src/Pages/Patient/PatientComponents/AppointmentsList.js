import React, { useState, useEffect } from 'react';
import { Table, ErrorText, H3 } from 'govuk-react';
import $ from 'jquery';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const NHSNumber = '92233359811'; // Replace this with the actual patient NHS Number

  useEffect(() => {
    fetchAppointments(NHSNumber);
  }, [NHSNumber]);

  const fetchAppointments = (NHSNumber) => {
    $.ajax({
      url: 'http://localhost:8000/get_appointments.php',
      method: 'POST',
      dataType: 'json', // Add this line
      data: {
        'NHSNumber': NHSNumber,
      },
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
