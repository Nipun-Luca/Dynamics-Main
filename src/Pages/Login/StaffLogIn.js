import "../../App.css";
import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";

const StaffLoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    emailAddress: "",
  });
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
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

    $.ajax({
      type: "POST",
      url: "http://localhost:8000/staffLogin.php",
      data: { emailAddress: formValues.emailAddress } ,
      dataType: "json",
      
      success: function(response) {
        if (response.success && response.role === "doctor") {
          navigate("/staffPassword", { state: { 
            emailAddress: formValues.emailAddress,
            role: response.role
          } });
        } else if (response.success && response.role === "receptionist") {
          navigate("/staffPassword", { state: { 
            emailAddress: formValues.emailAddress,
            role: response.role
          } });
        } else {
          setErrorMessage("Wrong email");
        }
      },
      error: function(xhr, status, error) {
        console.error(xhr);
        console.error(status);
        console.error(error);
        setErrorMessage("Error checking email, please try again later");
      }
    })
  };

  return (
    <div>
      <Header />
      <Main>
        <BackLink onClick={() => navigate(-1)}> Back </BackLink>
        <FormGroup>
          <div className="login-heading">
            <H2>STAFF</H2>
          </div>
          <p>Enter your email address</p>

          <Fieldset>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <b>Email Address</b>
            <InputField
              name="emailAddress"
              value={formValues.emailAddress}
              onChange={(e) =>
                setFormValues({ ...formValues, emailAddress: e.target.value })
              }
              required
            />
            <Button onClick={handleSubmit}>Enter</Button>
          </Fieldset>
        </FormGroup>
      </Main>
        <Footer />
    </div>
  );
};
export default StaffLoginPage;