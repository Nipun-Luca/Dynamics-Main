import React, { useState, useContext } from 'react';
import { Table, ErrorText, H3, FormGroup, InputField, Fieldset, Button } from 'govuk-react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import DoctorContext from './DoctorContext';

const ViewMedicalRecords = () => {
  const [patients, setPatientRecords] = useState([]);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
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
          setErrorMessage(response.message);
        } else {
          //setErrorMessage("Wrong password");
          setErrorMessage(response.message || 'Empty response from the server');
          //setError(response.message || 'Empty response from the server');
        }
      },
      error: (error) => {
        //setError('Fetching patient records failed: ' + error.statusText);
        setErrorMessage('Fetching patient records failed: ' + error.statusText);
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
      <Fieldset>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      {errorMessage === "New patient, please update the patient medical record." && (
            <div className="govuk-grid-column-one-third">
              {/* <Button as={Link} to="/doctor-dashboard/update-medical-records">
                Update Medical Records
              </Button> */}
              <Button
              as={Link}
              to={{
              pathname: '/doctor-dashboard/update-medical-records',
              state: { nhsNumber: nhsNumberInput },
              }}
              >
              Update Medical Records
            </Button>
            </div>
          )}
        
        <form onSubmit={handleSearch}>
        <b>Enter Patient NHS number</b>
          <InputField
            name="nhsNumber"
            value={nhsNumberInput}
            required
            onChange={(e) => setNhsNumberInput(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>
      </Fieldset>
      </FormGroup>
    

      { patients.length ? (
          <>
        <Table caption="Patient Medical Records">
         <Table.Row>
            <Table.CellHeader>NHS Number</Table.CellHeader>
            <Table.CellHeader> Dose No </Table.CellHeader>
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
            {/* <Button as={Link} to='/doctor-dashboard/update-medical-records'>Update Medical Records</Button> */}
            <Button
              as={Link}
              to={{
              pathname: '/doctor-dashboard/update-medical-records',
              state: { nhsNumber: nhsNumberInput },
              }}
              >
              Update Medical Records
            </Button>

          </div>
        </>
        // : searched ? ( 
        //   <H3>No patient medical records found</H3>
        // )

      ): null}
    </>
   
          
  );
};

export default ViewMedicalRecords;
