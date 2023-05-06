import React, { Component } from 'react';
import { TopNav } from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientContext from './PatientContext';
class PatientHeaderDeregistration extends Component {

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
  
</TopNav>


    );
  }
}
 
export default PatientHeaderDeregistration;