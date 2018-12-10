import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavLink from './NavLink';
import {USERINFO} from "../constants/APIURLS";
import {getUserInfo} from "../utils";
import {save_user_info} from "../actions/UserActions";
import LoginHistory from './LoginHistory';
import {Switch} from 'antd';

import avatar from '../img/avatar.svg';
import authentication from '../img/authentication.svg';
import padlock from '../img/padlock.svg';

import '../styles/profile.css';

class Profile extends Component {
    async componentDidMount() {
        /**
         * Read token -  check if the current session is authorized
         * then request user data
         * and save it into redux store
         **/
        const {user: {token}} = this.props; //read from redux state
        // console.log("token =", token, "this.state ==>", this.state);
        const isAuthorised = (token !== "") && (token !== null); // ? true : false
        this.setState({isAuthorised, token});
        if (isAuthorised) {
            const userInfo = await getUserInfo({rout: USERINFO, token});
            const {body} = userInfo;
            this.props.save_user_info(body);
        }
    }

    render() {
        // console.log( this.props.user);

        const {username, country = {}, twoFactorAuthEnabled} = this.props.user;
        // const {name} = country;
        const {name: countryName = "Ukraine"} = country;

        return (
            <div className='profile-page'>
                <div className='page-title'>
                    My profile
                </div>

                <div className='page-content'>
                    <div className="user-information">
                        <div className="top">
                            <div className="avatar-block">
                                <img src={avatar} alt=""/>

                                <NavLink to="/Logout">
                                    <span className="title topLevel">Logout</span>
                                </NavLink>
                            </div>

                            <div>
                                <div className="user-name">
                                    {username}

                                    <div className="verification-status">
                                        <i className="fa fa-check" aria-hidden="true"></i>
                                        Verified
                                    </div>
                                </div>

                                <div className='last-login'>
                                    Last login Time: 2018-12-06 15:57:06 IP: 178.214.198.9
                                </div>
                            </div>
                        </div>

                        <div className="bottom">
                            <div className="country">
                                Country: {countryName}
                            </div>

                            <div className="phone">
                                Country: +380 ## ## ### 12
                            </div>

                            <div className="limits">
                                Withdrawal limit: $25 USD equivalent per day
                            </div>
                        </div>
                    </div>

                    <div className='user-settings'>
                        <div className='authentication-block'>
                            <div className='title-block'>
                                <div className='img'>
                                    <img src={authentication} alt=""/>
                                </div>

                                <span>
                                    2-factor authentication
                                </span>
                            </div>

                            <div className='switch-block'>
                                <span className='title'>
                                    Turn on/off 2-factor authentication
                                </span>

                                <Switch
                                    className='switch'
                                    defaultChecked={twoFactorAuthEnabled}
                                    onChange={this.swithOnChange}
                                />
                            </div>
                        </div>

                        <div className='change-pass-block'>
                            <div className='img'>
                                <img src={padlock} alt=""/>
                            </div>

                            <span>
                                Change Password
                            </span>

                            <div className='change-btn'>
                                <NavLink to="/changepassword">
                                    Change
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='page-title'>
                    My login history
                </div>

                <LoginHistory />
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
