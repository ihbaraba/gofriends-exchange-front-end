import React from 'react';
import {Icon} from 'antd';

import NavLink from '../../components/NavLink';

const Header = ({user, page}) => {
    return (
        <div className='admin-header'>
            <div className='current-page-name'>{page}</div>
            <div className='user-navigation'>
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
