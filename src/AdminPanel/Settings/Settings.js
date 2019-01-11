import React, {Component} from 'react';
import axios from 'axios';

import RegistrationSettings from './RegistrationSettings';
import EmailSettings from './EmailSettings';

import {REGISTRATION_SETTINGS, EMAIL_SETTINGS} from '../../constants/APIURLS';
import {changeSubPage} from "../../actions/AdminActions";
import {connect} from "react-redux";

class Settings extends Component {
    state = {
        registrationParams: {},
        currencyParams: {},
        emailParams: [],
    };

    async componentDidMount() {
        const [registration, email] = await Promise.all([axios.get(REGISTRATION_SETTINGS), axios.get(EMAIL_SETTINGS),]);

        this.setState({
            registrationParams: registration.data[0],
            currencyParams: registration.data[1],
            emailParams: email.data
        })
    }

    handlerChangeRegistrationSettings = async (value, id) => {
        if (id === this.state.registrationParams.id) {
            const res = await axios.put(`${REGISTRATION_SETTINGS}/${id}`, {
                value
            });
            this.setState({registrationParams: res.data})
        } else {
            const res = await axios.put(`${REGISTRATION_SETTINGS}/${id}`, {
                value
            });
            this.setState({currencyParams: res.data})
        }
    };

    handlerChangeEmailSettings = async (value, trigger) => {
        const res = await axios.put(`${EMAIL_SETTINGS}/${trigger}`, {
            isEnabled: value
        });

        let newEmailParams = await this.state.emailParams.map(item => {
            if (item.trigger === trigger) {
                item.enabled = value
            }

            return item
        });

        this.setState({emailParams: newEmailParams})
    };

    handleOpenEmail = (email) => {
        this.props.changeSubPage({title: email.subject});
        this.props.history.push(`/admin/settings/${email.trigger}`)
    }

    render() {
        const {registrationParams, emailParams, currencyParams} = this.state;

        return (
            <div className="settings-page">
                <RegistrationSettings
                    params={registrationParams}
                    currencyParams={currencyParams}
                    onChange={this.handlerChangeRegistrationSettings}
                />

                <EmailSettings
                    params={emailParams}
                    onChange={this.handlerChangeEmailSettings}
                    openEmail={this.handleOpenEmail}
                />
            </div>
        )
    }
}



const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    changeSubPage: (page) => dispatch(changeSubPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);