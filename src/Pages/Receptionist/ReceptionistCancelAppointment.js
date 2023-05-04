import React from 'react';
import { button, Main, H1, BackLink} from 'govuk-react';
import { Link } from 'react-router-dom';
import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";
import CancelAppointment from './CancelAppointment';

function ReceptionistCancelAppointment() {
    return (
        <div>
        <Header/>
        < Main>
        <H1>Cancel Appointment</H1>


        <div classname="govuk-width-container">


            <div classname="govuk-grid-row">

            <ReceptionistCancelAppointment />
            <BackLink as={Link} to="/receptionistdashboard">
                Back
            </BackLink>
            </div>

        </div>
        </Main>

    <Footer/>
        </div>
    )
}

export default ReceptionistCancelAppointment