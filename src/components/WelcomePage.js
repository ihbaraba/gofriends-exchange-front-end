import React, {Component} from 'react';
import Header from './Header';
import NavLink from './NavLink';
import Footer from './Footer';
import '../App.css';


class WelcomePage extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Welcome to one of the most <br/> active crypto exchanges in the world</h1>
                </div>



                <div className="featureBanner">

                    <NavLink to="/signup">
                        <button
                            className="main-btn"
                            type="submit"
                            name="createAccount"
                        >
                            Create Your Account
                        </button>
                    </NavLink>
                    <br/>
                    <p>Already a member? <NavLink to="/login" className="forgot">Sign in</NavLink>.</p>
                </div>
                <div className="home3col">
                    <div className="column">
                        <h4 className="highlight">Advanced trading tools</h4>
                        <p>Take advantage of dozens of technical indicators and our robust API to inform and execute
                            your trading strategy.</p>
                    </div>
                    <div className="column">
                        <h4 className="highlight">Cold storage and 24/7 monitoring</h4>
                        <p>To protect your money, we keep most deposits in air-gapped cold storage. Online, we have only
                            what’s needed for active trading. We also monitor activity 24/7 to block any suspicious
                            activity.</p>
                    </div>
                    <div className="column last">
                        <h4 className="highlight">Innovative projects</h4>
                        <p>Access the latest tokens and technologies that are pushing the industry forward.</p>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default WelcomePage;