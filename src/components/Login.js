import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import NavLink from './NavLink';
import API from './api';
// import '../App.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error:''
        };
    }

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

    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        API.post(`/api/auth/sign_in`, user)
            .then(response => {
                // console.log(response);
                if (response.data.two_fa_enabled) {
                    localStorage.setItem('two_fa_enabled', response.data.two_fa_enabled);
                    window.location = "/login2"
                }
                else {
                    localStorage.setItem('token', response.data.token);
                    // console.log(response);
                    window.location = "/2fa"
                }

            })
            .catch(error => {
                this.setState({
                    error: error.response.data.message
                });
            });
    };


    render() {
        return (
            <div>
                <Header/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">SIGN IN TO YOUR ACCOUNT</h1>
                </div>
                <div className="featureBanner form2col">
                    <div className="formWrapper">


                        <div className="column1">
                            <h3 className="standard">Sign In</h3>
                            <p className="formError">
                                {this.state.error}
                            </p>

                            <form onSubmit={this.handleSubmit}>
                                <fieldset className="aboveCaptcha">
                                    <div>
                                        <label>
                                            Email:
                                        </label>
                                        <input
                                            className="userPassInput"
                                            type="email"
                                            name="username"
                                            id="username"
                                            value={this.state.email}
                                            onChange={this.handleEmail}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>
                                            Password:
                                        </label>
                                        <input
                                            className="userPassInput"
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={this.state.password}
                                            onChange={this.handlePassword}
                                            required
                                        />
                                    </div>
                                </fieldset>
                                <button className="signUpButton" type="submit" name="login">
                                    Sign in
                                </button>
                            </form>

                            {/*<a href="/resetPassword" className="standard forgot">Forgot your password?</a>*/}
                            <NavLink to="/resetPassword" className="forgot">Forgot your password</NavLink>
                        </div>

                        <div className="column2">
                            <h3 className="standard">Don't have an account?</h3>
                            <p>Create one to start trading on the world's most active digital asset exchange.</p>
                            <NavLink to="/signup">
                                <button
                                    className="signUpButton"
                                    type="submit"
                                    name="createAccount">
                                    Create Your Account
                                </button>
                            </NavLink>
                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Login;