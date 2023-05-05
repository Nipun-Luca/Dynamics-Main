import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Radio, Button, Panel, ErrorText, H3, Main } from 'govuk-react';
import $ from 'jquery';

import Header from "./ReceptionistHeader";
import Footer from "../../Components/Footer";

const CancelAppointment = () => {
  const location = useLocation();
  const doctorId = location.state?.doctorId;
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [appointments, setAppointments] = useState([]);

  const retrieveAllAppointments = () => {
    $.ajax({
      url: 'http://localhost:8000/receptionistGetAppointment.php',
      method: 'POST',
      data: {
        doctorId: doctorId,
      },
      dataType: 'json',
      success: (data) => {
        setAppointments(data);
      },
      error: (error) => {
        console.error('Failed to retrieve appointments:', error);
      },
    });
  };

  useEffect(() => {
    retrieveAllAppointments();
  }, [doctorId]);

  const handleCancelAppointment = (event) => {
    event.preventDefault();
    if (!selectedAppointmentId) {
      setError('Please select an appointment to cancel.');
      return;
    }
    $.ajax({
      url: 'http://localhost:8000/receptionistCancelAppointment.php',
      method: 'POST',
      data: {
        AppointmentNo: selectedAppointmentId,
      },
      success: (response) => {
        console.log('Cancellation successful:', response);
        retrieveAllAppointments();
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
      <Header />
      <Main>

      {!confirmationMessage && (
        <>
          <H3>Select an appointment to cancel</H3>
          <Button onClick={retrieveAllAppointments} type="button">
            Refresh appointments
          </Button>
          {error && <ErrorText>{error}</ErrorText>}
          <form>
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
              <H3>No appointments available</H3>
            )}
            <Button type="submit" onClick={handleCancelAppointment}>Cancel appointment</Button>
          </form>
        </>
      )}

      {confirmationMessage && (
        <Panel title="Cancellation Confirmed">
          <p>{confirmationMessage}</p>
        </Panel>
      )}

      </Main>
      <Footer />
    </div>
  );
};

export default CancelAppointment;