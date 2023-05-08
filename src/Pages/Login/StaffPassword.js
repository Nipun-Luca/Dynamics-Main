//----------------------
////Author: w1820984
//----------------------

import React, { useState, useContext, useEffect  } from "react";
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
import DoctorContext from '.././Doctor/DrComponents/DoctorContext';
import Header from '../../Components/DefaultHeader';
import Footer from '../../Components/Footer';

const StaffLoginPage = ({ userType }) => {
  const navigate = useNavigate();
  // Receive NHS number and email from previous page
  const location = useLocation();
  const emailAddress = location.state?.emailAddress;
  const role = location.state?.role;

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const [loginAttempts, setLoginAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState("")
  const { setDoctorId } = useContext(DoctorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.password.trim()) {
      setErrorMessage("Please fill the required information");
      return;
    }

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
        if (response.success) {
          //Set isAuthenticated flag in localStorage
          localStorage.setItem("isAuthenticated", "true");

          if (role === "doctor") {
            setDoctorId(response.id);
            navigate("/doctor-dashboard", { state: { id: response.id } });
          } else if (role === "receptionist") {
            navigate("/receptionistDashboard", { state: { id: response.id } });
          }
        } else {
          setErrorMessage("Wrong password");
          setLoginAttempts(loginAttempts + 1);
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

  useEffect(() => {
    //prevent from accessing this page through url
    if (!emailAddress) {
      navigate("/homepage");
    }
    //after five wrong password enters, deny login for user
    if (loginAttempts >= 5) {
      navigate("/loginDenied");
    }
  }, [loginAttempts, emailAddress, navigate]);

  return (
    <div>
      <Header />  
      <Main>
        <BackLink onClick={() => navigate(-1)}> Back </BackLink>

        <FormGroup>
          <div className='login-heading'>
            <H2>STAFF</H2>
          </div>

          <p>Enter your password</p>

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

            <Button onClick={handleSubmit}>Enter</Button>
          </Fieldset>
        </FormGroup>
      </Main>
      <Footer />
    </div>
  );
};

export default StaffLoginPage;