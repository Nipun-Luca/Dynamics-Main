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

    $.ajax({
      type: "POST",
      url: "http://localhost:8000/staffLogin.php",
      data: { emailAddress: formValues.emailAddress } ,
      dataType: "json",
      
      success: function(response) {
        console.log(response);
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

  let history = useNavigate();

  return (
    <div>
      <Header />
      <Main>
        <BackLink onClick={() => history(-1)}>
          Back
        </BackLink>
        <FormGroup>
          <div className="login-heading">
            <H2>STAFF</H2>
          </div>
          <p>Enter your email address</p>

          <Fieldset>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
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
export default StaffLoginPage;