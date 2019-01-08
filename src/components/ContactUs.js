import React, {Component} from 'react';
import '../App.css';
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

class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: '',
            name: '',
            organisation: '',
            email: '',
            message: ''
        }
    }

    handlerChangeInput = e => {
        let name = e.target.name,
            value = e.target.value;

        this.setState({[name]: value})
    };

    handleSubmit = (event) => {
        event.preventDefault();

        console.log(this.state)

    };

    render() {
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
                        <span>Contact us</span>
                        <hr className='hr-login'/>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <fieldset className="aboveCaptcha">
                            <div className='login-form-item'>
                                <label>Subject:</label>
                                <select
                                    style={{color: "#000"}}
                                    name='subject'
                                    value={this.state.subject}
                                    onChange={this.handlerChangeInput}
                                    required
                                >
                                    <option value="">Select a topic...</option>
                                    <option value="Business Development Inquiry">Business Development Inquiry</option>
                                    <option value="Media Inquiry">Media Inquiry</option>
                                    <option value="Careers">Careers</option>
                                    <option value="Technical Support">Technical Support</option>
                                </select>
                            </div>

                            <div className='login-form-item'>
                                <label>Name:</label>
                                <input
                                    className="userPassInput"
                                    type='text'
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handlerChangeInput}
                                    required/>
                            </div>
                            <div className='login-form-item'>
                                <label>Organization:</label>
                                <input
                                    className="userPassInput"
                                    type="text"
                                    name="organisation"
                                    value={this.state.organisation}
                                    onChange={this.handlerChangeInput}
                                    required/>
                            </div>
                            <div className='login-form-item'>
                                <label>Email:</label>
                                <input
                                    className="userPassInput"
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handlerChangeInput}
                                    required/>
                            </div>
                            <div className='login-form-item'>
                                <label>Message:</label>
                                <textarea
                                    rows="10"
                                    name='message'
                                    value={this.state.message}
                                    onChange={this.handlerChangeInput}
                                    required
                                >
                                </textarea>
                            </div>


                            <div className="buttonRow">
                                <p style={{letterSpacing: '1.2px', textAlign: 'center'}}>This inbox is not monitored for support requests.
                                    <br/>For technical assistance, Contact Support.</p>
                                <button className="btn" type="submit">
                                    Send
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>

            </div>
        )
    }
}

export default ContactUs;
