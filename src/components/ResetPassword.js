import React, {Component} from 'react';
import Recaptcha from 'react-recaptcha';
import logo from '../img/logo_footer.png';
import '../styles/resetPass.css';


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
        if (res) {
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
        if (this.state.isVerified) {

        }
    };

    render() {
        return (
            <div className='login-page reset-pass-page'>
                {/*<div style={{clear: "both"}}>*/}
                {/*<h1 className="sign">Sign in to you account</h1>*/}
                {/*</div>*/}
                <div className="login-form">
                    <div className='back-btn' onClick={() => window.history.back()}>
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                        Back
                    </div>

                    <img src={logo} alt=""/>
                    {/*<h2 className='sinsline-logo-title'>Beetok</h2>*/}

                    <div className='login-title-block'>
                        <hr className='hr-login'/>
                        <span>Reset your password</span>
                        <hr className='hr-login'/>
                    </div>

                    <div className='enter-email'>
                        Enter your email address below and we'll get you back on track.
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <div className='login-form-item'>
                                <label>Email</label>
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

                        </div>

                        <button className="signUpButton" type="submit" name="login">
                            Request reset link
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ResetPassword;