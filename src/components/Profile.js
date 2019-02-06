import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavLink from './NavLink';
import {USERINFO, TWO_FACTOR_AUTHENTICATION} from "../constants/APIURLS";
import {getUserInfo} from "../utils";
import {save_user_info} from "../actions/UserActions";
import LoginHistory from './LoginHistory';
import {Switch} from 'antd';
import axios from 'axios';
import Modal from 'react-modal';

import ProfileVerification from './ProfileVerification';

import avatar from '../img/avatar.svg';
import authentication from '../img/authentication.svg';
import padlock from '../img/padlock.svg';

import '../styles/profile.css';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0'
    }
};

class Profile extends Component {
    state = {
        showQr: false,
        modalIsOpen: false,
        qrCode: '',
        totpCode: '',
        twoFactorAuthEnabled: this.props.user.twoFactorAuthEnabled
    };

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

            if(body.verifyStatus !== 'verified') {
                this.setState({
                    modalIsOpen: true
                })
            }
        }

        // this.openModal()
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true,
        })
    };

    closeModal = () => {
        this.setState({modalIsOpen: false})
        this.props.history.push('/exchange')
    };

    exitModal = () => {
        this.setState({modalIsOpen: false})
    };


    swithOnChange = async (onTwoFActor) => {
        if (onTwoFActor) {
            let qrCode = await axios.get(TWO_FACTOR_AUTHENTICATION);

            this.setState({
                showQr: true,
                qrCode: qrCode.data.qr,
                twoFactorAuthEnabled: true
            })
        } else {
            await this.activateTwoFactor(true);

            this.setState({
                twoFactorAuthEnabled: false,
                showQr: false,
            })
        }
    };

    activateTwoFactor = async (disable) => {
        if (disable === true) {
            axios.put(TWO_FACTOR_AUTHENTICATION, {
                enable: false
            })
        } else {
            await axios.put(TWO_FACTOR_AUTHENTICATION, {
                enable: true,
                totpCode: this.state.totpCode
            });

            this.setState({showQr: false})
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            twoFactorAuthEnabled: nextProps.user.twoFactorAuthEnabled
        })
    }

    render() {
        const {showQr, qrCode, totpCode} = this.state;
        const {username, country = {}, twoFactorAuthEnabled, email, id} = this.props.user;
        console.log(this.props);
        // const {name} = country;
        const countryName = country ? country.countryName : 'Ukraine';

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
                                Phone: +380 ## ## ### 12
                            </div>

                            <div className="phone">
                                E-mail: {email}
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
                                    checked={this.state.twoFactorAuthEnabled}
                                    onChange={this.swithOnChange}
                                />
                            </div>

                            {showQr ?
                                <div className='qr-authentication-block'>
                                    <div className='two-factor-cod-block'>
                                        <div className="qr-code">
                                            <div className='title'>
                                                Plese scun this QR-code by <a style={{color: '#4A998C'}} href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2' target="_blank">Google authenticator</a> app on your smartphone
                                            </div>

                                            <img src={qrCode} alt="QR - code"/>
                                        </div>

                                        <div className='enter-code'>
                                            <div className='title'>And enter Your Google authenticator six-digit code
                                            </div>
                                            <input
                                                type="text"
                                                value={totpCode}
                                                onChange={(e) => this.setState({totpCode: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className='activate-btn' onClick={this.activateTwoFactor}>
                                        Activate
                                    </div>
                                </div>
                                : ''}
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

                {/*--------------------*/}
                {/*<div className='page-title'>*/}
                    {/*My login history*/}
                {/*</div>*/}

                {/*<LoginHistory/>*/}
                {/*--------------------*/}

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="modal-window">
                        <div className="close-modal-btn" onClick={this.closeModal}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </div>

                        <ProfileVerification
                        userId={id}
                        onExit={this.exitModal}
                        onClose={this.closeModal}
                        />
                    </div>
                </Modal>

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
