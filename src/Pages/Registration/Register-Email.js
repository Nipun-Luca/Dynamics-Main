import React, { useState } from "react";
import {
  Fieldset,
  InputField,
  Button,
  FormGroup,
  BackLink,
  Main,
  H2
} from "govuk-react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import Header from '../../Components/DefaultHeader';
import Footer from '../../Components/Footer';
import $ from "jquery"; // import jQuery


const RegistrationPage = () => {
  const navigate = useNavigate();
  //Receive NHS number from previous page
  const location = useLocation();
  const nhsNumber = location.state?.nhsNumber;
  console.log(nhsNumber)

  const [formValues, setFormValues] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Regular expression to check if email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if email is in a valid format
    if (!emailRegex.test(formValues.email)) {
      alert("Please enter a valid email address");
      return;
    }
  
    // Send AJAX request to register email
    $.ajax({
      url: 'http://localhost:8000/patientRegisterEmail.php',
      method: 'POST',
      data: { email: formValues.email },
      dataType: "json",
      success: function(response) {
        console.log(response.success)
        if (!response.success) {
        navigate('/registerCreatePassword', { state: { nhsNumber: nhsNumber, email: formValues.email } });
        } else {
          alert("Email is already registered in our system")
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('An error occurred while registering your email. Please try again later.');
      }
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

        <FormGroup onSubmit={handleSubmit}>
        <H2>What is your email address?</H2>
        <p color='grey'>Example format: adrianRos@gmail.com</p>

          <Fieldset>
            <b>Email Address</b>
              <InputField
                label="Enter email address"
                name="email"
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                required/>
        
              <Button type="submit" onClick={handleSubmit}>Enter</Button> 
          </Fieldset>
        </FormGroup>
      
      </Main>
      
      <Footer />
    </div>
  );
};

export default RegistrationPage;