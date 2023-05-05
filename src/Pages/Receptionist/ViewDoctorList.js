import React, { useState, useEffect } from "react";
import {
  H2,
  Main,
  BackLink
} from "govuk-react";
import { useNavigate } from "react-router-dom";
import Header from "./ReceptionistHeader";
import Footer from "../../Components/Footer";
import $ from "jquery";

const ViewDoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      $.ajax({
        type: "POST",
        url: "http://localhost:8000/view_doctor_list.php",
        dataType: "json",
        success: (data) => {
          setDoctors(data);
        },
        error: (error) => {
          console.error(error);
        }
      });
    };

    fetchData();
  }, []);

  const handleDoctorClick = (doctorId) => {
    navigate("/receptionistdashboard/receptionist-cancel-appointment", { state: { doctorId } });
  };

  return (
    <div>
      <Header />
      <Main>
        <BackLink onClick={() => navigate(-1)}> Back </BackLink>

        <H2>View Doctor List</H2>
        <b color='black'>Select the doctor for which you want to view and edit their appointments</b>
        <ul>
          {doctors.map((doctor, index) => (
            <li key={index} onClick={() => handleDoctorClick(doctor.doctorId)}>{doctor.doctorName}</li>
          ))}
        </ul>
      </Main>
      <Footer />
    </div>
  );
};

export default ViewDoctorList;