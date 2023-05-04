import React, { useState, useEffect, useContext } from 'react';
import { Table, ErrorText, H3, FormGroup, InputField, Button } from 'govuk-react';
import $ from 'jquery';

import DoctorContext from './DoctorContext';

const ViewMedicalRecords = () => {
  const [patients, setPatientRecords] = useState([]);
  const [error, setError] = useState(null);
  const [nhsNumberInput, setNhsNumberInput] = useState('');
  const { DoctorId } = useContext(DoctorContext);

  const fetchPatientRecords = (NHSNumber) => {
    $.ajax({
      url: 'http://localhost:8000/fetchPatientMedicalRecords.php',
      method: 'POST',
      data: { NHSNumber, DoctorId },
      dataType: 'json',
      success: (response) => {
        console.log(response);
        try {
          if (response.patients) {
            setPatientRecords(response.patients);
            setError(null);
          } else {
            setError(response.message || 'Empty response from the server');
          }
        } catch (error) {
          setError('No patient Record found');
        }
      },
      error: (error) => {
        setError('Fetching patients Records failed: ' + error.statusText);
      },
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPatientRecords(nhsNumberInput);
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
      ) : (
        <H3>No patient records found</H3>
      )}
    </>
  );
};

export default ViewMedicalRecords;
