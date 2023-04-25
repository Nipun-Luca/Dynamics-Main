import React, { useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, H2, InputField, Fieldset, Main, BackLink } from "govuk-react";

import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";

const PatientLogIn = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    emailAddress: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "http://localhost:8000/patientLoginEmail.php",
      data: { emailAddress: formValues.emailAddress } ,
      dataType: "json",
      
      success: function(response) {
        console.log(response);
        if (response) {
          navigate("/patientPassword", { state: { emailAddress: formValues.emailAddress } });
        } else {
          alert("Wrong email");
        }
      },
      error: function(xhr, status, error) {
        console.error(xhr);
        console.error(status);
        console.error(error);
        alert("Error checking email, please try again later");
      }
    })
  };


   

  let history = useNavigate();

  return (
    <div>
      <Header />
      <Main>
        <BackLink onClick={() => history(-1)}> Back </BackLink>
        <FormGroup>
          <div className="login-heading">
            <H2>PATIENT</H2>
          </div>
          <p>Enter your email address</p>

          <Fieldset>
            <b>Email Address</b>
            <InputField
              label="Enter email address"
              name="emailAddress"
              value={formValues.emailAddress}
              onChange={(e) =>
                setFormValues({ ...formValues, emailAddress: e.target.value })
              }
              required
            />
            <Button type="submit"  onClick={handleSubmit}>Enter</Button>
          </Fieldset>
        </FormGroup>
      </Main>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
};

export default PatientLogIn;