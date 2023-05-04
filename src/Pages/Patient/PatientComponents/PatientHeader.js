import React, { Component } from 'react';
import { TopNav } from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientContext from './PatientContext';
class PatientHeader extends Component {

  static contextType = PatientContext;

  handlePatientLogout = () => {
    // Clear isAuthenticated flag in localStorage
    localStorage.removeItem("isAuthenticated");

    // Call the original logout function if you need to do anything else
    const { patientLogout } = this.context;
    if (typeof patientLogout === "function") {
      patientLogout();
    }
  };


  render() {
    return (
  
        <TopNav>
  <TopNav.NavLink as={Link} to='/patientdashboard'>
  Home
  </TopNav.NavLink>
  <TopNav.NavLink as={Link} to='/patientdashboard/patient-view-appointment'>
  View Appointments
  </TopNav.NavLink>
  
  <TopNav.NavLink as={Link} to='/patientdashboard/patient-book-appointment'>
  Book Appointments
  </TopNav.NavLink>

  <TopNav.NavLink as={Link} to='/patientdashboard/patient-cancel-appointment'>
  Cancel Appointments
  </TopNav.NavLink>
  <TopNav.NavLink as={Link} to='/patientdashboard/patient-view-patient-record'>
  View Patient Records
  </TopNav.NavLink>
  <TopNav.NavLink as={Link} to='/homepage' onClick={this.handlePatientLogout}>
  Logout
  </TopNav.NavLink>

</TopNav>


    );
  }
}
 
export default PatientHeader;