import React, { useState, useContext } from "react";
import {
  Fieldset,
  InputField,
  Button,
  FormGroup,
  BackLink,
  Main,
  H2
} from "govuk-react";
import $ from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import PatientContext from '.././PatientComponents/PatientContext.js'; // Import PatientContext

import Header from '../../Components/DefaultHeader';
import Footer from '../../Components/Footer';


const LoginPage = () => {
  const navigate = useNavigate();
  // Receive NHS number and email from previous page
  const location = useLocation();
  const emailAddress = location.state?.emailAddress;
  const { setNhsNumber } = useContext(PatientContext); // needs match with nhsNumber
  console.log(emailAddress)

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

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
        console.log(response.nhsNumber);
        if (response.success) {
          localStorage.setItem("isAuthenticated", "true");
          navigate("/patientdashboard", { state: { nhsNumber: response.nhsNumber } });
        } else {
          alert("Wrong password");
        }
      },
      error: function(xhr, status, error) {
        console.error(xhr);
        console.error(status);
        console.error(error);
        alert("Error checking password, please try again later");
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
            <b>Password</b>
            <InputField
              type="password"
              label="Enter password"
              name="password"
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
