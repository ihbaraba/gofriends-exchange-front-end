import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import img from '../img/captcha.png';

class Confirm extends Component{

    render(){
        return(
            <div>
                <Header/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Confirm your email</h1>
                </div>


                <form className="confirmForm">
                    <div>
                        <input
                            className="userPassInput"
                            type="email"
                            name="username"
                            placeholder="Email"
                            id="username"
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
                            required
                        />
                    </div>
                    <div className="captcha">
                        <img src={img} alt=""/>
                    </div>
                    <p>
                        <input type="checkbox" name="terms" required/> I agree to the
                        <a href="/terms"
                           className="forgot"> Terms of Use
                        </a>.
                    </p>



                    <button className="conf-btn" type="submit">Sign in</button>
                </form>





            </div>
        )
    }
}

export default Confirm;



























