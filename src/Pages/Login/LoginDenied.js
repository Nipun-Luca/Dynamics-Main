import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
    ErrorSummary,
    Main,
  } from "govuk-react";
import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";

function LoginDenied() {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const handleOnClickError = () => {
    navigate('/homepage');
  };

  return (
    <div>
        <Header />
        <Main>
        <ErrorSummary
            heading="Login Error"
            description="Wrong password has been inserted too many times."
            errors={[
                {
                  targetName: 'error',
                  text: (
                    <span onClick={handleOnClickError}>Click here to go back to the homepage</span>
                  ),
                }
              ]}
            />
        </Main>
        <Footer />
    </div>
    );
}

export default LoginDenied;