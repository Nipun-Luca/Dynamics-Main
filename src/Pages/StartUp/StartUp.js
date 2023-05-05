import "./../../App.css"
import React, { useState } from "react";
import {
    Button,
    H2,
    Main
} from "govuk-react";
import { Link } from "react-router-dom";

import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";


const StartUpPage = (url) => {
    return (
        <div>
            <Header />
                <Main>
                    <H2>Welcome to Dynamics GP Surgery</H2>
                    <b color='black'>Book, cancel or change a coronavirus (COVID-19) vaccination appointment </b>
                    <p color='black'>Use this service to:</p>
                    <ul>
                        <li>book for a vaccine</li>
                        <li>Check your existing appointment details</li>
                        <li>change your appointment</li>
                        <li>cancel your appointment</li>
                    </ul>

                    <Link to = "/homepage"><Button>
                        Start Now
                    </Button>
                    </Link>
                </Main>
            <Footer />

        </div>

    );
};

export default StartUpPage;