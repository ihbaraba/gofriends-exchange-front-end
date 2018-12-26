import React from 'react';
import {Menu} from 'antd';
import NavLink from '../../components/NavLink';
import ReactSVG from 'react-svg';

import logo from '../../img/logo_go_admin.svg';
import dashboard from '../../img/admin-nav-bar-icons/dashboard.svg';
import users from '../../img/admin-nav-bar-icons/users.svg';
import adminWallet from '../../img/admin-nav-bar-icons/admin_wallet.svg';
import withdrawList from '../../img/admin-nav-bar-icons/withdrawal.svg';
import tradeHistory from '../../img/admin-nav-bar-icons/trade_hisr.svg';
import comissions from '../../img/admin-nav-bar-icons/comissions.svg';
import news from '../../img/admin-nav-bar-icons/news.svg';
import settings from '../../img/admin-nav-bar-icons/settings.svg';
import report from '../../img/admin-nav-bar-icons/report.svg';
import pairs from '../../img/admin-nav-bar-icons/pairs.svg';


const NavBar = ({changePage}) => {
    const menu = [
        {
            title: 'Dashboard',
            href: 'dashboard',
            icon: dashboard
        },
        {
            title: 'Users',
            href: 'users',
            icon: users
        },
        {
            title: 'Admin wallet',
            href: 'admin_wallet',
            icon: adminWallet
        },
        {
            title: 'Withdraw list',
            href: 'withdraw_list',
            icon: withdrawList
        },
        {
            title: 'Trade history',
            href: 'trade_history',
            icon: tradeHistory
        },
        {
            title: 'Commissions',
            href: 'commissions',
            icon: comissions
        },
        {
            title: 'News',
            href: 'news',
            icon: news
        },
        {
            title: 'Settings',
            href: 'settings',
            icon: settings
        },
        {
            title: 'All time report',
            href: 'report',
            icon: report
        },
        {
            title: 'Pairs',
            href: 'pairs',
            icon: pairs
        },
    ];


    return (
        <div className='nav-bar'>
            <img src={logo} alt="logo" className='logo'/>

            <Menu
                defaultSelectedKeys={['0']}
                // defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                // inlineCollapsed={true}
            >
                {menu.map((item, index) => (
                    <Menu.Item key={index} onClick={() => changePage(item)}>
                        <NavLink to={`/admin/${item.href}`}>
                            <div className='link-side'>
                                <ReactSVG
                                    src={item.icon}
                                    svgClassName='menu-icon'
                                    className='wrapper-svg-icon'
                                />
                                <span>{item.title}</span>
                            </div>
                        </NavLink>
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    )
};

export default NavBar;