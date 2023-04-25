import React, { Component } from 'react';
import { TopNav } from 'govuk-react';
 
class Header extends Component {
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
  <TopNav.NavLink href='/doctor-dashboard'>
  Home
  </TopNav.NavLink>
  <TopNav.NavLink href='/appointments'>
  View Appointments
  </TopNav.NavLink>
  
  <TopNav.NavLink href='/medical-records'>
  View Medical Records
  </TopNav.NavLink>

  <TopNav.NavLink href='/update-medical-records'>
  Update Medical Records
  </TopNav.NavLink>
  
  <TopNav.NavLink href='/logout'>
  Logout
  </TopNav.NavLink>

</TopNav>


    );
  }
}
 
export default Header;