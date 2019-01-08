import React from 'react';

const ShortUserInformation = () => {
    return (
        <div className="short-information-block">
            <div className='item'>
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                <div>Active</div>
            </div>

            <div className='item'>
                <div>Mark891</div>
                <div>id 7689</div>
                <div>2018-12-06  10:13:09</div>
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