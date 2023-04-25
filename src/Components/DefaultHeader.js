import React, { Component } from 'react';
import { TopNav } from 'govuk-react';
 
class Header extends Component {
  render() {
    return (
        <TopNav>
            <TopNav.NavLink href='/homepage'>Home</TopNav.NavLink>
        </TopNav>
    );
  }
}
 
export default Header;