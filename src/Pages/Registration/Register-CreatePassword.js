import React, { useState } from "react";
import {
  Fieldset,
  InputField,
  Button,
  FormGroup,
  BackLink,
  Main,
  ErrorText,
  H2
} from "govuk-react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";
import $ from "jquery";

const RegistrationPage = () => {
  const navigate = useNavigate();
  // Receive NHS number and email from previous page
  const location = useLocation();
  const nhsNumber = location.state?.nhsNumber;
  const emailAddress = location.state?.emailAddress;

  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });
  
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.password.trim() || !formValues.confirmPassword.trim()) {
      setErrorMessage("Please fill the required information");
      return;
    }

    //Check if password has at least 8 characters
    if (formValues.password.length < 8) {
      setErrorMessage("Password must have at least 8 characters");
      return;
    }

    //Check if password and confirm password fields match
    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    //Send email to database using AJAX
    $.ajax({
      url: "http://localhost:8000/registration.php",
      method: "POST",
      data: {
        password: formValues.password,
        nhsNumber: nhsNumber,
        emailAddress: emailAddress,
      },
      dataType: "json",
      success: function (response) {
        if (response.success) {
           // Set isAuthenticated flag in localStorage
           localStorage.setItem("isAuthenticated", "true");

        navigate("/patientDashboard", { state: { nhsNumber: nhsNumber } });
        }
      },
      error: function (xhr, status, error) {
        console.error(xhr);
        console.error(status);
        console.error(error);
        setErrorMessage("Error registering, please try again later");
      },
    });
  };

  return (
    <div>
      <Header />
      <Main>
        <BackLink onClick={() => navigate(-1)}> Back </BackLink>

        <FormGroup>
          <H2>Create Password</H2>
          <p>Password requires: 8 characters or more</p>

          <Fieldset>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <b>Password</b>
            <InputField
              name="password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
              required
            />

            <b>Confirm Password</b>
            <InputField
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={(e) =>
                setFormValues({...formValues, confirmPassword: e.target.value,
                })
              }
              required
            />

            <Button onClick = {handleSubmit}>Enter</Button>
          </Fieldset>
        </FormGroup>
      </Main>

      <Footer />
    </div>
  );
};

export default RegistrationPage;