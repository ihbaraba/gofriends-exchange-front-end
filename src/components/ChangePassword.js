import React, {Component} from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';
// import '../styles/style.css';
import API from './api';

class ChangePassword extends Component {
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

    render() {
        return (
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">CHANGE YOUR PASSWORD</h1>
                </div>
                <div className="featureBanner form2col">
                    <div className="formWrapper">


                        <div className="column1">
                            <form>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Old Password:</td>
                                        <td><input type="password" name="oldPassword" value=""/></td>
                                    </tr>
                                    <tr>
                                        <td>New Password:</td>
                                        <td><input type="password" name="newPassword" value=""/></td>
                                    </tr>
                                    <tr>
                                        <td>Repeat New Password:</td>
                                        <td><input type="password" name="newPasswordRepeat" value=""/></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <button className="signUpButton" type="submit" name="login">Change
                                    Password
                                </button>
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
