import React, { useState, useContext, useEffect } from 'react';
import { FormGroup, Select, Button, H2, ErrorText } from 'govuk-react';
import $ from 'jquery';
import { useLocation } from 'react-router-dom';
import DoctorContext from './DoctorContext';

const UpdateMedicalRecordComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');

  // Add state variables for each field
  const [doseNumber, setDoseNumber] = useState('');
  const [vaccineManufacturer, setVaccineManufacturer] = useState('');
  const [vaccineType, setVaccineType] = useState('');
  const [product, setProduct] = useState('');
  const [vaccineBatchNumber, setVaccineBatchNumber] = useState('');
  const [totalSeriesOfDosesOptions , setTotalSeriesOfDoses] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [snomedCode, setSnomedCode] = useState('');
  const [dateEnteredDay, setDateEnteredDay] = useState('');
  const [dateEnteredMonth, setDateEnteredMonth] = useState('');
  const [dateEnteredYear, setDateEnteredYear] = useState('');
  const [booster, setBooster] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { DoctorId } = useContext(DoctorContext);
  const [nhsNumber, setNhsNumber] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.nhsNumber) {
      setNhsNumber(location.state.nhsNumber);
    }
  }, [location]);

  const formValues = {
    DoseNumber: doseNumber,
    VaccineManufacturer: vaccineManufacturer,
    VaccineType: vaccineType,
    Product: product,
    VaccineBatchNumber: vaccineBatchNumber,
    TotalSeriesOfDoses: totalSeriesOfDosesOptions,
    DisplayName: displayName,
    SnomedCode: snomedCode,
    DateEnteredDay: dateEnteredDay,
    DateEnteredMonth: dateEnteredMonth,
    DateEnteredYear: dateEnteredYear,
    Booster: booster,
  };

  const updatePatientRecords = () => {
    // Check if all fields are filled
    for (const key in formValues) {
      if (formValues[key] === '') {
          setErrorMessage('Please fill all fields');
        return;
      }
    }

    const dateEntered = `${formValues.DateEnteredYear}-${formValues.DateEnteredMonth}-${formValues.DateEnteredDay}`;

    $.ajax({
      url: 'http://localhost:8000/update_patient_medical_record.php',
      method: 'POST',
      data: { ...formValues, NHSNumber: nhsNumber, DoctorId, dateEntered },
      dataType: 'json',
      success: (response) => {
        if (response.success) {
          setSuccess(true);
          setErrorMessage(null);
        } else {
          setErrorMessage(response.message || 'Error updating patient medical record');
        }
      },
      error: (error) => {
          setErrorMessage('Updating patient medical record failed: ' + error.statusText);
      },
    });
  };

          // const createSelectOptions = (options) => {
          //           return options.map((option) => (
          //           <option key={option.value} value={option.value}>
          //           {option.label}
          //           </option>
          //           ));
          // };

//         const createDayOptions = () => {
//           const days = [];
//           for (let i = 1; i <= 31; i++) {
//             days.push({ label: i, value: i });
//           }
//           return createSelectOptions(days);
//         };
      
//         const createMonthOptions = () => {
//           const months = [];
//           for (let i = 1; i <= 12; i++) {
//             months.push({ label: i, value: i });
//           }
//           return createSelectOptions(months);
//         };
      
//         const createYearOptions = (start, end) => {
//           const years = [];
//           for (let i = start; i <= end; i++) {
//             years.push({ label: i, value: i });
//           }
//           return createSelectOptions(years);
//         }; 
        
        const vaccineManufacturers = [
          {
            label: '(AstraZeneca AB, ORG-100001699)',
            value: '(AstraZeneca AB, ORG-100001699)',
          },
          {
            label: '(Janssen-Cilag International, ORG-100001417)',
            value: '(Janssen-Cilag International, ORG-100001417)',
        },
        {
        label: '(Moderna Biotech Spain S.L., ORG-100031184)',
        value: '(Moderna Biotech Spain S.L., ORG-100031184)',
        },
        {
        label: '(Biontech Manufacturing GmbH, ORG-100030215)',
        value: '(Biontech Manufacturing GmbH, ORG-100030215)',
        },
        {
        label: '(Novavax CZ a.s., ORG-100032020)',
        value: '(Novavax CZ a.s., ORG-100032020)',
        },
        ];
        
        const vaccineTypes = [
        { label: '(AstraZeneca, 39115011000001105)', value: '(AstraZeneca, 39115011000001105)' },
        { label: '(Janssen, 39230211000001104)', value: '(Janssen, 39230211000001104)' },
        { label: '(SpikevaxBivalent, 40801911000001102)', value: '(SpikevaxBivalent, 40801911000001102)' },
        { label: '(Pfizer, 39115711000001107)', value: '(Pfizer, 39115711000001107)' },
        { label: '(Novavax, 39473011000001103)', value: '(Novavax, 39473011000001103)' },
        ];
        
        const products = [
        { label: '(Vaxzevria, EU/1/21/1529)', value: '(Vaxzevria, EU/1/21/1529)' },
        { label: '(Jcovden, EU/1/20/1525)', value: '(Jcovden, EU/1/20/1525)' },
        { label: '(Spikevax, EU/1/20/1507)', value: '(Spikevax, EU/1/20/1507)' },
        { label: '(Comirnaty, EU/1/20/1528)', value: '(Comirnaty, EU/1/20/1528)' },
        { label: '(Nuvaxovid, EU/1/21/1618)', value: '(Nuvaxovid, EU/1/21/1618)' },
        ];
        
        const vaccineBatchNumbers = [
        { label: '346753P1', value: '346753P1' },
        { label: '347442P', value: '347442P' },
        { label: 'XE393', value: 'XE393' },
        { label: '202A21A', value: '202A21A' },
        { label: '039K20A', value: '039K20A' },
        ];
        
        const totalSeriesOfDoses = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        ];
        
        const displayNames = [
        { label: 'COVID-19 Vaccine AstraZeneca', value: 'COVID-19 Vaccine AstraZeneca' },
        { label: 'COVID-19 Vaccine Janssen', value: 'COVID-19 Vaccine Janssen' },
        { label: 'COVID-19 Vaccine Moderna', value: 'COVID-19 Vaccine Moderna' },
        { label: 'Pfizer/BioNTech COVID-19 vaccine', value: 'Pfizer/BioNTech COVID-19 vaccine' },
        { label: 'COVID-19 Vaccine Novavax', value: 'COVID-19 Vaccine Novavax' },
];

const snomedCodes = [
{ label: '39114900000000000', value: '39114900000000000' },
{ label: '39233900000000000', value: '39233900000000000' },
{ label: '39326800000000000', value: '39326800000000000' },
{ label: '39116100000000000', value: '39116100000000000' },
{ label: '999001000000000000', value: '999001000000000000' },
];

const boosters = [
{ label: '0', value: '0' },
{ label: '1', value: '1' },
];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 4 }, (_, i) => 2023 + i);




  const doseNumbers = Array.from({ length: 10 }, (_, i) => ({ label: i + 1, value: i + 1 }));

  const renderSelectOptions = (options) => {
          if (Array.isArray(options)) {
            return options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ));
          } else {
            return options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ));
          }
        };
        
return (
  <div>
    <H2>Update Patient Medical Record</H2>
    {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    {success && <p>Successfully updated patient medical record</p>}
    <FormGroup>
      <label htmlFor="doseNumber">Dose Number</label>
      <Select
        id="doseNumber"
        name="doseNumber"
        value={doseNumber}
        onChange={(e) => setDoseNumber(e.target.value)}
      >
        <option value="">Select dose number</option>
        {renderSelectOptions(doseNumbers)}
      </Select>
    </FormGroup>
    <FormGroup>
          <Select
            label="Vaccine Manufacturer"
            value={vaccineManufacturer}
            onChange={(e) => setVaccineManufacturer(e.target.value)}
            required
          >
            <option value="">Choose Vaccine Manufacturer</option>
            {renderSelectOptions(vaccineManufacturers)}
          </Select>
        </FormGroup>
  
        <FormGroup>
          <Select
            label="Vaccine Type"
            value={vaccineType}
            onChange={(e) => setVaccineType(e.target.value)}
            required
          >
            <option value="">Choose Vaccine Type</option>
            {renderSelectOptions(vaccineTypes)}
          </Select>
        </FormGroup>
  
        <FormGroup>
          <Select
            label="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          >
            <option value="">Choose Product</option>
            {renderSelectOptions(products)}
          </Select>
        </FormGroup>
  
        <FormGroup>
          <Select
            label="Vaccine Batch Number"
            value={vaccineBatchNumber}
            onChange={(e) => setVaccineBatchNumber(e.target.value)}
            required
            >
            <option value="">Choose Vaccine Batch Number</option>
            {renderSelectOptions(vaccineBatchNumbers)}
            </Select>
          </FormGroup>
  
          <FormGroup>
          <Select
          label="Total Series Of Doses"
          value={totalSeriesOfDoses}
          onChange={(e) => setTotalSeriesOfDoses(e.target.value)}
          required
          >
          <option value="">Choose Total Series Of Doses</option>
          {renderSelectOptions(totalSeriesOfDoses)}
          </Select>
          </FormGroup>

          <FormGroup>
          <Select
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          >
          <option value="">Choose Display Name</option>
          {renderSelectOptions(displayNames)}
          </Select>
          </FormGroup>

          <FormGroup>
          <Select
          label="Snomed Code"
          value={snomedCode}
          onChange={(e) => setSnomedCode(e.target.value)}
          required
          >
          <option value="">Choose Snomed Code</option>
          {renderSelectOptions(snomedCodes)}
          </Select>
          </FormGroup>

          <FormGroup>
          <Select
          label="Date Entered - Day"
          value={dateEnteredDay}
          onChange={(e) => setDateEnteredDay(e.target.value)}
          required
          >
          <option value="">Choose Day</option>
          {renderSelectOptions(days)}
          </Select>
          </FormGroup>

          <FormGroup>
          <Select
          label="Date Entered - Month"
          value={dateEnteredMonth}
          onChange={(e) => setDateEnteredMonth(e.target.value)}
          required
          >
          <option value="">Choose Month</option>
          {renderSelectOptions(months)}
          </Select>
          </FormGroup>

          <FormGroup>
          <Select
          label="Date Entered - Year"
          value={dateEnteredYear}
          onChange={(e) => setDateEnteredYear(e.target.value)}
          required
          >
          <option value="">Choose Year</option>
          {renderSelectOptions(years)}
          </Select>
          </FormGroup>
    
          <FormGroup>
          <label htmlFor="booster">Booster</label>
          <Select
          id="booster"
          name="booster"
          value={booster}
          onChange={(e) => setBooster(e.target.value)}
          >
          <option value="">Select booster</option>
          {renderSelectOptions(boosters)}
          {/* <option value="yes">Yes</option>
          <option value="no">No</option> */}
          </Select>
          </FormGroup>
    <Button onClick={updatePatientRecords}>Update Patient Medical Record</Button>
  </div>
);
};

export default UpdateMedicalRecordComponent;
