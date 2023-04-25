import React from "react";
import {
    Button,
    Main,
    H2,
    BackLink
} from "govuk-react";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Header from '../../Components/DefaultHeader';
import Footer from '../../Components/Footer';



function Dashboard() {
    //RECEPTIONIST ID NUMBER
    const location = useLocation();
    const receptionistId = location.state?.id;
    console.log(receptionistId)

    let history = useNavigate();

    return (
        <div>
            <Header />

            <Main>
                <BackLink onClick={() => history(-1)}>
                    Back
                </BackLink>

                <div className="box">
                    <H2>Receptionist Dashboard</H2>
                    <Link to="/ViewDoctorList">
                        <Button>View Doctor List</Button>
                    </Link>
                </div>

            </Main>

            <Footer />
        </div>
    );
}

export default Dashboard;