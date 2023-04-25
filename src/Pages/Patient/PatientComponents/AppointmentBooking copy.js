import React, { useState } from 'react';
import { Select, Radio, Button, Panel } from 'govuk-react';
import $ from 'jquery';

const AppointmentBooking = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [dateTouched, setDateTouched] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const isValidDate = () => {
    return year && month && day;
  };

  const formatDate = () => {
    return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
  };

  const formatTime = () => {
    return time;
  };

  const handleDateConfirmation = (event) => {
    event.preventDefault();
    setDateTouched(true);
  };

  const handleBooking = (event) => {
    event.preventDefault();
    if (!isValidDate() || !time) {
      return;
    }
    const appointmentDate = formatDate();
    const appointmentTime = formatTime();
    const NHSNumber = '92233359811'; // Replace this with the actual patient NHS Number
    const DoctorId = '1'; // Replace this with the actual doctor ID

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
      days.push(
        <option key={i} value={i}>
          {i}
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
    <div>
      {!bookingConfirmed && (
        <>
      <Select
        hint="Please select the year of your booking"
        input={{ name: 'year', onChange: (e) => setYear(e.target.value) }}
        label="Year"
        meta={{
          error: dateTouched && !isValidDate() ? 'Please select a valid year' : '',
          touched: dateTouched,
        }}
      >
        <option value="">Select year</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </Select>

      <Select
        hint="Please select the month of your booking"
        input={{ name: 'month', onChange: (e) => setMonth(e.target.value) }}
        label="Month"
        meta={{
          error: dateTouched && !isValidDate() ? 'Please select a valid month' : '',
          touched: dateTouched,
        }}
      >
        <option value="">Select month</option>
        {[...Array(12).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1 < 10 ? `0${i + 1}` : i + 1}
          </option>
        ))}
      </Select>

      <Select
        hint="Please select the day of your booking"
        input={{ name: 'day', onChange: (e) => setDay(e.target.value) }}
        label="Day"
        meta={{
          error: dateTouched && !isValidDate() ? 'Please select a valid day' : '',
touched: dateTouched,
}}
>
<option value="">Select day</option>
{renderDays()}
</Select>

<h3></h3>
          <Button onClick={handleDateConfirmation}>Confirm date</Button>
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
    </div>
  );
};

export default AppointmentBooking;