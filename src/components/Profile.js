import React, {Component} from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';
import verif from "../img/verif.svg";

class Profile extends Component{

    render(){
        return(
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">My profile</h1>
                </div>


                    <div>
                        <p className="verif-Wrap">Note: you may only have one profile.
                        If you have more than one account,
                        you need to link them rather than submit multiple profiles.</p>


                        <div className="mainVerifBlock verif-Wrap">
                            <div className="verif-block">

                                <div className=" verif-status">
                                    <h5>Verification status:</h5>
                                    <a className="verif-btn">
                                        <img src={verif} alt="" className="verifimg"/>
                                        VERIFIED
                                    </a>
                                </div>

                                <div>
                                    <span className="verStatus">Withdrawal limit: $25 USD equivalent per day</span>
                                </div>

                            </div>


                            <div className="entityperson">
                                <div>
                                    <i className="fa fa-user-circle-o p-icon" aria-hidden="true"></i>
                                </div>


                                <div>
                                    <div className="displayName">Petr <br/> Ivanovich</div>
                                    <div>Ukraine</div>
                                    <div className="entityEmail">namesecond@gmail.com</div>
                                    <div className="numberPhone">+380 ## ## ### 12</div>
                                </div>

                            </div>
                        </div>
                    </div>



            </div>
        )
    }
}

export default Profile;
