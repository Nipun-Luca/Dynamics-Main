//----------------------
////Author: w1822557
//----------------------

import React, { useState } from "react";
import {
    BackLink,
    H2,
    Main
} from "govuk-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";

const StartUpPage = () => {
    const [formValues, setFormValues] = useState({
        email: "",

    });

    let history = useNavigate();
    return (
        <div>
            <Header />
                <Main>
                    <BackLink onClick={() => history(-1)}> Back </BackLink>
                    <H2>TERMS OF USE</H2>
                    <ul>
                        <li>1. Patient must have an NHS Number to register for vaccination</li>
                        <li>2. Patient must enter valid first name and surname and valid post code to be able to register</li>
                        <li>3. Patients can't have another vaccine dose if he or she has been given a vaccine within the last 8 weeks</li>
                        <li>4. Always wear a face mask when visiting the surgery</li>
                        <li>5. Unacceptable behaviour towards the staff shall not be tolerated when using the Gp surgery</li>

                    </ul>
                </Main>
            <Footer />
        </div>
    );

};

export default StartUpPage;