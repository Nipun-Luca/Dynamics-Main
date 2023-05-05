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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import $ from "jquery"; // import jQuery

import Header from '../../Components/DefaultHeader';
import Footer from '../../Components/Footer';

function RegistrationPage(){
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    nhsNumber: "",
  });

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nhsNumber', formValues.nhsNumber);
  
    $.ajax({
      type: "POST",
      url: "http://localhost:8000/checkNhsNo.php",
      data: formData,
      dataType: "text",
      contentType: false,
      processData: false,
      success: function(data) {
        if (data === "This NHS number is already registered to our local database") {
          setErrorMessage(data);
        } else if (data !== "NHSNumber does not exist in central database") {
          console.log(data);
          navigate("/registerEmail", { state: { nhsNumber: data } });
        } else {
          setErrorMessage(data);
        }
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
          <H2>Register with your NHS number</H2>
          <p>Your NHS number is a 11 digit number, like 94627888551.</p>
          <p>If you don’t know your NHS number you can select the link below to alternatively register using personal information</p>

            <Fieldset>
              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
              <b>Enter NHS number</b>
              <InputField
                label="Enter NHS number"
                name="nhsNumber"
                value={formValues.nhsNumber}
                required
                onChange={(e) => setFormValues({ ...formValues, nhsNumber: e.target.value })}
              />
              
              <Button type="submit" onClick={handleSubmit}>Enter</Button> 
            </Fieldset>
        </FormGroup>
          <Link to="/registerPersonalDetails" style={{ position: "relative"}}>
          Register with personal info
          </Link>
      </Main>

      <Footer />      
    </div>
  );
};

export default RegistrationPage;