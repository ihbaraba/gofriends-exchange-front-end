import React, {Component} from 'react';
import Recaptcha from 'react-recaptcha';
import '../App.css';


class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isVerified: false
        };
    }

    handleChangeRecaptcha = res => {
        if(res) {
            this.setState({isVerified: true})
        }
    };

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.isVerified) {

        }
    };

    render() {
        return (
            <div>
                <div style={{clear: "both"}}>
                    <h1 className="sign">RESET YOUR PASSWORD</h1>
                </div>
                <div className="featureBanner form2col">
                    <div className="formWrapper">
                        <div className="column1">
                            <form onSubmit={this.handleSubmit}>
                                        <div>
                                            <input
                                                type="email"
                                                name="username"
                                                placeholder='Enter your Email'
                                                value={this.state.email}
                                                onChange={this.handleEmail}
                                                required
                                            />
                                        </div>

                                <Recaptcha
                                    sitekey="6LdXEH0UAAAAANNTQtS9e4ZwdASHuZ5zWM7psA2S"
                                    render="explicit"
                                    theme='dark'
                                    verifyCallback={this.handleChangeRecaptcha}
                                />

                                <button className="signUpButton" type="submit" name="login">
                                    Submit
                                </button>
                            </form>

                        </div>

                        <div className="column2">
                            <h2 className="standard">Forgot your password?</h2>
                            <p>You can use this form to reset it.</p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPassword;