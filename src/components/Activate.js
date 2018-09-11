import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Activate = () => {
    return (
        <div>
            <Header/>
            <div style={{clear: "both"}}>
                <h1 className="sign">CREATE YOUR ACCOUNT</h1>
            </div>
            <div id="content">
                <p>Thank you for creating your account.</p>
                <h2>Please check your email for confirmation letter</h2>
                <p>Be sure to check your spam box if it does not arrive within a few minutes</p>
            </div>

        </div>
    )
};

export default Activate;
