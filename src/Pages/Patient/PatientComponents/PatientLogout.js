import React from 'react';
import { Button, Main,H1} from 'govuk-react';
import { Link } from 'react-router-dom';
import PatientHeader from './PatientHeader';
import Footer from '../../../Components/Footer';

function Logout(props) {
  const handleLogout = () => {
    // Clear the user's session data and redirect to the login page
    props.history.push('/login');
  };

  return (
    <div>
       <PatientHeader/>
    < Main>
      <h1>Logout</h1>
      
   
    <H1>Logout</H1>
   
    <button onClick={handleLogout}>Logout</button>
    
    <div className="govuk-width-container">
      
    
      <div  className="govuk-grid-row">

      </div>
      
    </div>
    </Main>
  <Footer/>
    </div>
  );
}

export default Logout;
