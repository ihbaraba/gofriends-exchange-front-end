import React, {Component} from 'react';
import Recaptcha from 'react-recaptcha';
import logo from '../img/logo_go.svg';
import axios from 'axios';
import queryString from 'query-string';

import {CHANGE_PASSWORD} from '../constants/APIURLS';


class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: '',

            sendEmail: false,
            token: '',
            isVerified: false
        };
    }

    componentWillMount() {
        let urlParams = queryString.parseUrl(this.props.location.search).query;
        if (urlParams.token) {
            this.setState({
                token: urlParams.body.token
            })
        }
    }

    async componentDidMount() {
        if (this.state.token) {
            let confirmStatus = await axios.get(`${CHANGE_PASSWORD}/${this.state.token}`);
            console.log(confirmStatus);
        }
    }

    handlerChangeInput = event => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name]: value
        })
    };

    handleChangeRecaptcha = res => {
        if (res) {
            this.setState({isVerified: true});
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.newPassword === this.state.newPasswordRepeat && this.state.isVerified) {
            try {
               let {data: {token}} =  await axios.post(CHANGE_PASSWORD, {
                    password: this.state.oldPassword,
                    newPassword: this.state.newPassword,
                    confirmPassword: this.state.newPasswordRepeat
                });

                console.log(token);

                await axios.get(`${CHANGE_PASSWORD}/${token}`);

                this.setState({
                    oldPassword: '',
                    newPassword: '',
                    newPasswordRepeat: '',
                    sendEmail: true
                })
            } catch (error) {
                console.log(error);
            }
        }
    };

    render() {
        const {sendEmail, token} = this.state;

        if (!token) {
            return (
                <div className='login-page'>
                    <div className="login-form">
                        <div className='back-btn' onClick={() => window.history.back()}>
                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                            Back
                        </div>

                        {/*<img src={logo} alt=""/>*/}
                        <h2 className='sinsline-logo-title'>SINSLINE</h2>

                        <div className='login-title-block'>
                            <hr className='hr-login'/>
                            <span>Change your password</span>
                            <hr className='hr-login'/>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <fieldset className="aboveCaptcha">
                                <div className='login-form-item'>
                                    <label>Old Password:</label>
                                    <input
                                        className="userPassInput"
                                        type='text'
                                        name="oldPassword"
                                        value={this.state.oldPassword}
                                        onChange={this.handlerChangeInput}
                                        required/>
                                </div>

                                <div className='login-form-item'>
                                    <label>New Password:</label>
                                    <input
                                        className="userPassInput"
                                        type="password"
                                        name="newPassword"
                                        value={this.state.newPassword}
                                        onChange={this.handlerChangeInput}
                                        required/>
                                </div>

                                <div className='login-form-item'>
                                    <label>Confirm password:</label>
                                    <input
                                        className="userPassInput"
                                        type="password"
                                        name="newPasswordRepeat"
                                        value={this.state.newPasswordRepeat}
                                        onChange={this.handlerChangeInput}
                                        required/>
                                </div>

                                <div style={{display: 'flex', justifyContent: 'center', margin: '45px 0 25px 0'}}>
                                    <Recaptcha
                                        sitekey="6LdXEH0UAAAAANNTQtS9e4ZwdASHuZ5zWM7psA2S"
                                        render="explicit"
                                        theme='dark'
                                        verifyCallback={this.handleChangeRecaptcha}
                                    />
                                </div>

                                <div className="buttonRow">
                                    <button
                                        className="btn"
                                        type="submit"
                                        style={{margin: '20px auto'}}
                                    >
                                        Change password
                                    </button>
                                </div>

                                {/*{sendEmail ? <div className='send-email-token'>*/}
                                        {/*Сheck email*/}
                                    {/*</div>*/}
                                    {/*: ''}*/}
                            </fieldset>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='login-page'>
                    <div className="login-form">
                        {/*<img src={logo} alt=""/>*/}
                        <h2 className='sinsline-logo-title'>SINSLINE</h2>

                        <div className='login-title-block'>
                            <hr className='hr-login'/>
                            <span>Change your password</span>
                            <hr className='hr-login'/>
                        </div>

                        <div className='changed-pass'>
                            Password changed successfully
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ChangePassword;
