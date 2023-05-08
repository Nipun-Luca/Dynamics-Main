

//****Author- w1785478 *****/
import { Table, ErrorText, H3 } from 'govuk-react';
import $ from 'jquery';
import React, { useState, useEffect,useContext } from 'react';
import DoctorContext from './DoctorContext';

//The DrAppointmentTable component is a React functional component that displays a table of upcoming appointments for a doctor. It imports required dependencies and utilizes the DoctorContext to access the doctor's ID.

//The component uses useState to manage appointments and error state. The useEffect hook is utilized to fetch appointments whenever the DoctorId changes. The fetchAppointments function makes an AJAX request to the viewDrAppointment.php script, which returns appointment data for the doctor. Based on the response, the component updates the appointments list or sets an error message.

//The component renders the table with appointment data. If there is an error, an ErrorText component is

const DrAppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  
  const { DoctorId } = useContext(DoctorContext);
 

  useEffect(() => {
    fetchDoctorAppointments(DoctorId);
  }, [DoctorId]);

  const fetchDoctorAppointments = (DoctorId) => {
    $.ajax({
      url: 'http://localhost:8000/viewDrAppointment.php',
      method: 'POST',
      dataType: 'json', 
      data: {
          'DoctorId': DoctorId,
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
          setError('There is no booked appointments ');
        }
      },
      error: (error) => {
        setError('Fetching doctor appointments failed: ' + error.statusText);
      },
    });
  };
  

  return (
    <>
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : appointments.length ? (
        <Table caption="Your upcoming appointments">
          <Table.Row>
            <Table.CellHeader>Appointment No</Table.CellHeader>        
            <Table.CellHeader>Vaccination Date</Table.CellHeader>
            <Table.CellHeader>Vaccination Time</Table.CellHeader>
            <Table.CellHeader>Patient NHS Number</Table.CellHeader>
          </Table.Row>
          {appointments.map((appointment, index) => (
            <Table.Row key={index}>
              <Table.Cell>{appointment.AppointmentNo}</Table.Cell>      
              <Table.Cell>{appointment.AppointmentDate}</Table.Cell>
              <Table.Cell>{appointment.AppointmentTime}</Table.Cell>
              <Table.Cell>{appointment.NHSNumber}</Table.Cell>
            </Table.Row>
          ))}
        </Table>
      ) : (
        <H3>No doctor appointments has been booked</H3>
      )}
    </>
  );
};

export default DrAppointmentTable;
