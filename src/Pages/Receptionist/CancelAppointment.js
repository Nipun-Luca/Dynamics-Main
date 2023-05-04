import React, { useState } from 'react';
import { Radio, Button, Panel, ErrorText, H3 } from 'govuk-react';
import $ from 'jquery';

const CancelAppointment = ({ doctorName, fetchAppointments }) => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleCancelAppointment = (event) => {
    event.preventDefault();
    if (!selectedAppointmentId) {
      setError('Please select an appointment to cancel.');
      return;
    }
    $.ajax({
      url: 'https://localhost:8000/cancel_recpetionist_appointment.php',
      method: 'POST',
      data: {
        'AppointmentNo': selectedAppointmentId,
        'DoctorName': doctorName,
      },
      success: (response) => {
        console.log('Cancellation successful:', response);
        fetchAppointments(doctorName);
        setConfirmationMessage('Appointment has been canceled successfully.');
      },
      error: (error) => {
        console.error('Cancellation failed:', error);
        setConfirmationMessage('Unable to cancel appointment.');
      },
    });
  };

  return (
    <div>
      {!confirmationMessage && (
        <>
          <H3>Select an appointment to cancel</H3>
          {fetchAppointments ? (
            <Button onClick={() => fetchAppointments(doctorName)} type="button">
              Refresh appointments
            </Button>
          ) : null}
          {error && <ErrorText>{error}</ErrorText>}
          <form onSubmit={handleCancelAppointment}>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <Radio
                  key={appointment.AppointmentNo}
                  name="appointment"
                  value={appointment.AppointmentNo}
                  checked={selectedAppointmentId === appointment.AppointmentNo}
                  onChange={() => setSelectedAppointmentId(appointment.AppointmentNo)}
                >
                  {`${appointment.AppointmentDate} ${appointment.AppointmentTime}`}
                </Radio>
              ))
            ) : (
              <H3>No appointments to cancel</H3>
            )}
            <Button type="submit">Cancel appointment</Button>
          </form>
        </>
      )}

      {confirmationMessage && (
        <Panel title="Cancellation Confirmed">
          <p>{confirmationMessage}</p>
          <ul>
            <li>Appointment Successfully: </li>
            <li>Appointment No: </li>
            <li>Vaccine Type: </li>
            <li>Vaccination Date: </li>
            <li>Patient: </li>
          </ul>
        </Panel>
      )}
    </div>
  );
};

export default CancelAppointment;