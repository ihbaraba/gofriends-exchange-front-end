import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import API from './api';
import '../App.css';


class Login2 extends Component {
    constructor(props){
        super(props);

        this.state = {
            code: ''
        }
    }

    handleCode = (event) => {
        this.setState({
            code: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            code: this.state.code
        };
        const url = '/api/auth/2fa/sign_in2?two_fa_enabled=' + localStorage.getItem('two_fa_enabled');
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
                    <h1 className="sign">SIGN IN TO YOUR ACCOUNT</h1>
                </div>
                <div className="featureBanner form1col">
                    <div className="formWrapper">
                        <h2 className="standard">You have 2 factor authentication enabled.<br/>Please Enter Your Google
                            Authenticator Six-Digit Code</h2>
                        <p className="formError">
                        </p>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input
                                    className="userPassInput"
                                    type="text"
                                    name="code"
                                    value={this.state.code}
                                    onChange={this.handleCode}
                                    required
                                />
                            </div>
                            <button className="signUpButton small" type="submit" name="login">Continue</button>
                        </form>

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Login2;


