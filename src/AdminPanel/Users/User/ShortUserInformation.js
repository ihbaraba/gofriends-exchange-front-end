import React from 'react';

const ShortUserInformation = () => {
    return (
        <div className="short-information-block">
            <div className='user-avatar'>
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                <div style={{color: '#00CE7D'}}>Active</div>
            </div>

            <div className='item'>
                <div className='user-name'>Mark891</div>
                <div className='user-id'>id 7689</div>
                <div className='registration-date'>2018-12-06  10:13:09</div>
            </div>

            <div className='item'>
                <label>Email</label>
                <input type="text"/>
                <span className='verified-status'>*Verified</span>
            </div>

            <div className='item'>
                <label>Two factor</label>
                <input type="text"/>
                <span className='verified-status'>*With Google Authentication</span>
            </div>
        </div>
    )
}

export default ShortUserInformation;