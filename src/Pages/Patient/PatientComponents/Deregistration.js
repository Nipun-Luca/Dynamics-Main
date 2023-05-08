import React, { useContext, useState } from 'react';
import { Button, Panel, ErrorText, H3, H2, H1, BackLink } from 'govuk-react';
import $ from 'jquery';
import PatientContext from './PatientContext';
import { Link, useNavigate } from 'react-router-dom';

const Deregistration = () => {
  const [error, setError] = useState('');
  const [deregistrationMessage, setDeregistrationMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const { NHSNumber, setNHSNumber } = useContext(PatientContext);
  const navigate = useNavigate();
//Ajax to delete the whoe patient details row using cascade delete 
  const deregisterPatient = () => {
    $.ajax({
      url: 'http://localhost:8000/deregister_patient.php',
      method: 'POST',
      data: {
        'NHSNumber': NHSNumber,
      },
      success: (response) => {
        console.log('Deregistration successful:', response);
        setDeregistrationMessage('Patient details have been removed successfully.');
      },
      error: (error) => {
        console.error('Deregistration failed:', error);
        setError('Unable to remove patient details.');
      },
    });
  };

  const handleConfirmation = () => {
    deregisterPatient();
  };

  const logoutAfterDeregistration = () => {
    setNHSNumber(null);
    setIsAuthenticated(false);
    navigate('/homepage');
  };
//Confirmation message and logout with isAutenticated condition
  return (
    <div>
      {!deregistrationMessage && (
        <>
        <BackLink as={Link} to="/patientdashboard">
          Back
        </BackLink>
        <H2></H2>
          <H1></H1>
          <H3>Are you sure you want to remove your patient details from this GP Surgery?</H3>
          <H2></H2>
          <H1></H1>
          <Button onClick={handleConfirmation}>Yes, remove my details</Button>
          <H2></H2>
          <H1></H1>
          
          {error && <ErrorText>{error}</ErrorText>}
        </>
      )}

      {deregistrationMessage && isAuthenticated && (
        <>
          <Panel title="Deregistration Confirmed">
            <p>{deregistrationMessage}</p>
          </Panel>
          <Link to="/homepage">
            <Button onClick={logoutAfterDeregistration}>Home</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Deregistration;
