import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
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
                console.log(response.data.qrPath);
                this.setState({
                    imgSrc:  `http://gofriends.ru${response.data.qrPath}`,
                    base32: response.data.secret.base32
                });
            }).catch(error => {
            console.log(error);
        })
    };

    componentDidMount() {
        this.getCode();
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
                <Header/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">TWO-FACTOR AUTHENTICATION</h1>
                </div>

                <div className="featureBanner form2col">
                    <div className="formWrapper">

                        <div className="column1">

                            <h2>Two Factor Authentication</h2>
                            <p>For extra account security, we strongly recommend you enable two-factor authentication
                                (2FA).
                            </p>
                            {/*<p><a href="https://poloniex.freshdesk.com/support/articles/1000225337">What is 2FA and why*/}
                            {/*do I need it?</a><br><a*/}
                            {/*href="https://poloniex.freshdesk.com/support/articles/1000225338">How do I to set up*/}
                            {/*2FA?</a></p>*/}


                            <hr/>
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
                                        <td colspan="2">
                                            <p><strong>Before turning on 2FA, write down and put it in a safe
                                                place.</strong> If your
                                                phone gets lost, stolen, or erased, you will need this key to get
                                                back into your account!</p>
                                            <p>
                                                <input
                                                    type="checkbox"
                                                    name="terms"
                                                    required
                                                /> I have backed up my
                                                16-digit key
                                            </p>
                                        </td>
                                    </tr>
                                    <input type="hidden" name="enabling" value="1"/>

                                    <input type="hidden" name="APIack" value="1"/>

                                    <tr>
                                        <td></td>
                                        <td>
                                            <button className="signUpButton small" type="submit"
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
                            <strong>16-Digit Key:
                                <span className="valueNegative">
                                    {this.state.base32}
                                </span>
                            </strong>
                            <br/>
                            <br/>
                            <div id="qrCode" >
                                <img src={this.state.imgSrc} alt="qrcode"/>
                            </div>
                            <p>NOTE: This code changes each time you enable 2FA. If you disable 2FA
                                this code will no longer be valid.
                            </p>
                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ExchangePage;