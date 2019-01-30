import React, {Fragment} from 'react';
import {Icon} from 'antd';

import NavLink from '../../components/NavLink';

import userIcon from '../../img/admin-panel/user_ic.svg';
import notifIcon from '../../img/admin-panel/notif.svg';

const Header = ({user, page, back}) => {
    return (
        <div className='admin-header'>
            <div className='current-page'>
                {page.subLink ?
                    <Fragment>
                        <span className='underline' onClick={back}>
                        <NavLink to={`/admin/${page.href}`}>
                            {page.title}
                        </NavLink>
                        </span>

                        <Icon type="arrow-right"/>

                        <span className="sub-link-name">{page.subLink.title}</span>
                    </Fragment>
                    :
                    <NavLink to={`/admin/${page.href}`}>
                        {page.title}
                    </NavLink>
                }
            </div>

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
