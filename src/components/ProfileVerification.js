import React, {Component} from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';


class ProfileVerification extends Component{

    render(){
        return(
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Welcome to <span className="green">Go</span>Friends</h1>
                </div>


                <div className="formVerificationWrap">
                    <p>To begin trading, you’ll first need to submit your profile for verification.<br/>

                        Note: you may only have one profile. If you have more than one account,
                        you need to link them rather than submit multiple profiles.</p>


                    <form className="profileVerification">
                        <p>Profile Verification</p>
                        <div>
                            <label>First Name</label>
                            <input type="text"/>
                        </div>

                        <div>
                            <label>Last Name</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label>Street Address</label>
                            <input type="text"/>
                        </div>

                        <div>
                            <label>City</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label>Street Address</label>
                            <input type="text"/>
                        </div>

                        <div>
                            <label>Phone Number</label>
                            <input type="tel"/>
                        </div>
                        <p>
                            <input type="checkbox" name="terms" required/> I agree to the
                            <a href="/terms"
                               className="forgot">
                                Terms of Use
                            </a>.
                        </p>
                        <button className="verif-btn">
                            Begin Verifications
                        </button>
                    </form>
                </div>





                <Footer/>
            </div>

        )
    }
}

export default ProfileVerification;


