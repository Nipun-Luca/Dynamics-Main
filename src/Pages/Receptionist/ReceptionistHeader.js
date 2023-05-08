//----------------------
////Author: w1822557
//----------------------

import React, { Component } from 'react';
import { TopNav } from 'govuk-react';
import { Link } from 'react-router-dom';
import ReceptionistContext from './ReceptionistContext';

class Header extends Component {
  static contextType = ReceptionistContext;

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
        <TopNav.NavLink as={Link} to='/receptionistdashboard'>
          Home
        </TopNav.NavLink>
        <TopNav.NavLink as={Link} to='/receptionistdashboard/view-doctor-list'>
          View Doctor List
        </TopNav.NavLink>
        <TopNav.NavLink as={Link} to='/staffLogIn' onClick={this.handleLogout}>
          Logout
        </TopNav.NavLink>
      </TopNav>
    );
  }
}

export default Header;
