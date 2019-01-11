import React from 'react';
import {Switch} from 'antd';


const RegistrationSettings = ({params, onChange, currencyParams}) => (
    <div className='registration-settings'>
        <div>
            <h1>Registration</h1>

            <span>Disable</span>

            <Switch
                className='switch'
                checked={params.value}
                onChange={(e) => onChange(e, params.id)}
            />

            <span>Enable</span>
        </div>

        <div>
            <h1>Currency</h1>

            <span>Disable</span>

            <Switch
                className='switch'
                checked={currencyParams.value}
                onChange={(e) => onChange(e, currencyParams.id)}
            />

            <span>Enable</span>
        </div>
    </div>
);

export default RegistrationSettings;