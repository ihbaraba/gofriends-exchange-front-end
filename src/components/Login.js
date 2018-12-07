import React, {Component} from 'react';
import NavLink from './NavLink';
import {connect} from "react-redux";
import Recaptcha from 'react-recaptcha';
// import {simpleAction} from "../actions/simpleAction";
import {login_success} from "../actions/UserActions";
import {LOGIN} from "../constants/APIURLS";
import {sendRequest} from "./Graphic/utils";
import logo from '../img/logo_go.svg';


import '../styles/login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
            totpCode: '',
            qr: '',
            showTotpCodeInput: false,
            isVerified: false
        };
    }

    handleChangeRecaptcha = res => {
        if (res) {
            this.setState({isVerified: true});
        }
    };

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    handleTotpCode = (event) => {
        this.setState({
            totpCode: event.target.value
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.isVerified) {
            const user = {
                email: this.state.email,
                password: this.state.password,
                totpCode: this.state.totpCode,
            };
            // console.log("handleSubmit options=", user);

            const content = await sendRequest({
                rout: LOGIN,
                options: {...user}
            });
            const {errorTextCode, httpStatus, userMessage} = content;

            if (typeof errorTextCode !== "undefined") {

                // console.log(content, errorTextCode, errorMessage, typeof errorTextCode, " showTotpCodeInput=", this.state.showTotpCodeInput);

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
                        if (!this.state.showTotpCodeInput) // bad toptCode
                        {
                            this.setState( //show input for toptCode
                                {showTotpCodeInput: true}
                            )
                        }
                        else {
                            alert(userMessage + "  (" + errorTextCode + " error code:" + httpStatus + " )");
                        }

                        break;

                    default :
                }
                // console.log(errorCode, usrMsg, typeof errorCode, " showTotpCodeInput=", this.state.showTotpCodeInput);
                //
                // switch (errorCode) {
                //     case 0 : // bad email
                //     case 1 :
                //     case 2 :
                //     case 3 : alert(usrMsg);//bad password
                //         break;
                //     case 5 :
                //     case 4 : {
                //         if (!this.state.showTotpCodeInput) // bad toptCode
                //             {this.setState( //show input for toptCode
                //                 {showTotpCodeInput: true}
                //                 )}
                //         else
                //             { alert(usrMsg) }
                //     }
                //         break;
                //
                //     default :
                // }
            }
            else {
                // console.log("Login content =", content);
                this.props.login_success({token: content.token});

                this.props.history.push(`/exchange`);
            }
        }
    };

    render() {
        const {showTotpCodeInput} = this.state;
        return (
            <div className='login-page'>
                {/*<div style={{clear: "both"}}>*/}
                {/*<h1 className="sign">Sign in to you account</h1>*/}
                {/*</div>*/}
                <div className="login-form">
                    <div className='back-btn' onClick={() => window.history.back()}>
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                        Back
                    </div>

                    <img src={logo} alt=""/>

                    <div className='login-title-block'>
                        <hr className='hr-login'/>
                        <span>Login</span>
                        <hr className='hr-login'/>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <fieldset className="aboveCaptcha">
                            {(!showTotpCodeInput) && <div>
                                <div className='login-form-item'>
                                    <label>Email</label>
                                    <input
                                        className="userPassInput"
                                        type="email"
                                        name="username"
                                        placeholder="Email"
                                        id="username"
                                        value={this.state.email}
                                        onChange={this.handleEmail}
                                        required
                                    />
                                </div>

                                <div className='login-form-item'>
                                    <label>Password</label>
                                    <input
                                        className="userPassInput"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handlePassword}
                                        required
                                    />
                                </div>

                                <div className='reset-password-block'>
                                    <NavLink to='/resetPassword'>
                                        Forgot your password?
                                    </NavLink>
                                </div>

                                <Recaptcha
                                    sitekey="6LdXEH0UAAAAANNTQtS9e4ZwdASHuZ5zWM7psA2S"
                                    render="explicit"
                                    theme='dark'
                                    verifyCallback={this.handleChangeRecaptcha}
                                />
                            </div>}
                            {(showTotpCodeInput) && <div>
                                <h4>You have 2 factor authentication enabled.<br/>Please Enter Your Google
                                    Authenticator Six-Digit Code</h4>
                                <input
                                    className="userPassInput"
                                    type="totpCode"
                                    name="totpCode"
                                    id="totpCode"
                                    placeholder="TotpCode"
                                    value={this.state.totpCode}
                                    onChange={this.handleTotpCode}
                                    required
                                    style={{"color": "#000"}}
                                />
                            </div>}
                        </fieldset>

                        <button className="signUpButton" type="submit" name="login">
                            Login
                        </button>

                        <div className='havnt-account'>
                            <NavLink to='/signup'>
                                I don’t have an account
                            </NavLink>
                        </div>
                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);