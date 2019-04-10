import React from 'react';
import logo from '../img/Logo.png';
import NavLink from './NavLink';
import '../App.css';
import {Menu, Dropdown} from 'antd';

const Header2 = () => {
    const menu1 = (
        <Menu>
            {/*<Menu.Item>*/}
            {/*<NavLink to="/balances">*/}
            {/*<span className="title topLevel">TRANSFER BALANCES</span>*/}
            {/*</NavLink>*/}
            {/*</Menu.Item>*/}

            <Menu.Item>
                <NavLink to="/balances">
                    <span className="title topLevel">DEPOSITS & WITHDRAWALS</span>
                </NavLink>
            </Menu.Item>

            {/*<Menu.Item>*/}
            {/*<NavLink to="/DepositHistory">*/}
            {/*<span className="title topLevel">HISTORY</span>*/}
            {/*</NavLink>*/}
            {/*</Menu.Item>*/}
        </Menu>
    );

    const menu2 = (
        <Menu>
            <Menu.Item>
                <NavLink to="/orders">
                    <span className="title topLevel">MY OPEN ORDERS</span>
                </NavLink>
            </Menu.Item>
            {/*<Menu.Item>*/}
            {/*<NavLink to="/orders">*/}
            {/*<span className="title topLevel">MY TRADE HISTORY & ANALYSIS</span>*/}
            {/*</NavLink>*/}
            {/*</Menu.Item>*/}
        </Menu>
    );

    const menu3 = (
        <Menu>
            {/*<Menu.Item>*/}
            {/*<NavLink to="/exchange">*/}
            {/*<span className="title topLevel">API Keys</span>*/}
            {/*</NavLink>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item>*/}
            {/*<NavLink to="/exchange">*/}
            {/*<span className="title topLevel">Trading Tier Status</span>*/}
            {/*</NavLink>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item>*/}
            {/*<NavLink to="/loginhistory">*/}
            {/*<span className="title topLevel">Login History</span>*/}
            {/*</NavLink>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item>*/}
            {/*<NavLink to="/changepassword">*/}
            {/*<span className="title topLevel">Change Password</span>*/}
            {/*</NavLink>*/}
            {/*</Menu.Item>*/}
            <Menu.Item>
                <NavLink to="/Logout">
                    <span className="title topLevel">Logout</span>
                </NavLink>
            </Menu.Item>
        </Menu>
    );

    const menu4 = (
        <Menu>
            <Menu.Item>
                <NavLink to="/profile">
                    <span className="title topLevel">My Profile</span>
                </NavLink>
            </Menu.Item>
            {/*<Menu.Item>*/}
            {/*<NavLink to="/exchange">*/}
            {/*<span className="title topLevel">Linked Accounts</span>*/}
            {/*</NavLink>*/}
            {/*</Menu.Item>*/}
        </Menu>
    );

    return (
        <div className="header">
            <div className="logo">
                {/*<NavLink to="/exchange"><img src={logo} alt="logo"/></NavLink>*/}
            </div>

            <div className="tabs">
                <ul>
                    <li><NavLink to="/exchange">Exchange</NavLink></li>
                    {/*<li><NavLink to="/marginTrading">Margin Trading</NavLink></li>*/}
                    {/*<li><NavLink to="/lending">Lending</NavLink></li>*/}
                </ul>
            </div>

            <div className="tabs right ">
                <div>
                    <Dropdown overlay={menu1}>
                        <NavLink to="/balances">
                            <span className="title topLevel">
                                Balances
                                <i className="fa fa-caret-down dim"></i>
                            </span>
                        </NavLink>
                    </Dropdown>

                    <Dropdown overlay={menu2}>
                        <NavLink to="/orders">
                            <span className="title topLevel">
                                Orders
                                <i className="fa fa-caret-down dim"></i>
                            </span>
                        </NavLink>
                    </Dropdown>

                    <Dropdown overlay={menu3}>
                        <a className="ant-dropdown-link" href="">
                            <span className="title topLevel">
                                <i className="fa fa-wrench"></i>
                                <i className="fa fa-caret-down dim"></i>
                            </span>
                        </a>
                    </Dropdown>

                    <Dropdown overlay={menu4}>
                        <NavLink to="/profile">
                        <span className="title topLevel">
                            <i className="fa fa-user"></i>
                            <i className="fa fa-caret-down dim"></i>
                        </span>
                        </NavLink>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
};

export default Header2;
