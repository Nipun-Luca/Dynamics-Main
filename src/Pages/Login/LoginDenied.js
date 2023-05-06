import React, { useEffect } from 'react';
import {
    ErrorSummary,
    Main
  } from "govuk-react";

import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";

function LoginDenied() {
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
        <ErrorSummary
            heading="Login Error"
            description="Wrong password has been inserted too many times."
            errors={[
                {
                  text: 'Click the "Home" button on the navigation bar to back to the homepage'
                }
              ]}
            />
        </Main>
        <Footer />
    </div>
    );
}

export default LoginDenied;
