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
import $ from "jquery";

import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";

function RegistrationPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    postcode: "",
  });

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.name.trim() && !formValues.surname.trim() && !formValues.postcode.trim()) {
      setErrorMessage("Please fill the required information");
      return;
    }

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("surname", formValues.surname);
    formData.append("postcode", formValues.postcode);

    $.ajax({
      url: "http://localhost:8000/checkPersonalDetails.php",
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
      success: function (data) {
        if (data.success) {
          //Patient record exists in central database
          navigate("/registerEmail", { state: { nhsNumber: data.nhsNumber } });
        } else {
          //Patient record does not exist in central database
          setErrorMessage("Not found, make sure to enter the details correctly");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        setErrorMessage("Something went wrong")
      },
    });
  };

  return (
    <div>
      <Header />
      <Main>
        <BackLink onClick={() => navigate(-1)}>Back</BackLink>

        <FormGroup>
          <H2>Register with your name, surname and postcode</H2>
          <p>If you prefer registering with the NHS number, select the link below.</p>

          <Fieldset>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <b>Name</b>
            <InputField
              name="name"
              value={formValues.name}
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
              required
            />

            <b>Surname</b>
            <InputField
              name="surname"
              value={formValues.surname}
              onChange={(e) =>
                setFormValues({ ...formValues, surname: e.target.value })
              }
              required
            />

            <b>Postcode</b>
            <InputField
              name="postcode"
              value={formValues.postcode}
              onChange={(e) =>
                setFormValues({ ...formValues, postcode: e.target.value })
              }
              required
            />

            <Button onClick={handleSubmit}>Enter</Button>
          </Fieldset>
        </FormGroup>

        <Link to="/registerNHSnumber" style={{ position: "relative" }}>
          Register with NHS number
        </Link>
      </Main>

      <Footer />
    </div>
  );
};

export default RegistrationPage;