import React, { useState, useContext } from 'react';
import { Table, ErrorText, H3, FormGroup, InputField, Button } from 'govuk-react';
import $ from 'jquery';

import DoctorContext from './DoctorContext';

const ViewMedicalRecords = () => {
  const [patients, setPatientRecords] = useState([]);
  const [error, setError] = useState(null);
  const [nhsNumberInput, setNhsNumberInput] = useState('');
  const [searched, setSearched] = useState(false);
  const { DoctorId } = useContext(DoctorContext);

  const fetchPatientRecords = (NHSNumber) => {
    $.ajax({
      url: 'http://localhost:8000/fetchPatientMedicalRecord.php',
      method: 'POST',
      data: { NHSNumber },
      dataType: 'json',
      success: (response) => {
        if (response.success) {
          setPatientRecords(response.patients);
          setError(response.message);
        } else {
          setError(response.message || 'Empty response from the server');
        }
      },
      error: (error) => {
        setError('Fetching patient records failed: ' + error.statusText);
      },
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPatientRecords(nhsNumberInput);
    setSearched(true);
  };

  return (
    <>
      <FormGroup>
        <form onSubmit={handleSearch}>
          <InputField
            label="Enter patient's NHS number"
            name="nhsNumber"
            value={nhsNumberInput}
            required
            onChange={(e) => setNhsNumberInput(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>
      </FormGroup>

      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : patients.length ? (
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
        
      ) : searched ? ( 
      <H3>No patient medical records found</H3>
    ) : null}
    </>
  );
};

export default ViewMedicalRecords;
