import React from 'react';
import moment from 'moment';

const ShortUserInformation = ({user}) => {
    return (
        <div className="short-information-block">
            <div className='user-avatar'>
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                <div style={{color: user.status==='active' ? '#00CE7D':'#fff'}}>{user.status}</div>
            </div>

            <div className='item'>
                <div className='user-name'>{user.name}</div>
                <div className='user-id'>{user.id}</div>
                <div className='registration-date'>{moment(user.createdAt).format('YYYY-MM-DD HH:mm')}</div>
            </div>

            <div className='item'>
                <label>Email</label>
                <input type="email" value={user.email} disabled/>
                <span className='verified-status'>*Verified</span>
            </div>

            <div className='item'>
                <label>Two factor</label>
                <input type="text" value={user.twoFactorAuthEnabled} disabled/>
                <span className='verified-status'>*With Google Authentication</span>
            </div>
        </div>
    )
}

export default ShortUserInformation;