import React from 'react';
import {Icon} from 'antd';

import NavLink from '../../components/NavLink';

import userIcon from '../../img/admin-panel/user_ic.svg';
import notifIcon from '../../img/admin-panel/notif.svg';

const Header = ({user, page}) => {
    return (
        <div className='admin-header'>
            <div className='current-page-name'>{page}</div>
            <div className='user-navigation'>
                <img src={notifIcon} alt=""/>
                
                <img src={userIcon} alt=""/>

                <span className='user-email'>
                    {user.email}
                </span>

                <NavLink to="/Logout">
                    <Icon type="logout"/>
                </NavLink>
            </div>
        </div>
    )
}

export default Header;
