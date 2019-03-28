import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Recaptcha from 'react-recaptcha';
import {getData, sendRequest} from "./Graphic/utils";
import {REGISTER, COUNTRIES, LOGIN} from "../constants/APIURLS";
import {login_success} from "../actions/UserActions";
import {Switch} from 'antd';
import logo from '../img/logo_go.svg';
import NavLink from './NavLink';

import '../styles/registration.css';

// import 'antd/dist/antd.css';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.swithOnChange = this.swithOnChange.bind(this);

        this.state = {
            switchState: false,
            isVerified: false,
            options: [{
                code: '',
                value: ''
            }
            ],
            countries: [],
            countryId: 1,
            country: "Select country",
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            value: '',
            showQRCode: false,
            // QRImage: '',
            totpCode: '',
            qr: '',
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
            this.setState({countries: countries2state});
        });
    };

    handleChangeRecaptcha = res => {
        if (res) {
            this.setState({isVerified: true})
        }
    };

    handleChangeCountry = (e) => {
        const {countries} = this.state;
        // console.log("onChange country", e.target.value, countries[e.target.value]["id"]);
        let state = this.state;
        state["country"] = e.target.value;
        state["countryId"] = countries[e.target.value]["id"];
        this.setState(state);
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

    handleTotpCode = (event) => {
        this.setState({
            totpCode: event.target.value
        });
    };

    handlerRegistrationSubmit = async (event) => {
        event.preventDefault();
        console.log('qwedfqfe')
        if (this.state.isVerified) {
            function validateEmail(email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }

            event.preventDefault();

            const email = this.state.email;

            if (!validateEmail(email)) {
                alert("Email is wrong. Please enter it again.");
                return
            }

            const password = this.state.password;

            if (password !== this.state.confirmPassword) {
                alert("Passwords is not equivalent. Please enter it again.");
                return
            }

            if (password.length <= 6) {
                alert("Passwords is short. Please enter it again.");
                return
            }

            const responce = await sendRequest({
                rout: REGISTER,
                options: {
                    "email": this.state.email,
                    "username": this.state.userName,
                    "password": this.state.password,
                    "countryId": this.state.countryId,
                }
            });

            const {errorMessage, errorTextCode} = responce;

            if (typeof errorTextCode !== "undefined") {

                console.log(errorTextCode, errorMessage, typeof errorTextCode, " showTotpCodeInput=", this.state.showTotpCodeInput, responce);

                switch (errorTextCode) {
                    case "UserNotFound" :
                    case "WrongPassword":
                    case "UserExists" :
                    case "EmailExists" :
                    case "RegistrationDisabled" :
                    case "IncorrectTotpCode" :
                    case "TotpCodeNotProvided":
                        alert(errorMessage + "  (error code:" + errorTextCode + " )")
                        break;

                    default :
                }
            }
            else {
                // console.log("Registration responce =", responce);
                const QRImage = responce.qr;
                this.setState( //show input for QRCode
                    {
                        showQRCode: true,
                        QRImage
                    }
                )
            }
        }

    };

    handleSignInSubmit = async (event) => {
        event.preventDefault();
        const totpCode = ((this.state.totpCode !== "") && this.state.switchState) ? {totpCode: this.state.totpCode} : {};
        const user = {
            email: this.state.email,
            password: this.state.password,
            ...totpCode,
        };
        // debugger;
        // console.log("handleSubmit this.state=", this.state, user, );
        console.log((this.state.totpCode !== ""), this.state.switchState, "handleSubmit totpCode=", ...totpCode, totpCode);
        const content = await sendRequest({
            rout: LOGIN,
            options: {...user}
        });

        const {errorMessage, errorTextCode, httpStatus, userMessage} = content;

        if (typeof errorTextCode !== "undefined") {

            console.log(errorTextCode, errorMessage, typeof errorTextCode, " showTotpCodeInput=", this.state.showTotpCodeInput);

            switch (errorTextCode) {
                case "UserNotFound" :
                case "WrongPassword":
                case "UserExists" :
                case "BadRequest" :
                case "EmailExists" :
                    alert(userMessage + "  (" + errorTextCode + " error code:" + httpStatus + " )");
                    break;
                case "IncorrectTotpCode" :
                case "TotpCodeNotProvided":
                    // if (!this.state.showTotpCodeInput) // bad toptCode
                    // {this.setState( //show input for toptCode
                    //     {showTotpCodeInput: true}
                    // )}
                    // else
                    alert(userMessage + "  (" + errorTextCode + " error code:" + httpStatus + " )");
                    break;

                default :
            }
        }
        else {
            this.props.login_success({token: content.token});
            this.props.history.push(`/exchange`);
        }
    };

    validateForm = () => {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    };

    swithOnChange(checked) {
        // console.log(`switch to ${checked}`);
        this.setState({switchState: checked});
    }

    render() {
        // console.log("this.state = ", this.state);
        const {countries: options, country, QRImage, showQRCode, switchState} = this.state;
        // const regFormVAlid = this.validateForm();

        const content = switchState
            ? <div className='code-block'>
                <p>Plese scun this QR-code by <a style={{color: '#4A998C'}}
                                                 href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'
                                                 target="_blank">Google authenticator</a> app on your smartphone</p>
                <img src={QRImage} alt="Please scan it"/>
                <p>and enter Your Google Authenticator Six-Digit Code. </p>
                <input
                    className="userQrPassInput"
                    type="totpCode"
                    name="totpCode"
                    id="totpCode"
                    value={this.state.totpCode}
                    onChange={this.handleTotpCode}
                />
                <button className="ant-btn create-btn fixed-width-btn" type="submit" name="login">Sign in</button>
            </div>
            : <div>
                <button className="create-btn fixed-width-btn" type="submit"
                        name="login">
                    Go exchange
                </button>
            </div>
        ;

        return (
            <div className='registration-page login-page'>
                <div className='registration-form login-form'>
                    <div className='back-btn' onClick={() => window.history.back()}>
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                        Back
                    </div>

                    <img src={logo} alt=""/>

                    {(!showQRCode) &&
                    <Fragment>
                        <div className='login-title-block'>
                            <hr className='hr-login'/>
                            <span>Sign up</span>
                            <hr className='hr-login'/>
                        </div>

                        <form onSubmit={this.handlerRegistrationSubmit}>
                            <fieldset className="aboveCaptcha">
                                <div className='login-form-item'>
                                    <label>Full Name</label>
                                    <input
                                        className="userPassInput"
                                        type="userName"
                                        name="username"
                                        value={this.state.userName}
                                        onChange={this.handleUserName}
                                        id="userNAme"
                                        required/>
                                </div>
                                <div className='login-form-item'>
                                    <label>Country:</label>
                                    <select required key={country} onChange={this.handleChangeCountry}
                                            value={country} style={{color: "#000",}}>
                                        <option value='' selected>{country}</option>
                                        {Object.keys(options).map(item => (
                                            <option key={options[item]["code"]} value={options[item]["name"]}
                                                    code={item.code} id={options[item]["id"]}>
                                                {options[item]["name"]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='login-form-item'>
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
                                <div className='login-form-item'>
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
                                <div className='login-form-item'>
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

                            <div className='recaptcha-and-terms'>
                                <div className='terms-of-us'>

                                    <label className="checkbox-container">
                                        <input type="checkbox" name="terms" required/>
                                        <span className="checkmark"></span>
                                    </label>

                                    <span>
                                    I agree to the <br/>
                                    <a href="/terms" className="forgot">
                                        Terms of Use
                                    </a>.
                                </span>
                                </div>

                                <Recaptcha
                                    sitekey="6LdXEH0UAAAAANNTQtS9e4ZwdASHuZ5zWM7psA2S"
                                    render="explicit"
                                    theme='dark'
                                    verifyCallback={this.handleChangeRecaptcha}
                                />
                            </div>


                            <button className="signUpButton" type="submit" name="createAccount"
                                    disabled={!this.validateForm}>
                                Create my account
                            </button>

                            <div className='havnt-account'>
                                <NavLink to='/login'>
                                    I already have an account
                                </NavLink>
                            </div>
                        </form>
                    </Fragment>
                    }
                    {showQRCode &&
                    <div className="two-factor-registration">
                        <form onSubmit={this.handleSignInSubmit}>
                            <div className='title'>Thank you for registration.</div>

                            <div className="description">
                                <span>If you need to make your account more secure, we can offer you to use 2 factor authentication </span>
                            </div>

                            <div className='qr-block'>
                                <strong>Turn on/off 2-factor authentication </strong>
                                <Switch className='switch' onChange={this.swithOnChange}/>
                            </div>
                            {content}
                        </form>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    login_success: (token) => dispatch(login_success(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
