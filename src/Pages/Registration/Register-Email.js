//----------------------
////Author: w1820984
//----------------------

import React, { useState, useEffect } from "react";
import {
  Fieldset,
  InputField,
  Button,
  FormGroup,
  BackLink,
  Main,
  H2,
  ErrorText
} from "govuk-react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from '../../Components/DefaultHeader';
import Footer from '../../Components/Footer';
import $ from "jquery";


const RegistrationPage = () => {
  const navigate = useNavigate();
  //Receive NHS number from previous page
  const location = useLocation();
  const nhsNumber = location.state?.nhsNumber;

  const [formValues, setFormValues] = useState({
    emailAddress: "",
  });
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.emailAddress.trim()) {
      setErrorMessage("Please fill the required information");
      return;
    }
  
    //Regular expression to check if email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //Check if email is in a valid format
    if (!emailRegex.test(formValues.emailAddress)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
  
    //Send AJAX request to register email
    $.ajax({
      url: 'http://localhost:8000/patientRegisterEmail.php',
      method: 'POST',
      data: { emailAddress: formValues.emailAddress },
      dataType: "json",
      success: function(response) {
        if (!response.success) {
        navigate('/registerCreatePassword', { state: { nhsNumber: nhsNumber, emailAddress: formValues.emailAddress } });
        } else {
          setErrorMessage("Email is already registered in our system")
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        setErrorMessage('An error occurred while registering your email. Please try again later.');
      }
    });
  };

  useEffect(() => {
    //prevent from accessing this page through url
    if (!nhsNumber) {
      navigate("/homepage");
    }
  }, [nhsNumber, navigate]);

  return (
    <div>
      <Header />  
      <Main>
        <BackLink onClick={() => navigate(-1)}> Back </BackLink>

        <FormGroup onSubmit={handleSubmit}>
        <H2>What is your email address?</H2>
        <p color='grey'>Example format: adrianRos@gmail.com</p>

          <Fieldset>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <b>Email Address</b>
              <InputField
                name="email"
                value={formValues.emailAddress}
                onChange={(e) => setFormValues({ ...formValues, emailAddress: e.target.value })}
                required/>
        
              <Button onClick={handleSubmit}>Enter</Button> 
          </Fieldset>
        </FormGroup>
      </Main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;