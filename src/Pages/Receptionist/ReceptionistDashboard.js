import React from "react";
import {
    Button,
    Main,
    H1,
    BackLink
} from "govuk-react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";


function Dashboard() {
    let history = useNavigate();

    return (
        <div>
            <Header />

            <Main>
            <H1>Receptionist Dashboard</H1>

            <div className="govuk-width-container">

            <BackLink onClick={() => history(-1)}>
                Back
            </BackLink>

            <div className="box">
                
                <Link to="/ViewDoctorList">
                    <Button>View Doctor List</Button>
                </Link>
            </div>
            <div className="govuk-grid-column-one-third">
                <Button as={Link} to='/cancel-appointments'>Cancel Appointments</Button>
            </div>
        </div>

        {/* <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/view-doctor-list' element={<ViewDoctorList/>} />
        <Route path='/cancel-appointment' element={<CancelAppointments/>} />
        <Route path='/logout' element={<Logout/>} />
        </Routes> */}
                

            </Main>

            <Footer />
        </div>
    );
}

export default Dashboard;