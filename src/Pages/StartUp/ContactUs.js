//----------------------
////Author: w1822557
//----------------------

import React, { useState } from "react";
import {
    H2,
    BackLink,
    Main
} from "govuk-react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";


function StartUpPage() {
    let history = useNavigate();

    return (
        <div>
            <Header />
                <Main>
                    <BackLink onClick={() => history(-1)}> Back </BackLink>

                    <H2>CONTACT US</H2>

                    <p color='black'>For any queries about our website, to get medical help, or any other queries, please contact us using the phone number or email address provided below</p>

                    <ul>
                        <li>Phone: +44 7283 359761</li>
                        <li>Email: dynamics@westminster.ac.uk</li>

                    </ul>
                </Main>
            <Footer />
        </div>
    );
};

export default StartUpPage;