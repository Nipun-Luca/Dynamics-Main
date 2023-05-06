import React, { useState, useEffect } from 'react';
import { Table, ErrorText, H3, FormGroup, InputField, Fieldset, Button } from 'govuk-react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import { useParams } from 'react-router-dom';

const ViewMedicalRecords = () => {
  
  const { nhsNumber } = useParams();
  const [patients, setPatientRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (nhsNumber) {
      fetchPatientRecords(nhsNumber);
    }
  }, [nhsNumber]);

  const fetchPatientRecords = (NHSNumber) => {
    $.ajax({
      url: 'http://localhost:8000/fetchPatientMedicalRecord.php',
      method: 'POST',
      data: { NHSNumber },
      dataType: 'json',
      success: (response) => {
        if (response.success) {
          setPatientRecords(response.patients);
          setErrorMessage(null);
        } else {
          setErrorMessage(response.message || 'Empty response from the server');
        }
      },
      error: (error) => {
        setErrorMessage('Fetching patient records failed: ' + error.statusText);
      },
    });
  };

  return (
    <>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      {patients.length ? (
        <>
          <Table caption="Patient Medical Records">
          <Table.Row>
            <Table.CellHeader>NHS Number</Table.CellHeader>
            <Table.CellHeader> Dose No </Table.CellHeader>
            <Table.CellHeader>  Doctor Id </Table.CellHeader>
            <Table.CellHeader>Vaccination Date</Table.CellHeader>
            <Table.CellHeader> Disease Targeted</Table.CellHeader>
            <Table.CellHeader> Vaccine Type </Table.CellHeader>
            <Table.CellHeader>Site</Table.CellHeader>
            <Table.CellHeader> Total Series Of Doses </Table.CellHeader>
            <Table.CellHeader>Booster </Table.CellHeader>
          </Table.Row>
          {patients.map((patient, index) => (
            <Table.Row key={index}>
              <Table.Cell>{patient.NHSNumber}</Table.Cell>
              <Table.Cell>{patient.DoseNo}</Table.Cell>
              <Table.Cell>{patient.DoctorId}</Table.Cell>
              <Table.Cell>{patient.VaccinationDate}</Table.Cell>
              <Table.Cell>{patient.DiseaseTargeted}</Table.Cell>
              <Table.Cell>{patient.VaccineType}</Table.Cell>
              <Table.Cell>{patient.Site}</Table.Cell>
              <Table.Cell>{patient.TotalSeriesOfDoses}</Table.Cell>
              <Table.Cell>{patient.Booster}</Table.Cell>
            </Table.Row>
          ))}
          </Table>
          <div className="govuk-grid-column-one-third">
            <Button as={Link} to="/doctor-dashboard/update-medical-records">
              Update Medical Records
            </Button>
          </div>
        </>
      ) : (
        <H3>No patient medical records found</H3>
      )}
      <div className="govuk-grid-column-one-third">
        <Button as={Link} to="/doctor-dashboard/update-medical-records">
          Update Medical Records
        </Button>
      </div>
    </>
  );
};

export default ViewMedicalRecords;
