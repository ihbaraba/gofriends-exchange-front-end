import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
// import '../styles/style.css';
import API from './api';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [{
                code: '',
                value: ''
            }
            ],
            email: '',
            password: '',
            confirmPassword: '',
            value: ''
        }
        ;
    }

    componentDidMount() {
        this.loadCountries();

    }

    loadCountries = () => {
        const url = '/api/countries';
        API.get(url)
            .then(response => {
                    this.setState({
                        options: response.data
                    })
                }
            )
        ;
    };

    // onChange = (e) => {
    //     let state = this.state;
    //     state[e.target.name] = e.target.value;
    //
    //     this.setState(state);
    // }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
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

    handleConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state.value);
        const user = {
            email: this.state.email,
            password: this.state.password,
            country_code: this.state.value
        };

        API.post(`/api/auth/sign_up`, user )
            .then(response => {
                localStorage.setItem('token', response.data.token);
                console.log(response);
                window.location = "/activate"
            })
            .catch(error => {
                alert(error.response.data.errors)
            });
    };

    validateForm = () => {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    };


    render() {
        const {options, value} = this.state;

        return (
            <div>
                <Header/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">CREATE YOUR ACCOUNT</h1>
                    <div className="featureBanner form2col">
                        <div className="formWrapper">
                            <div className="formHelp">
                                <p>Registering on GoFriends Exchange is the first step toward creating an account. Once your email
                                    is confirmed, you'll need to complete your profile and verify your identity before
                                    you can begin trading.</p>
                            </div>
                            <div className="column1">
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset className="aboveCaptcha">
                                        <div>
                                            <label>Country:</label>
                                            <select onChange={this.handleChange} value={value}>
                                                <option value="" disabled>Select Country</option>
                                                {options.map(item => (
                                                    <option key={item.code} value={item.code}>
                                                        {item.value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label>Email:</label>
                                            <input
                                                className="userPassInput"
                                                type="email"
                                                name="username"
                                                value={this.state.email}
                                                onChange={this.handleEmail}
                                                id="email"
                                                required/>
                                        </div>
                                        <div><
                                            label>Password:</label>
                                            <input
                                                className="userPassInput"
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handlePassword}
                                                id="password"
                                                required/>
                                        </div>
                                        <div>
                                            <label>Repeat Password:</label>
                                            <input
                                                className="userPassInput"
                                                type="password"
                                                name="confirmPassword"
                                                value={this.state.confirmPassword}
                                                onChange={this.handleConfirmPassword}
                                                id="password2"
                                                required/>
                                        </div>
                                    </fieldset>

                                    <p>
                                        <input type="checkbox" name="terms" required/> I agree to the
                                        <a href="/terms"
                                           className="forgot">
                                            Terms of Use
                                        </a>.
                                    </p>

                                    <button className="signUpButton" type="submit" name="createAccount"
                                            disabled={!this.validateForm}>
                                        Register
                                    </button>
                                </form>
                            </div>
                            <div className="column2">
                                <p>The email address you provide will become your GoFriends Exchange ID and will be used for all
                                    future communications, including account recovery. <strong>Protect your email
                                        account like you would your GoFriends account.</strong> Sign-ups using throwaway
                                    email addresses will be rejected.</p>
                                <p>Your password must be at least 8 characters long, but it is HIGHLY recommended that
                                    you choose a random, alphanumeric password of at least 32 characters.</p>
                                <p>NEVER use a password for an exchange that you use ANYWHERE else, especially for the
                                    email address you sign up with.</p>
                            </div>


                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Registration;
