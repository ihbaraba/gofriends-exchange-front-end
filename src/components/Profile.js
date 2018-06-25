import React, {Component} from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">WELCOME TO GOFRIENDS EXCHANGE</h1>
                </div>
                <section className="section-form">
                    <div className="sectionBody noborder">
                        <div className="formArea table">
                            <form>
                                <h2>Profile Verification</h2>
                                <div>
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        value=""
                                        name="firstName"
                                        id="firstName"
                                        required
                                    />
                                </div>
                                <br/>
                                <div>
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        value=""
                                        name="lastName"
                                        id="lastName"
                                        required
                                    />
                                </div>
                                <br/>
                                <div>
                                    <label>Street Address:</label>
                                    <input
                                        type="text"
                                        value=""
                                        name="address1"
                                        id="address1"
                                        required
                                    />
                                </div>
                                <br/>
                                <div>
                                    <label>City:</label>
                                    <input
                                        type="text"
                                        value=""
                                        name="city"
                                        id="city"
                                        required
                                    />
                                </div>
                                <br/>
                                <div>
                                    <label>Postal Code:</label>
                                    <input
                                        type="text"
                                        value=""
                                        name="postalCode"
                                        id="postalCode"
                                        required
                                    />
                                </div>
                                <br/>
                                <div className="terms">
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        id="terms"
                                        required
                                    />
                                    <label className="checkLabel">I
                                        agree to the
                                    </label><a href="/terms" className="forgot">Terms of Use</a>.
                                </div>
                                <div id="submissionError" className="valueNegative"></div>
                                <div className="buttons">
                                    <button id="verificationSubmitButton" className="signUpButton small" type="submit"
                                            name="">Begin Verification
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        )
    }
}

export default Profile;