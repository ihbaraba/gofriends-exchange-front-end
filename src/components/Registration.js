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
            value: ''
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
        console.log(event.target.value);
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

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state);
        sendRequest({
            rout: REGISTER,
            options: {
                "email": this.state.email,
                "username": this.state.userName,
                "password": this.state.password,
                "countryId": this.state.countryId,
            }
        })
    };

    validateForm = () => {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    };

    render() {
        const {countries: options, country} = this.state;
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
                                            <select key={country} onChange={this.handleChangeCountry} value={country} style={{color: "#222",}}>
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
                            <div className="column2">
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
                <Footer/>
            </div>
        )
    }
}

export default Registration;
