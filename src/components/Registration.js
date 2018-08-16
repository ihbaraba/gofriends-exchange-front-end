import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
// import '../styles/style.css';
import API from './api';
import {getData, sendRequest} from "./Graphic/utils";
import {REGISTER, COUNTRIES, ORDERS} from "../constants/APIURLS";

class Registration extends Component {
    constructor(props) {
        super(props);

        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleUserName = this.handleUserName.bind(this);

        this.state = {
            options: [{
                code: '',
                value: ''
            }
            ],
            countries: [],
            countryId: 1,
            country: "select country",
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            value: '',
            showQRCode: false,
            QRImage: '',
        };
    }

    componentDidMount() {
        this.loadCountries();
    }

    loadCountries = () => {

        const options = {
            APIURL: COUNTRIES,
        };
        getData(options).then(countries => {
            const countries2state = countries.reduce((countries, item) => ({...countries, [item.name]: item}), {});
            // console.log("countries2state=", countries2state, Object.keys(countries2state));
            this.setState({countries: countries2state}
            // , ()=> { console.log("countries=", countries)}
            )
        });
    };

    handleChangeCountry = (e) => {
        const { countries } = this.state;
        // console.log("onChange country", e.target.value, countries[e.target.value]["id"]);
        let state = this.state;
        state["country"] = e.target.value;
        state["countryId"] = countries[e.target.value]["id"];
        this.setState(state
            // , ()=> { console.log("onChange country", this.state); }
            );
    };

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handleUserName = (event) => {
        this.setState({
            userName: event.target.value
        });
    };

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    handleConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(this.state);
        const responce = await sendRequest({
            rout: REGISTER,
            options: {
                "email": this.state.email,
                "username": this.state.userName,
                "password": this.state.password,
                "countryId": this.state.countryId,
            }
        });
        const { usrMsg, errorCode } = responce;

        if (typeof usrMsg !== "undefined") {

            console.log(errorCode, usrMsg);

            switch (errorCode) {
                case "0" :
                case "1" :
                case "2" :
                case "3" :
                case "4" :
                case "5" : alert(usrMsg);
                    break;
                default :
            }
            }
        else
            {
                console.log("Registration responce =", responce);
                const QRImage = responce.qr;
                this.setState( //show input for QRCode
                    {
                        showQRCode: true,
                        QRImage
                    },
                    () => {
                        setTimeout( () => { this.setState({showQRCode: false}) }, 5 * 60 * 1000) //hide input for toptCode
                    }
                )
            }
    };

    validateForm = () => {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    };

    render() {
        const {countries: options, country, showQRCode, QRImage} = this.state;
        return (
            <div>
                <Header/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">CREATE YOUR ACCOUNT</h1>
                    <div className="featureBanner form2col">
                        <div className="formWrapper">
                            <div className="formHelp">
                                <p>Registering on GoFriends Exchange is the first step toward creating an account. Once your email
                                    is confirmed, you'll need to complete your profile and verify your identity before
                                    you can begin trading.</p>
                            </div>
                            { (!showQRCode) &&
                            <div className="column1">
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset className="aboveCaptcha">
                                        <div>
                                            <label>User name</label>
                                            <input
                                                className="userPassInput"
                                                type="userName"
                                                name="username"
                                                value={this.state.userName}
                                                onChange={this.handleUserName}
                                                id="userNAme"
                                                required/>
                                        </div>
                                        <div style={{marginBottom: "2rem",}}>
                                            <label>Country:</label>
                                            <select key={country} onChange={this.handleChangeCountry} value={country} style={{color: "#fff", border:0,}}>
                                                <option value={country} >{country}</option>
                                                {Object.keys(options).map(item => (
                                                    <option key={options[item]["code"]} value={options[item]["name"]} code={item.code} id={options[item]["id"]}>
                                                        {options[item]["name"]}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label>Email:</label>
                                            <input
                                                className="userPassInput"
                                                type="email"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleEmail}
                                                id="email"
                                                required/>
                                        </div>
                                        <div>
                                            <label>Password:</label>
                                            <input
                                                className="userPassInput"
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handlePassword}
                                                id="password"
                                                required/>
                                        </div>
                                        <div>
                                            <label>Repeat Password:</label>
                                            <input
                                                className="userPassInput"
                                                type="password"
                                                name="confirmPassword"
                                                value={this.state.confirmPassword}
                                                onChange={this.handleConfirmPassword}
                                                id="password2"
                                                required/>
                                        </div>
                                    </fieldset>

                                    <p >
                                        <img src="../img/captcha.png" alt="" />
                                    </p>



                                    <p>
                                        <input type="checkbox" name="terms" required/> I agree to the
                                        <a href="/terms"
                                           className="forgot">
                                            Terms of Use
                                        </a>.
                                    </p>



                                    <button className="signUpButton" type="submit" name="createAccount"
                                            disabled={!this.validateForm}>
                                        Register
                                    </button>
                                </form>
                            </div>
                                }
                            { showQRCode &&
                                <div className="column1">
                                    <p>Thank you for registration. <strong>Please scan this QR-code by Google Authenticator application of your smartphone.</strong> </p>
                                    <img src={QRImage} alt="Please scan it" />
                                    <p>After that, please, move on SIGN IN Page for enter in to your account.</p>
                                </div>
                            }
                            <div className="column2">
                                <div className="rightColumn">
                                    <p>The email address you provide will become your GoFriends Exchange ID and will be used for all
                                        future communications, including account recovery. <strong>Protect your email
                                            account like you would your GoFriends account.</strong> Sign-ups using throwaway
                                        email addresses will be rejected.</p>
                                    <p>Your password must be at least 8 characters long, but it is HIGHLY recommended that
                                        you choose a random, alphanumeric password of at least 32 characters.</p>
                                    <p>NEVER use a password for an exchange that you use ANYWHERE else, especially for the
                                        email address you sign up with.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Registration;
