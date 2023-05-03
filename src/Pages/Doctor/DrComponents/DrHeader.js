import React, { Component } from 'react';
import { TopNav } from 'govuk-react';
import { Link } from 'react-router-dom';
import DoctorContext from './DoctorContext';

class Header extends Component {
  static contextType = DoctorContext;

  handleLogout = () => {
    // Clear isAuthenticated flag in localStorage
    localStorage.removeItem("isAuthenticated");

    // Call the original logout function if you need to do anything else
    const { logout } = this.context;
    if (typeof logout === "function") {
      logout();
    }
  };

  render() {
    return (
      <TopNav>
        <TopNav.NavLink as={Link} to='/doctor-dashboard'>
          Home
        </TopNav.NavLink>
        <TopNav.NavLink as={Link} to='/doctor-dashboard/appointments'>
          View Appointments
        </TopNav.NavLink>
        <TopNav.NavLink as={Link} to='/doctor-dashboard/medical-records'>
          View Medical Records
        </TopNav.NavLink>
        <TopNav.NavLink as={Link} to='/doctor-dashboard/update-medical-records'>
          Update Medical Records
        </TopNav.NavLink>
        <TopNav.NavLink as={Link} to='/staffLogIn' onClick={this.handleLogout}>
          Logout
        </TopNav.NavLink>
      </TopNav>
    );
  }
}

export default Header;
