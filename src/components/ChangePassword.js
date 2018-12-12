import React, {Component} from 'react';
import Recaptcha from 'react-recaptcha';
import logo from '../img/logo_go.svg';
import axios from 'axios';

import {CHANGE_PASSWORD} from '../constants/APIURLS';


class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [{
                code: '',
                value: ''
            }],
            email: '',
            password: '',
            confirmPassword: '',
            value: '',

            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: '',
            isVerified: false
        };
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

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.newPassword === this.state.newPasswordRepeat && this.state.isVerified) {
            axios.post(CHANGE_PASSWORD, this.state.newPassword);

            this.setState({
                oldPassword: '',
                newPassword: '',
                newPasswordRepeat: ''
            })
        }
    };

    render() {
        return (
            <div className='login-page'>
                <div className="login-form">
                    <div className='back-btn' onClick={() => window.history.back()}>
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                        Back
                    </div>

                    <img src={logo} alt=""/>

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
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}

export default ChangePassword;
