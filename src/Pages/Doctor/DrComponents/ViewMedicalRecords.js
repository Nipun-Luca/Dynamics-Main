
/****Author- w1785478 *****/
import React, { useState, useContext } from 'react';
import { Table, ErrorText, FormGroup, InputField, Fieldset, Button } from 'govuk-react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import DoctorContext from './DoctorContext';


//This is a React functional component called ViewMedicalRecords. The purpose of this component is to allow doctors to search for a patient's medical records using their NHS number and then view the records in a table format. Additionally, the component provides an option to update the medical records.
const ViewMedicalRecords = () => {
  
  //React hooks to manage state
  const [patients, setPatientRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const [nhsNumberInput, setNhsNumberInput] = useState('');
  const [searched, setSearched] = useState(false);
  const { DoctorId } = useContext(DoctorContext);

  
  //The fetchPatientMedicalRecords function is called when the user submits the form to search for a patient's medical records. It makes an AJAX request to the server to fetch the patient's medical records using their NHS number. If the request is successful, it updates the patients and errorMessage state variables. If there is an error, it updates the errorMessage state variable.
  const fetchPatientMedicalRecords = (NHSNumber) => {
   
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
        
          setErrorMessage(response.message || 'Empty response from the server');
        ;
        }
      },
      error: (error) => {
        
        setErrorMessage('Fetching patient medical records failed: ' + error.statusText);
      },
    });
  };

  //The handleSearch function is called when the user submits the form to search for a patient's medical records. It calls the fetchPatientMedicalRecords function and sets the searched state variable to true.
  const handleSearch = (e) => {
    e.preventDefault();
    fetchPatientMedicalRecords(nhsNumberInput);
    setSearched(true);
  };

  //The handleClick function is called when the user clicks the "Update Medical Records" button. It navigates to the update-medical-records page and passes the nhsNumberInput state variable as a state parameter.
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    navigate('/doctor-dashboard/update-medical-records', { state: { nhsNumberInput: nhsNumberInput } });
  }


  return (
    <>
      <FormGroup>
      <Fieldset>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      {errorMessage === "New patient, please update the patient medical record." && (
            <div className="govuk-grid-column-one-third">
              
            <Button onClick={handleClick} >
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
          
            <Button onClick={handleClick} >
              Update Medical Records
            </Button>

          </div>
        </>

      ): null}
    </>
   
          
  );
};

export default ViewMedicalRecords;
