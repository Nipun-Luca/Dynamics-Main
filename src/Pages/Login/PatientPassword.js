import React, { useState, useContext } from "react";
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
import $ from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import PatientContext from '.././Patient/PatientComponents/PatientContext'; // Import PatientContext

import Header from '../../Components/DefaultHeader';
import Footer from '../../Components/Footer';


const LoginPage = () => {
  const navigate = useNavigate();
  // Receive NHS number and email from previous page
  const location = useLocation();
  const emailAddress = location.state?.emailAddress;
  console.log(emailAddress)

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("")
  const { setNHSNumber } = useContext(PatientContext); // needs match with nhsNumber

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    $.ajax({
      type: "POST",
      url: "http://localhost:8000/patientPasswordCheck.php",
      data: { 
        password: formValues.password,
        emailAddress: emailAddress,
      } ,
      dataType: "json",
      
      success: function(response) {
        console.log(response);
        console.log(response.NHSNumber);
        if (response.success) {
          setNHSNumber(response.NHSNumber); // Set the nhsNumber in the PatientContext
          localStorage.setItem("isAuthenticated", "true");
          navigate("/patientdashboard", { state: { NHSNumber: response.NHSNumber } });

        } else {
          setErrorMessage("Wrong password");
        }
      },
      error: function(xhr, status, error) {
        console.error(xhr);
        console.error(status);
        console.error(error);
        setErrorMessage("Error checking password, please try again later");
      }
    })
  };
  



  let history = useNavigate();

  return (
    <div>
      <Header />  
      <Main>
        <BackLink onClick={() => history(-1)}>
          Back
        </BackLink>

        <FormGroup >
          <div className='login-heading'>
            <H2>PATIENT</H2>
          </div>

          <p>Enter your password</p>

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

            <Button type="submit" onClick={handleSubmit}>Enter</Button>
          </Fieldset>
        </FormGroup>
      </Main>
      <Footer />
    </div>
  );
};

export default LoginPage;