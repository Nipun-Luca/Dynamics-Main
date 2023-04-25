import React, { Component } from 'react';
import { TopNav } from 'govuk-react';
 
class PatientHeader extends Component {
  render() {
    return (
        // <TopNav>
        //     <TopNav.NavLink>Home</TopNav.NavLink>
        //     <TopNav.NavLink>View Appointments</TopNav.NavLink>
        //     <TopNav.NavLink>View Medical Records</TopNav.NavLink>
        //     <TopNav.NavLink>Update Medical Records</TopNav.NavLink>
        //     <TopNav.NavLink>Logout</TopNav.NavLink>
        // </TopNav>
        <TopNav

>
  <TopNav.NavLink href='/patientdashboard'>
  Home
  </TopNav.NavLink>
  <TopNav.NavLink href='/patient-view-appointment'>
  View Appointments
  </TopNav.NavLink>
  
  <TopNav.NavLink href='/patient-book-appointment'>
  Book Appointments
  </TopNav.NavLink>

  <TopNav.NavLink href='/patient-cancel-appointment'>
  Cancel Appointments
  </TopNav.NavLink>
  <TopNav.NavLink href='/patient-view-patient-record'>
  View Patient Records
  </TopNav.NavLink>
  <TopNav.NavLink href='/logout'>
  Logout
  </TopNav.NavLink>

</TopNav>


    );
  }
}
 
export default PatientHeader;