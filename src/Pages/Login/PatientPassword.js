//----------------------
////Author: w1820984
//----------------------

import { useState, useContext, useEffect } from "react";
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
import PatientContext from '.././Patient/PatientComponents/PatientContext'; //Import PatientContext

import Header from '../../Components/DefaultHeader';
import Footer from '../../Components/Footer';


const LoginPage = () => {
  const navigate = useNavigate();
  //Receive NHS number and email from previous page
  const location = useLocation();
  const emailAddress = location.state?.emailAddress;

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { setNHSNumber } = useContext(PatientContext); //needs match with nhsNumber

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.password.trim()) {
      setErrorMessage("Please fill the required information");
      return;
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:8000/patientPasswordCheck.php",
      data: {
        password: formValues.password,
        emailAddress: emailAddress
      },
      dataType: "json",

      success: function (response) {
        if (response.success) {
          setNHSNumber(response.NHSNumber); //Set the nhsNumber in the PatientContext
          localStorage.setItem("isAuthenticated", "true");
          navigate("/patientdashboard", { state: { NHSNumber: response.NHSNumber } });
        } else {
          setErrorMessage("Wrong password");
          setLoginAttempts(loginAttempts + 1);
        }
      },
      error: function (xhr, status, error) {
        console.error(xhr);
        console.error(status);
        console.error(error);
        setErrorMessage("Error checking password, please try again later");
      }
    });
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
          <div className="login-heading">
            <H2>PATIENT</H2>
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

            <Button onClick={handleSubmit}> Enter </Button>
          </Fieldset>
        </FormGroup>
      </Main>
      <Footer />
    </div>
  );
};

export default LoginPage;
