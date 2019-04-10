import React, {Component} from 'react';
import Recaptcha from 'react-recaptcha';
import logo from '../img/logo_go.svg';
import axios from 'axios';
import queryString from 'query-string';

import {CHANGE_PASSWORD, CHANGE_PASSWORD_CONFIRM} from '../constants/APIURLS';
import {toast} from "react-toastify";
import {Icon} from "antd";


class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: '',

            sendEmail: false,
            token: '',
            isVerified: false,
            success: false
        };
    }

    componentWillMount() {
        let urlParams = queryString.parseUrl(this.props.location.search).query;
        if (urlParams.token) {
            this.setState({
                token: urlParams.token
            })
        }
    }

    async componentDidMount() {
        if (this.state.token) {
            try {
                await axios.get(`${CHANGE_PASSWORD_CONFIRM}?token=${this.state.token}`);
                this.setState({
                    success: true
                })
            } catch (e) {
                this.setState({
                    success: false
                })
            }
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
        console.log(res);
        if (res) {
            this.setState({isVerified: true});
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        if (this.state.newPassword === this.state.newPasswordRepeat) {
            try {
                let {data: {token}} = await axios.post(CHANGE_PASSWORD, {
                    password: this.state.oldPassword,
                    newPassword: this.state.newPassword,
                    confirmPassword: this.state.newPasswordRepeat
                });

                toast.success(<div className='toaster-container'><Icon type="check-circle"/>Check your mail </div>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });

                this.setState({
                    oldPassword: '',
                    newPassword: '',
                    newPasswordRepeat: '',
                    sendEmail: true
                })
            } catch (e) {
                toast.error(<div className='toaster-container'><Icon type="close"/> {e.response.data.userMessage}
                </div>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        }
    };

    render() {
        const {sendEmail, token, success} = this.state;

        if (!token) {
            return (
                <div className='login-page change-pass-page'>
                    <div className="login-form">
                        <div className='back-btn' onClick={() => window.history.back()}>
                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                            Back
                        </div>

                        {/*<img src={logo} alt=""/>*/}
                        <h2 className='sinsline-logo-title'>UKEY Trade</h2>

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
                        <h2 className='sinsline-logo-title'>UKEY Trade</h2>

                        <div className='login-title-block'>
                            <hr className='hr-login'/>
                            <span>Change your password</span>
                            <hr className='hr-login'/>
                        </div>

                        <div className='changed-pass'>
                            {success ?
                            'Password changed successfully'
                            : 'Try again later'}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ChangePassword;
