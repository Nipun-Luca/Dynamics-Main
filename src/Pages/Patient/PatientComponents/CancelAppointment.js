import React, { useState, useEffect, useContext } from 'react';
import { Radio, Button, Panel, ErrorText, H3 } from 'govuk-react';
import $ from 'jquery';
import PatientContext from '.././PatientComponents/PatientContext.js'; // Import PatientContext
const CancelAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [error, setError] = useState('');

  const { patientData } = useContext(PatientContext); // Use patientData from PatientContext
  const NHSNumber = patientData.NHSNumber; // Use nhsNumber from patientData

  //const nhsNumber = '92233359811'; // Replace this with the actual patient NHS Number

  useEffect(() => {
    fetchAppointments(NHSNumber);
  }, [NHSNumber]);

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

  return (
    <div>
      {!confirmationMessage && (
        <>
          {appointments.length > 0 ? (
            <>
              <H3>Select an appointment to cancel</H3>
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
                {error && <ErrorText>{error}</ErrorText>}
                <Button type="submit">Cancel appointment</Button>
              </form>
            </>
          ) : (
            <H3>No appointments to cancel</H3>
          )}
        </>
      )}

      {confirmationMessage && (
        <Panel title="Cancellation Confirmed">
          <p>{confirmationMessage}</p>
        </Panel>
      )}
    </div>
  );
};

export default CancelAppointment;
