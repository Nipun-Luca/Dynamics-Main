import React, { useState, useEffect } from "react";
import {
  H2,
  Main,
  BackLink
} from "govuk-react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";
import $ from "jquery";

const ViewDoctorList = () => {
  const [doctorNames, setDoctorNames] = useState([]);
  let history = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      $.ajax({
        type: "POST",
        url: "http://localhost:8000/view_doctor_list.php",
        dataType: "json",
        success: (data) => {
          setDoctorNames(data);
        },
        error: (error) => {
          console.error(error);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Main>
      <BackLink onClick={() => history(-1)}> Back </BackLink>

        <H2>View Doctor List</H2>
        <b color='black'>Select the doctor for which you want to view and edit their appointments</b>
        <ul>
          {doctorNames.map((doctorName, index) => (
            <li key={index}>{doctorName}</li>
          ))}
        </ul>
      </Main>
      <Footer />
    </div>
  );
};

export default ViewDoctorList;
