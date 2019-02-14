import React, {Component} from 'react';
import API from './api';
import '../App.css';

class ExchangePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            code: '',
            imgSrc: '',
            base32: ''
        };
    }

    getCode = () => {
        const url = '/api/auth/2fa?token=' + localStorage.getItem('token');
        API.get(url)
            .then(response => {
                this.setState({
                    imgSrc: `http://gofriends.ru${response.data.qrPath}`,
                    base32: response.data.secret.base32
                });
            }).catch(error => {
            console.log(error);
        })
    };

    componentDidMount() {
        // this.getCode();
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

    handleCode = (event) => {
        this.setState({
            code: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            password: this.state.password,
            code: this.state.code
        };
        const url = '/api/auth/2fa/verify?token=' + localStorage.getItem('token');
        API.post(url, user)
            .then(response => {
                console.log(response);
                window.location = "/profile"

            })
            .catch(error => {
                console.log(error.response.data.errors)
            });
    };


    render() {
        return (
            <div>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Two-factor authentication (2FA) is disabled</h1>
                </div>

                <div className="featureBanner form2col">
                    <div className="formWrapper">

                        <div className="column1">
                            <p className="colored-text">Two Factor Authentication Disabled<br/>
                                For extra account security, we strongly recommend you enable two-factor authentication
                                (2FA). Beetok uses Google Authenticator for 2FA.
                            </p>
                            <br/>
                            <br/>
                            <a className="colored-link" href="">
                                What is 2FA and why do I need it?
                            </a>
                            <a className="colored-link" href="">
                                How do I to set up 2FA?
                            </a>
                            <br/>
                            <br/>

                            <form onSubmit={this.handleSubmit}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Password:</td>
                                        <td>
                                            <input
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handlePassword}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Code:</td>
                                        <td>
                                            <input
                                                type="text"
                                                name="code"
                                                value={this.state.code}
                                                onChange={this.handleCode}
                                                required
                                            />
                                        </td>
                                    </tr>


                                    <tr>
                                        <td colSpan="2">
                                            <div className="colored-text"><p className="bold-text">Before turning on
                                                2FA, write down and put it in a safe
                                                place.</p> If your
                                                phone gets lost, stolen, or erased, you will need this key to get
                                                back into your account!
                                            </div>
                                            <div className="colored-text">
                                                <input
                                                    type="checkbox"
                                                    name="terms"
                                                    id="approve"
                                                    required
                                                /> I have backed up my
                                                16-digit key
                                            </div>
                                        </td>
                                    </tr>
                                    <input type="hidden" name="enabling" value="1"/>

                                    <input type="hidden" name="APIack" value="1"/>

                                    <tr>
                                        <td></td>
                                        <td>
                                            <button className="transparent-button" type="submit"
                                                    name="login">
                                                Enable 2FA
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </form>

                        </div>

                        <div className="column2">

                            <br/>
                            <div id="qrCode">
                                <img src={this.state.imgSrc} alt="qrcode"/>
                            </div>
                            <strong>16-Digit Key:
                                <span className="valueNegative">
                                    {this.state.base32}
                                </span>
                            </strong>
                            <a className="colored-link" href="">
                                Print a backup of your recovery key.
                            </a>
                            <br/>
                            <p className="colored-text">NOTE: This code changes each time you enable 2FA. If you disable
                                2FA
                                this code will no longer be valid.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default ExchangePage;