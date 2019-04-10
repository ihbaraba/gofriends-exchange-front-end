import React, {Component} from 'react';
import NavLink from './NavLink';
import {connect} from "react-redux";
import Recaptcha from 'react-recaptcha';
// import {simpleAction} from "../actions/simpleAction";
import {login_success, save_user_info} from "../actions/UserActions";
import {LOGIN, USERINFO} from "../constants/APIURLS";
import {sendRequest} from "./Graphic/utils";
import logo from '../img/logo_go.svg';
import {getUserInfo} from "./../utils";

import axios from 'axios';

import '../styles/login.css';
import {toast} from "react-toastify";

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

            const content = await sendRequest({
                rout: LOGIN,
                options: {...user}
            });
            const {errorTextCode, httpStatus, userMessage} = content;

            if (typeof errorTextCode !== "undefined") {
                toast.error(<div className='toaster-container'>{userMessage}</div>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
            else {
                const userInfo = await getUserInfo({rout: USERINFO, token: content.token});
                this.props.save_user_info(userInfo.body);

                this.props.login_success({token: content.token});
                axios.defaults.headers.common['Authorization'] = content.token;

                if (content.role === 'ADMIN') {
                    this.props.history.push(`/admin/dashboard`);
                } else {
                    this.props.history.push(`/exchange`);
                }
            }
        } else {
            toast.error(<div className='toaster-container'>All fields should be filled obligatory!</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
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

                    {/*<h2 className='sinsline-logo-title'>Beetok</h2>*/}

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
                                <h4 style={{textAlign: 'center', margin: '20px 0'}}>You have 2 factor authentication
                                    enabled.<br/>Please Enter Your Google
                                    Authenticator Six-Digit Code</h4>
                                <input
                                    className="userQrPassInput"
                                    type="totpCode"
                                    name="totpCode"
                                    id="totpCode"
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
    save_user_info: (info) => dispatch(save_user_info(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);