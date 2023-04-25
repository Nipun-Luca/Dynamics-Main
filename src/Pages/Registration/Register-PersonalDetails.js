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

  const handleSubmit = (e) => {
    e.preventDefault();

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
        console.log(data.success)
        if (data.success) {
          // Patient record exists in central database
          navigate("/registerEmail", { state: { nhsNumber: data.nhsNumber } });
        } else {
          // Patient record does not exist in central database
          alert("Patient record does not exist in central database");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
        // Handle the error here
        alert("Wrong details")
      },
    });
  };


  const history = useNavigate();

  return (
    <div>
      <Header />
      <Main>
        <BackLink onClick={() => history(-1)}>Back</BackLink>

        <FormGroup>
          <H2>Register with your name, surname and postcode</H2>
          <p>If you prefer registering with the NHS number, select the link below.</p>

          <Fieldset>
            <b>Name</b>
            <InputField
              label="Enter name"
              name="name"
              value={formValues.name}
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
              required
            />

            <b>Surname</b>
            <InputField
              label="Enter Surname"
              name="surname"
              value={formValues.surname}
              onChange={(e) =>
                setFormValues({ ...formValues, surname: e.target.value })
              }
              required
            />

            <b>Postcode</b>
            <InputField
              label="Enter Postcode"
              name="postcode"
              value={formValues.postcode}
              onChange={(e) =>
                setFormValues({ ...formValues, postcode: e.target.value })
              }
              required
            />

            <Button type="submit" onClick={handleSubmit}>Enter</Button>
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