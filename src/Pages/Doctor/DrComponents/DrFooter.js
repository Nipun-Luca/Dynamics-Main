import { Footer as FooterLink, Link } from 'govuk-react';
import React, { Component } from 'react';
 
class Footer extends Component {
  render() {
    return (
      <div className="drfoot">
          
      <FooterLink>
      <div>The following links open in a new tab</div>
      <br />
      <div className = "drfoot">
          <Link  href="#">Terms and conditions</Link>
        </div>
        <div className = "drfoot">
          <Link  href="#">Contact us</Link>
        </div> 
      </FooterLink> 
  </div>
    )
  }
}
 
export default Footer;
