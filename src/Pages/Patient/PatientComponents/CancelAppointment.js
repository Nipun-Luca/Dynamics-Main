import React, { useState, useContext,useEffect } from 'react';
import { Radio, Button, Panel, ErrorText, H3, H1, H2, BackLink } from 'govuk-react';
import $ from 'jquery';
import PatientContext from './PatientContext';
import { Link } from 'react-router-dom';

const CancelAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [error, setError] = useState('');

  const { NHSNumber } = useContext(PatientContext); 
  //const NHSNumber = '92233359811'; // 

  useEffect(() => {
    fetchAppointments(NHSNumber);
  }, [NHSNumber]);
//Ajax query to dosplay appointment to cancel
  const fetchAppointments = (NHSNumber) => {
    $.ajax({
      url: 'http://localhost:8000/get_appointments_cancel.php',
      method: 'POST',
      dataType: 'json',
      data: {
        'NHSNumber': NHSNumber,
      },
      success: (jsonResponse) => {
        if (jsonResponse.appointments) {
          setAppointments(jsonResponse.appointments);
        } else {
          console.error(jsonResponse.message || 'Empty response from the server');
        }
      },
      error: (error) => {
        console.error('Fetching appointments failed:', error);
      },
    });
  };

  const cancelAppointment = (event) => {
    event.preventDefault();

    if (!selectedAppointmentId) {
      setError('Please select an appointment to cancel.');
      return;
    }
    //Ajax query to cancel appointment
    $.ajax({
      url: 'http://localhost:8000/cancel_appointment.php',
      method: 'POST',
      data: {
        'AppointmentNo': selectedAppointmentId,
        'NHSNumber': NHSNumber,
      },
      success: (response) => {
        console.log('Cancellation successful:', response);
        fetchAppointments(NHSNumber);
        setConfirmationMessage('Appointment was canceled successfully.');
      },
      error: (error) => {
        console.error('Cancellation failed:', error);
        setConfirmationMessage('Unable to cancel appointment.');
      },
    });
  };
//Ternary condition to display appointments
  return (
    <div>
      {!confirmationMessage && (
        <>
          {appointments.length > 0 ? (
            <>
              <H3>Select an appointment to cancel</H3>
              <H1></H1>
                <H2></H2>
              <form onSubmit={cancelAppointment}>
                {appointments.map((appointment) => (
                  <Radio
                    key={appointment.AppointmentNo}
                    name="appointment"
                    value={appointment.AppointmentNo}
                    onChange={() => setSelectedAppointmentId(appointment.AppointmentNo)}
                  >
                    {`${appointment.AppointmentDate} ${appointment.AppointmentTime}`}
                  </Radio>
                ))}
                <H1></H1>
                <H2></H2>
                {error && <ErrorText>{error}</ErrorText>}
                <Button type="submit">Cancel appointment</Button>
              </form>
            </>//Ternary condition to display confirmation messages
          ) : (
            <H3>No appointments to cancel</H3>
          )}
          <H1></H1>
      <H2></H2>
      <H3></H3>
        </>
      )}

      {confirmationMessage && (
        <>
          <Panel title="Cancellation Confirmed">
            <p>{confirmationMessage}</p>
          </Panel>
          <H1></H1>
          <Button as={Link} to='/patientdashboard/patient-book-appointment'>Book appointment</Button> {/* Move the button outside the Panel */}
        </>
      )}
      <H1></H1>
              <H2></H2>
              
    </div>
  );
};

export default CancelAppointment;
