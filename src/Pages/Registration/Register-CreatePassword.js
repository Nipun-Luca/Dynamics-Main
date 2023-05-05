import React, { useState } from "react";
import {
  Fieldset,
  InputField,
  Button,
  FormGroup,
  BackLink,
  Main,
  ErrorText
} from "govuk-react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";
import $ from "jquery"; // import jQuery

const RegistrationPage = () => {
  const navigate = useNavigate();
  // Receive NHS number and email from previous page
  const location = useLocation();
  const nhsNumber = location.state?.nhsNumber;
  const email = location.state?.email;
  console.log(nhsNumber)
  console.log(email)

  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });
  
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if password and confirm password fields match
    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Check if password has at least 8 characters
    if (formValues.password.length < 8) {
      setErrorMessage("Password must have at least 8 characters");
      return;
    }

    // Send email to database using AJAX
    $.ajax({
      url: "http://localhost:8000/registration.php",
      method: "POST",
      data: {
        password: formValues.password,
        nhsNumber: nhsNumber,
        email: email,
      },
      dataType: "json",
      success: function (response) {
        if (response.success) {
          localStorage.setItem("isAuthenticated", "true");
          navigate("/patientDashboard", { state: { nhsNumber: nhsNumber } });
        }
      },
      error: function (xhr, status, error) {
        console.error(xhr);
        console.error(status);
        console.error(error);
        // Handle the error here
        setErrorMessage("Error registering, please try again later");
      },
    });
  };

  let history = useNavigate();

  return (
    <div>
      <Header />
      <Main>
        <BackLink onClick={() => history(-1)}>
          Back
        </BackLink>

        <FormGroup>
          <p>Password requires: 8 characters or more</p>

          <Fieldset>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <b>Password</b>
            <InputField
              label="Enter password"
              name="password"
              autoComplete="off"
              autoCorrect="off"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
              required
            />

            <b>Confirm Password</b>
            <InputField
              label="Confirm password"
              name="confirmPassword"
              autoComplete="off"
              autoCorrect="off"
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