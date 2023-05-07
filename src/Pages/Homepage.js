//----------------------
////Author: w1820984
//----------------------

import "./../App.css"
import React from "react";
import {
  Button,
  Main,
  H2,
  BackLink
} from "govuk-react";
import { useNavigate, Link } from "react-router-dom";

import Header from '../Components/DefaultHeader';
import Footer from '../Components/Footer';

function Homepage() {
    let navigate = useNavigate();

    return (
        <div>
        <Header />

        <Main>
            <BackLink onClick={() => navigate(-1)}> Back </BackLink>

            <div className="container">
                <div className="box">
                <H2>Register</H2>
                <Link to="/registerNHSnumber">
                    <Button>Enter</Button>
                </Link>
                </div>

                <div className="box">
                <H2>Log In</H2>
                <Link to="/patientLogIn">
                    <Button>Enter</Button>
                </Link>
                </div>
                
                <div className="box">
                <H2>Staff</H2>
                <Link to="/staffLogIn">
                    <Button>Enter</Button>
                </Link>
                </div>
            </div>
        </Main>

        <Footer />
        </div>
    );
    }

    export default Homepage;