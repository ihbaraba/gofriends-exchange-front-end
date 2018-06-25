import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';


class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            organisation: '',
            email: '',
            message: ''
        }
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handleOrganisation = (event) => {
        this.setState({
            organisation: event.target.value
        });
    };
    handleMessage = (event) => {
        this.setState({
            message: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state.value);
        // const user = {
        //     email: this.state.email,
        //     password: this.state.password,
        //     country_code: this.state.value
        // };
        //
        // API.post(`/api/auth/sign_up`, user )
        //     .then(response => {
        //         localStorage.setItem('token', response.data.token);
        //         console.log(response);
        //         window.location = "/activate"
        //     })
        //     .catch(error => {
        //         alert(error.response.data.errors)
        //     });
    };

    render() {
        return (
            <div>
                <Header/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">CONTACT US</h1>
                </div>
                <div className="featureBanner twoCol contact">
                    <div className="contentWrapper">

                        <div className="column1">

                            <form id="contactForm">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <h3>Let us know what you need.</h3>
                                            <span id="contactFormError" className="valueNegative"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="lbl">
                                            <div className="formContent">Subject:</div>
                                        </td>
                                        <td>
                                            <select name="subject" id="subject">
                                                <option value="null">Select a topic...</option>
                                                <option value="1">Business Development Inquiry</option>
                                                <option value="3">Media Inquiry</option>
                                                <option value="4">Careers</option>
                                                <option value="support">Technical Support</option>
                                            </select>
                                        </td>
                                    </tr>
                                    </tbody>

                                    <tbody className="formContent">
                                    <tr>
                                        <td>Name:</td>
                                        <td><input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={this.state.name}
                                            onChange={this.handleName}
                                            required
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td id="orgLabel">Organization:</td>
                                        <td><input
                                            type="text"
                                            name="org"
                                            id="org"
                                            value={this.state.organisation}
                                            onChange={this.handleOrganisation}
                                            required
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>
                                            <input
                                                type="email"
                                                name="fromEmail"
                                                id="fromEmail"
                                                value={this.state.email}
                                                onChange={this.handleEmail}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Message:</td>
                                        <td>
                                            <textarea
                                            rows="10"
                                            cols="20"
                                            name="message"
                                            id="message"
                                            value={this.state.message}
                                            onChange={this.handleMessage}
                                            required
                                            ></textarea></td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td className="buttonRow">
                                            <button className="signUpButton small" type="submit">Submit
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>

                                </table>
                            </form>
                        </div>

                        <div className="column2">
                            <h3 className="standard">
                                <a href="#" className="forgot">
                                <i className="fa fa-medkit start"></i>Contact Support</a></h3>
                            <p>All Technical Support issues are handled though our support system.</p>


                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
    )
    }

    }

    export default ContactUs;
