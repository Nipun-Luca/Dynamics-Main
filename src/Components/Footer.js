import { Footer as FooterLink, Link } from 'govuk-react';
import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
       
        <div className="footer">
          
            <FooterLink>
            <div className = "drfoot">
                <Link  href='/termsOFUse'>Terms and conditions</Link>
              </div>
              <div className = "drfoot">
                <Link  href='/contactUs'>Contact us</Link>
              </div> 
            </FooterLink> 
        </div>
    )
  }
}

export default Footer;