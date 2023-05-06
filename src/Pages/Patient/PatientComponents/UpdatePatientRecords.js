import React, { useState, useContext } from 'react';
import { FormGroup, Select, InputField, Button, H3, H2, H1, ErrorText } from 'govuk-react';
import $ from 'jquery';
import PatientContext from '.././PatientComponents/PatientContext';

const UpdatePatientRecords = () => {
  const [updateField, setUpdateField] = useState('');
  const [updateValue, setUpdateValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { NHSNumber } = useContext(PatientContext);

  const updatePatientRecords = () => {
    if (updateField.trim() === '' || updateValue.trim() === '') {
      setError('Please choose a field and provide a new value');
      return;
    }

    // Check for email format
    if (updateField === 'Email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateValue)) {
        setError('Please enter a valid email address');
        return;
      }
    }

    if (updateField === 'Password') {
      if (updateValue.length < 8) {
        setError('Password must have at least 8 characters');
        return;
      }
      if (updateValue !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
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
          <>
            <InputField
              label="Password"
              hint="Enter the new password"
              name="Password"
              type="password"
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
              required
            />
            <InputField
              label="Confirm Password"
              hint="Confirm the new password"
              name="ConfirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {success ? (
        <H2>Patient records updated successfully</H2>
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
          <H1></H1>
      <H2></H2>
      <H3></H3>
          <H1></H1>
          {renderUpdateField()}
          <H1></H1>
          <H1></H1>
      <H2></H2>
      <H3></H3>
          {updateField && (
            <Button onClick={updatePatientRecords}>Submit</Button>
          )}
          <H1></H1>
      <H2></H2>
      <H3></H3>
        </>
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};

export default UpdatePatientRecords;

