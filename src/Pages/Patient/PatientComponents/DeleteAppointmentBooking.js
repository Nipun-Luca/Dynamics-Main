import React, { useState } from 'react';
import { Select, Radio, Button, Panel } from 'govuk-react';
import $ from 'jquery';

const AppointmentBooking = () => {
  const [dateConfirmed, setDateConfirmed] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ day: '', month: '', year: '' });
  const [selectedTime, setSelectedTime] = useState('');

  const patientIdNo = 1;

  const handleDateChange = (event) => {
    setSelectedDate({ ...selectedDate, [event.target.name]: event.target.value });
  };

  // const handleDateChange = (event) => {
  //   const newSelectedDate = {
  //     ...selectedDate,
  //     [event.target.name]: event.target.value
  //   };
  //   setSelectedDate(newSelectedDate);
  // };
  
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateConfirmation = () => {
    setDateConfirmed(true);
  };
  const formatDate = (date) => {
    const day = date.day;
    const month = date.month;
    const year = date.year;
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time) => {
    return time;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const appointmentDate = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
    // const appointmentTime = selectedTime;
    const appointmentDate = formatDate(selectedDate);
    const appointmentTime = formatTime(selectedTime);
    console.log(appointmentDate)
    
    // Send data to the PHP server using AJAX
    $.ajax({
      url: 'http://localhost:8000/book_appointment.php',
      method: 'POST',
      data: {
        'PatientIdNo': patientIdNo,
        'AppointmentDate': appointmentDate,
        'AppointmentTime': appointmentTime,
      },
      success: (response) => {

        console.log('Booking successful:', response);
        setBookingConfirmed(true);
      },
      error: (error) => {
        console.error('Booking failed:', error);
      },
    });
  };

  return (
    <>
      {bookingConfirmed ? (
        <Panel title="Appointment booked">
          Your appointment has been successfully booked.
        </Panel>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Date picker */}
          <div>
            <Select
              hint="Select the year"
              input={{
                name: 'year',
                onChange: handleDateChange,
              }}
              label="Year"
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </Select>

            <Select
              hint="Select the month"
              input={{
                name: 'month',
                onChange: handleDateChange,
              }}
              label="Month"
            >
               <option value="1">
1
</option>
<option value="2">
2
</option>
<option value="3">
3
</option>
<option value="4">
4
</option>
<option value="5">
5
</option>
<option value="6">
6
</option>
<option value="7">
7
</option>
<option value="8">
8
</option>
<option value="9">
9
</option>
<option value="10">
10
</option>
<option value="11">
11
</option>
<option value="12">
12
</option>
            </Select>

            <Select
              hint="Select the day"
              input={{
                name: 'day',
                onChange: handleDateChange,
              }}
              label="Day"
            >
      <option value="1" >
1
</option>
<option value="2">
2
</option>
<option value="3">
3
</option>
<option value="4">
4
</option>
<option value="5">
5
</option>
<option value="6">
6
</option>
<option value="7">
7
</option>
<option value="8">
8
</option>
<option value="9">
9
</option>
<option value="10">
10
</option>
<option value="11">
11
</option>
<option value="12">
12
</option>
<option value="13">
13
</option>
<option value="14">
14
</option>
<option value="15">
15
</option>
<option value="16">
16
</option>
<option value="17">
17
</option>
<option value="18">
18
</option>
<option value="19">
19
</option>
<option value="20">
20
</option>
<option value="21">
21
</option>
<option value="22">
22
</option>
<option value="23">
23
</option>
<option value="24">
24
</option>
<option value="25">
25
</option>
<option value="26">
26
</option>
<option value="27">
27
</option>
<option value="28">
28
</option>
<option value="29">
29
</option>
<option value="30">
30
</option>
<option value="31">
31
</option>
            </Select>
          </div>

          {dateConfirmed ? (
            <>
              {/* Time slots */}
              <div>
                <h3>Select a time slot</h3>
                <Radio name="10:00" value="10:00" onChange={handleTimeChange}>
        10:00
      </Radio>
      <Radio name="10:30" value="10:30" onChange={handleTimeChange}>
        10:30
      </Radio>
      <Radio name="11:00" value="11:00" onChange={handleTimeChange}>
        11:00
      </Radio>
       <Radio name="11:30" value="11:30" onChange={handleTimeChange}>
        11:30
      </Radio>
      <Radio name="12:00" value="12:00" onChange={handleTimeChange}>
        12:00
      </Radio>
      <Radio name="12:30" value="12:30" onChange={handleTimeChange}>
        12:30
      </Radio>     <Radio name="13:00" value="13:00" onChange={handleTimeChange}>
        13:00
      </Radio>
      <Radio name="13:30" value="13:30" onChange={handleTimeChange}>
        13:30
      </Radio>     <Radio name="14:00" value="14:00" onChange={handleTimeChange}>
        14:00
      </Radio>
      <Radio name="14:30" value="14:30" onChange={handleTimeChange}>
        14:30
      </Radio>     <Radio name="15:00" value="15:00" onChange={handleTimeChange}>
        15:00
      </Radio>
      <Radio name="15:30" value="15:30" onChange={handleTimeChange}>
        15:30
      </Radio>
              </div>

              {/* Submit button */}
              <Button type="submit">Book Appointment</Button>
            </>
          ) : (
            <Button type="button" onClick={handleDateConfirmation}>
              Confirm Date
            </Button>
          )}
        </form>
      )}
    </>
  );
};

export default AppointmentBooking;
