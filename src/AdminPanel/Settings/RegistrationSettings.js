import React from 'react';
import {Switch} from 'antd';


const RegistrationSettings = ({params, onChange}) => (
    <div className='registration-settings'>
        <h1>Registration</h1>

        <span>Disable</span>

        <Switch
            className='switch'
            checked={params.value}
            onChange={(e) => onChange(e, params.id)}
        />

        <span>Enable</span>
    </div>
);

export default RegistrationSettings;