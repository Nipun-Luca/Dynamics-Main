import React, { useState,useContext  } from "react";
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
import { useNavigate, useLocation,useHistory } from "react-router-dom";
import DoctorContext from '.././Doctor/DrComponents/DoctorContext';
import Header from '../../Components/DefaultHeader';
import Footer from '../../Components/Footer';

const StaffLoginPage = ({ userType }) => {
  const navigate = useNavigate();
  // Receive NHS number and email from previous page
  const location = useLocation();
  const emailAddress = location.state?.emailAddress;
  const role = location.state?.role;
  console.log(emailAddress)

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("")
  const { setDoctorId } = useContext(DoctorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "http://localhost:8000/staffPassword.php",
      data: { 
        password: formValues.password,
        emailAddress: emailAddress,
        role: role,
      } ,
      dataType: "json",
      
      success: function(response) {
        console.log(response);
        if (response.success) {
          // Set isAuthenticated flag in localStorage
          localStorage.setItem("isAuthenticated", "true");

          if (role === "doctor") {
            // On successful sign-in, set the DoctorId in the context
            setDoctorId(response.id);
            navigate("/doctor-dashboard", { state: { id: response.id } });
          } else if (role === "receptionist") {
            navigate("/receptionistDashboard", { state: { id: response.id } });
          }
        } else {
          setErrorMessage("Wrong password");
        }
      },
      error: function(xhr, status, error) {
        console.error(xhr);
        console.error(status);
        console.error(error);
        setErrorMessage("Error while checking password, please try again later");
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
          <div className='login-heading'>
            <H2>STAFF</H2>
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
              type="password"
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