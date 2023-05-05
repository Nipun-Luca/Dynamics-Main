const DoctorId = parseInt(time.split(':')[0]) < 12 ? (Math.floor(Math.random() * 3) + 1).toString() : (Math.floor(Math.random() * 3) + 4).toString();



import React, { useState, useContext } from 'react';
import { Select, Radio, Button, Panel, ErrorText, BackLink } from 'govuk-react'; // Add ErrorText to the imports
import $ from 'jquery';
import PatientContext from '.././PatientComponents/PatientContext'; // Import PatientContext

const AppointmentBooking = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [dateConfirmed, setDateConfirmed] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const { NHSNumber } = useContext(PatientContext); // Get NHSNumber from PatientContext
  const [existingAppointment, setExistingAppointment] = useState(null);

// Add this function to check for an existing appointment
const checkExistingAppointment = () => {
  // Send data to the PHP server using AJAX
  $.ajax({
    url: 'http://localhost:8000/check_appointment.php',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      'NHSNumber': NHSNumber,
    }),
    success: (response) => {
      if (response.message === "Appointment found.") {
        console.log('Existing appointment:', response);
        setExistingAppointment(response.data);
      } else {
        console.error('No existing appointment:', response.message);
        setExistingAppointment(null);
      }
    },
  });
};

// Call this function to check for an existing appointment
React.useEffect(() => {
  checkExistingAppointment();
}, []);

  const isValidDate = () => {
    return year && month && day;
  };

  const formatDate = () => {
    return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
  };

  const formatTime = () => {
    return time;
  };
  const handleGoBack = () => {
    window.history.back();
  };
  const handleDateConfirmation = (event) => {
    event.preventDefault();
    if (isValidDate()) {
      setDateConfirmed(true);
    }
  };

  const handleBooking = (event) => {
    event.preventDefault();
    if (!isValidDate() || !time) {
      return;
    }
    const appointmentDate = formatDate();
    const appointmentTime = formatTime();
    // const NHSNumber = '92233359811'; // Replace this with the actual patient NHS Number
    const DoctorId = parseInt(time.split(':')[0]) < 12 ? (Math.floor(Math.random() * 3) + 1).toString() : (Math.floor(Math.random() * 3) + 4).toString();

    // Send data to the PHP server using AJAX
    $.ajax({
      url: 'http://localhost:8000/book_appointment.php',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        'NHSNumber': NHSNumber,
        'AppointmentDate': appointmentDate,
        'AppointmentTime': appointmentTime,
        'DoctorId': DoctorId,
      }),
      success: (response) => {
        if (response.message === "Appointment was booked successfully.") {
          console.log('Booking successful:', response);
          setBookingConfirmed(true);
        } else {
          console.error('Booking failed:', response.message);
        }
      },
    });
  };
  const renderDays = () => {
    let days = [];
    const daysInMonth = new Date(year, month, 0).getDate();
  
    for (let i = 1; i <= daysInMonth; i++) {
      const dayValue = i < 10 ? `0${i}` : i;
      days.push(
        <option key={i} value={i}>
          {dayValue}
        </option>
      );
    }
  
    return days;
  };
  

  const renderTimeSlots = () => {
    const timeSlots = [];
    const startHour = 9;
    const endHour = 16;

    for (let i = startHour; i < endHour; i++) {
      for (let j = 0; j < 2; j++) {
        const timeValue = (i < 10 ? '0' + i : i) + ':' + (j === 0 ? '00' : '30');
        timeSlots.push(
          <Radio
            key={timeValue}
            name="timeSlot"
            value={timeValue}
            onChange={(e) => setTime(e.target.value)}
          >
            {timeValue}
          </Radio>
        );
      }
    }

    return timeSlots;
  };

  return (
    <>

{existingAppointment ? (
        <>
          <ErrorText>
            You already have an appointment scheduled on {existingAppointment.AppointmentDate} at {existingAppointment.AppointmentTime}.
          </ErrorText>
          <ErrorText>
            You need to cancel your existing appointment before booking another one.
          </ErrorText>
          <BackLink onClick={handleGoBack}>Go back</BackLink>
        </>
      ) : (
        <>
      {!bookingConfirmed && (
        <>
        <Select
            hint="Please select the year of your booking"
            input={{ name: 'year', onChange: (e) => setYear(e.target.value) }}
            label="Year"
          >
            <option value="">Select year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </Select>
          <h3></h3>
          <Select
            hint="Please select the month of your booking"
            input={{ name: 'month', onChange: (e) => setMonth(e.target.value) }}
            label="Month"
          >
            <option value="">Select month</option>
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1 < 10 ? `0${i + 1}` : i + 1}
              </option>
            ))}
          </Select>
          <h3></h3>
          <Select
            hint="Please select the day of your booking"
            input={{ name: 'day', onChange: (e) => setDay(e.target.value) }}
            label="Day"
          >
            <option value="">Select day</option>
            {renderDays()}
          </Select>
          <h6></h6>
<h3></h3>
          <Button onClick={handleDateConfirmation}>Confirm date</Button>
          {dateConfirmed && (
            <>
              <h3>Select a time slot</h3>
              {renderTimeSlots()}
              <h3></h3>
              <h3></h3>
              <Button onClick={handleBooking}>Book appointment</Button>
              </>
          )}

          {bookingConfirmed && (
            <Panel title="Booking Confirmed">
              <p>Your appointment has been booked successfully.</p>
            </Panel>
          )}
        </>
      )}
    </>
  );
};

export default AppointmentBooking;