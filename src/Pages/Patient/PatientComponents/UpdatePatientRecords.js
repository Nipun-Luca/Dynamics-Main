import React, { useState } from 'react';
import { FormGroup, Select, InputField, Button, H3, ErrorText } from 'govuk-react';
import $ from 'jquery';

const UpdatePatientRecords = () => {
  const [updateField, setUpdateField] = useState('');
  const [updateValue, setUpdateValue] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const NHSNumber = '92233359811';

  const updatePatientRecords = () => {
    if (updateField.trim() === '' || updateValue.trim() === '') {
      setError('Please choose a field and provide a new value');
      return;
    }

    $.ajax({
      url: 'http://localhost:8000/update_patient_records.php',
      method: 'POST',
      data: { NHSNumber, updateField, updateValue },
      dataType: 'json',
      success: (response) => {
        if (response.success) {
          setSuccess(true);
          setError(null);
        } else {
          setError(response.message || 'Error updating patient records');
        }
      },
      error: (error) => {
        setError('Updating patient records failed: ' + error.statusText);
      },
    });
  };

  const renderUpdateField = () => {
    switch (updateField) {
      case 'Postcode':
        return (
          <InputField
            label="Postcode"
            hint="Enter the new postcode"
            name="Postcode"
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
            required
          />
        );
      case 'Email':
        return (
          <InputField
            label="Email"
            hint="Enter the new email address"
            name="Email"
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
            required
          />
        );
      case 'Password':
        return (
          <InputField
            label="Password"
            hint="Enter the new password"
            name="Password"
            type="password"
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {success ? (
        <H3>Patient records updated successfully</H3>
      ) : (
        <>
          <FormGroup>
            <Select
              label="Select the field to update"
              value={updateField}
              onChange={(e) => setUpdateField(e.target.value)}
              required
            >
              <option value="">Choose a field</option>
              <option value="Postcode">Postcode</option>
              <option value="Email">Email</option>
              <option value="Password">Password</option>
            </Select>
          </FormGroup>
          <h3></h3>
          {renderUpdateField()}
          <h3></h3>
          {updateField && (
            <Button onClick={updatePatientRecords}>Submit</Button>
          )}
        </>
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};

export default UpdatePatientRecords;
