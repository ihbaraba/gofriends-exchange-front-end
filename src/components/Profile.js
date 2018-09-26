import React, {Component} from 'react';
import { connect } from 'react-redux';

import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';
import verif from "../img/verif.svg";
import {USERINFO} from "../constants/APIURLS";
import {getUserInfo} from "../utils";
import {save_user_info} from "../actions/UserActions";

class Profile extends Component{

    async componentDidMount() {
        /**
         * Read token -  check if the current session is authorized
         * then request user data
         * and save it into redux store
         **/
        const { user: {token} } = this.props; //read from redux state
        // console.log("token =", token, "this.state ==>", this.state);
        const isAuthorised = (token !== "") && (token !== null); // ? true : false
        this.setState({isAuthorised, token});
        if (isAuthorised) {
            const userInfo = await getUserInfo({rout: USERINFO, token});
            const {body} = userInfo;
            this.props.save_user_info(body);
        }
        }

    render(){
        // console.log( this.props.user);

        const {username, email, country = {}} = this.props.user;
        // const {name} = country;
        const {name: countryName = "Ukraine"} = country;

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
                                    <div className="displayName">{username}</div>
                                    <div>{countryName}</div>
                                    <div className="entityEmail">{email}</div>
                                    <div className="numberPhone">+380 ## ## ### 12</div>
                                </div>

                            </div>
                        </div>
                    </div>



            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    save_user_info: (info) => dispatch(save_user_info(info)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
