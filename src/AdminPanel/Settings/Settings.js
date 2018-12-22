import React, {Component} from 'react';
import axios from 'axios';

import RegistrationSettings from './RegistrationSettings';
import EmailSettings from './EmailSettings';

import {SETTINGS_PARAMS} from '../../constants/APIURLS';

class Settings extends Component {
    state = {
        registrationParams: {},
        emailParams: [],
    };

    async componentDidMount() {
        const res = await axios.get(SETTINGS_PARAMS);
        let params = res.data;

        params.forEach(item => {
            if (item.name === 'registration') {
                this.setState({
                    registrationParams: item
                })
            } else {
                this.setState({
                    emailParams: [
                        ...this.state.emailParams,
                        item
                    ]
                })
            }
        });
    }

    handlerChangeSettings = async (value, id) => {
        if (id === this.state.registrationParams.id) {
            const res = await axios.put(`${SETTINGS_PARAMS}/${id}`, {
                value
            });
            this.setState({registrationParams: res.data})
        }
    };

    render() {
        const {registrationParams} = this.state;

        return (
            <div className="settings-page">
                <RegistrationSettings
                    params={registrationParams}
                    onChange={this.handlerChangeSettings}
                />

                <EmailSettings/>
            </div>
        )
    }
}

export default Settings;