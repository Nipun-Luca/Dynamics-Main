//----------------------
////Author: w1820984
//----------------------

import { Footer as FooterLink, Link } from 'govuk-react';
import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
       
        <div className="footer">
            <FooterLink>
            <div className = "footerLinks">
                <Link  href='/termsOFUse'>Terms and conditions</Link>
              </div>
              <div className = "footerLinks">
                <Link  href='/contactUs'>Contact us</Link>
              </div>
            </FooterLink> 
        </div>
    )
  }
}

export default Footer;