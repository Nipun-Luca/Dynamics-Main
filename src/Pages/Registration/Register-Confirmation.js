import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import {
    Panel,
    Main,
    Button
  } from "govuk-react";

import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";

function RegistrationConfirmation() {
    const location = useLocation();
    const emailAddress = location.state?.emailAddress;
    const password = location.state?.password;

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
          window.history.pushState(null, "", window.location.href);
        };
      }, []);

  return (
    <div>
        <Header />
            <Main>
                <Panel title="Registration complete">
                    Email: {emailAddress} <br/>
                    Password: {password}
                </Panel>

                <p>Click the button to go to Homepage</p>
                <Button as={Link} to="/homepage">Home</Button>
            </Main>
        <Footer />
    </div>
    );
}

export default RegistrationConfirmation;