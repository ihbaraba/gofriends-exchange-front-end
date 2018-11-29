import React, {Component} from 'react';
import Recaptcha from 'react-recaptcha';


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
        if(this.state.newPassword === this.state.newPasswordRepeat && this.state.isVerified) {
            alert('done')

            this.setState({
                oldPassword: '',
                newPassword: '',
                newPasswordRepeat: ''
            })
        }
    };

    render() {
        return (
            <div>
                <div style={{clear: "both"}}>
                    <h1 className="sign">CHANGE YOUR PASSWORD</h1>
                </div>

                <div className="featureBanner form2col">
                    <div className="formWrapper">
                        <div className="contentWrapper formWrapper column1">
                            <form onSubmit={this.handleSubmit}>
                                <fieldset className="aboveCaptcha">
                                    <div>
                                        <label>Old Password:</label>
                                        <input
                                            className="userPassInput"
                                            type='text'
                                            name="oldPassword"
                                            value={this.state.oldPassword}
                                            onChange={this.handlerChangeInput}
                                            required/>
                                    </div>
                                    <div>
                                        <label>New Password:</label>
                                        <input
                                            className="userPassInput"
                                            type="password"
                                            name="newPassword"
                                            value={this.state.newPassword}
                                            onChange={this.handlerChangeInput}
                                            required/>
                                    </div>
                                    <div>
                                        <label>Repeat New Password:</label>
                                        <input
                                            className="userPassInput"
                                            type="password"
                                            name="newPasswordRepeat"
                                            value={this.state.newPasswordRepeat}
                                            onChange={this.handlerChangeInput}
                                            required/>
                                    </div>

                                    <Recaptcha
                                        sitekey="6LdXEH0UAAAAANNTQtS9e4ZwdASHuZ5zWM7psA2S"
                                        render="explicit"
                                        theme='dark'
                                        verifyCallback={this.handleChangeRecaptcha}
                                    />


                                    <div className="buttonRow">
                                        <button
                                            className="signUpButton small"
                                            type="submit"
                                        style={{margin: '20px auto'}}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>

                        <div className="column2">
                            <p>Use this form to change your password.</p>
                            <p>After you submit it, you will be logged out and will need to log in with your new
                                password.</p>

                            <p>Your password must be at least 8 characters long, but it is HIGHLY recommended that you
                                choose a random, alphanumeric password of at least 32 characters.</p>
                            <p>NEVER use a password for an exchange that you use ANYWHERE else.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword;
