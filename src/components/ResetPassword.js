import React, {Component} from 'react';
import Header from './Header';
import img from '../img/captcha.png';
import '../App.css';


class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };


    render() {
        return (
            <div>
                <Header/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">RESET YOUR PASSWORD</h1>
                </div>
                <div className="featureBanner form2col">
                    <div className="formWrapper">
                        <div className="column1">
                            <form onSubmit={this.handleSubmit}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Email:</td>
                                        <td>
                                            <input
                                                type="email"
                                                name="username"
                                                value={this.state.email}
                                                onChange={this.handleEmail}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="g-recaptcha">
                                    <img src={img} alt=""/>
                                    <div>


                                        {/*<div>*/}
                                        {/*<iframe*/}
                                        {/*src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LcGrf4SAAAAACynUoTh36j68QP99woJp6rUEAn6&amp;co=aHR0cHM6Ly9wb2xvbmlleC5jb206NDQz&amp;hl=uk&amp;v=v1526884278587&amp;theme=light&amp;size=normal&amp;cb=kqjv32ooxv7a"*/}
                                        {/*width="304" height="78" role="presentation" frameborder="0"*/}
                                        {/*scrolling="no"*/}
                                        {/*sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox">*/}
                                        {/*</iframe>*/}
                                        {/*</div>*/}
                                        {/*/!*<textarea id="g-recaptcha-response" name="g-recaptcha-response"*!/*/}
                                        {/*/!*class="g-recaptcha-response"*!/*/}
                                        {/*/!*></textarea>*!/*/}

                                    </div>
                                </div>
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