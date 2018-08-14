import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import NavLink from './NavLink';
import API from './api';
import {connect} from "react-redux";
// import {simpleAction} from "../actions/simpleAction";
import {login_success} from "../actions/UserActions";
import {LOGIN} from "../constants/APIURLS";
import {sendRequest} from "./Graphic/utils";
// import '../App.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error:'',
            totpCode:'',
            showTotpCodeInput: false,
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

    handleTotpCode = (event) => {
        this.setState({
            totpCode: event.target.value
        });
    };

    handleSubmit = async (event) => {
        console.log("handleSubmit this.props=", this.props);
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
            totpCode: this.state.totpCode,
        };
        const content = await sendRequest({
            rout: LOGIN,
            options: { ...user }
        });

        const { usrMsg, errorCode } = content;

        if (typeof usrMsg !== "undefined") {

            console.log(errorCode, usrMsg, typeof errorCode, " showTotpCodeInput=", this.state.showTotpCodeInput);

            switch (errorCode) {
                case 0 : // bad email
                case 1 :
                case 2 :
                case 3 : alert(usrMsg);//bad password
                    break;
                case 4 : {
                    if (!this.state.showTotpCodeInput) // bad toptCode
                        {this.setState( //show input for toptCode
                            {showTotpCodeInput: true},
                            () => {
                                setTimeout( () => { this.setState({showTotpCodeInput: false}) }, 5 * 60 * 100) //hide input for toptCode
                            })}
                    else
                        { alert(usrMsg) }
                }
                    break;
                default :

            }


        }
        else
        {
            console.log("Login content =", content);
            this.props.login_success({token: content.token});
            // localStorage.setItem('token', content.token);
            // window.location = "/2fa";
        }
        // API.post(`/api/auth/sign_in`, user)
        //     .then(response => {
        //         // console.log(response);
        //         if (response.data.two_fa_enabled) {
        //             localStorage.setItem('two_fa_enabled', response.data.two_fa_enabled);
        //             window.location = "/login2"
        //         }
        //         else {
        //             localStorage.setItem('token', response.data.token);
        //             // console.log(response);
        //             window.location = "/2fa"
        //         }
        //
        //     })
        //     .catch(error => {
        //         this.setState({
        //             error: error.response.data.message
        //         });
        //     });
    };


    render() {
        const {showTotpCodeInput} = this.state;
        return (
            <div>
                <Header/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Sign in to you account</h1>
                </div>
                <div className="featureBanner form2col">
                    <div className="formWrapper">


                        <div className="column1" >
                            <h3 className="standard">Sign In</h3>
                            <p className="formError">
                                {this.state.error}
                            </p>

                            <form onSubmit={this.handleSubmit}>
                                <fieldset className="aboveCaptcha">
                                    { (!showTotpCodeInput) && <div>
                                    <div>
                                        <input
                                            className="userPassInput"
                                            type="email"
                                            name="username"
                                            placeholder="Email"
                                            id="username"
                                            value={this.state.email}
                                            onChange={this.handleEmail}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            className="userPassInput"
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handlePassword}
                                            required
                                        />
                                    </div>
                                    </div>}
                                    { (showTotpCodeInput) && <div>
                                        <input
                                            className="userPassInput"
                                            type="totpCode"
                                            name="totpCode"
                                            id="totpCode"
                                            placeholder="TotpCode"
                                            value={this.state.totpCode}
                                            onChange={this.handleTotpCode}
                                            required
                                        />
                                    </div>}
                                </fieldset>
                                <br/>

                                <button className="ant-btn fixed-width-btn" type="submit" name="login">
                                    Sign in
                                </button>
                            </form>

                            {/*<a href="/resetPassword" className="standard forgot">Forgot your password?</a>*/}
                            <NavLink to="/resetPassword" className="forgot colored-link">Forgot your password</NavLink>
                        </div>

                        <div className="column2">
                            <h3 className="standard">Don't have an account?</h3>
                            <p>Create one to start trading on the world's most active digital asset exchange.</p>
                            <NavLink to="/signup">
                                <button
                                    className="ant-btn fixed-width-btn"
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
const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    login_success: (token) => dispatch(login_success(token)),
    // simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Login;