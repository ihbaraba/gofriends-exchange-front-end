import React, {Component, Fragment} from 'react';
import logo from '../img/logo_go.svg';
import userIcon from '../img/user_icon.svg';
import NavLink from './NavLink';
import {Menu, Dropdown} from 'antd';

import '../styles/header.css';

class Header extends Component {
    menu1 = (
        <Menu>
            {/*<Menu.Item>*/}
            {/*<NavLink to="/balances">*/}
            {/*<span className="title topLevel">TRANSFER BALANCES</span>*/}
            {/*</NavLink>*/}
            {/*</Menu.Item>*/}

            <Menu.Item>
                <NavLink to="/balances">
                    <span className="title topLevel">Deposits & withdrawals</span>
                </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to="/DepositHistory">
                    <span className="title topLevel">Deposit history</span>
                </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to="/withdrawalpanel">
                    <span className="title topLevel">Withdrawal history</span>
                </NavLink>
            </Menu.Item>

        </Menu>
    );

    menu2 = (
        <Menu>
            <Menu.Item>
                <NavLink to="/OpenOrders">
                    <span className="title topLevel">My open orders</span>
                </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to="/orders">
                    <span className="title topLevel">My trade history & analysis</span>
                </NavLink>
            </Menu.Item>
        </Menu>
    );

    menu3 = (
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
            <Menu.Item>
                <NavLink to="/changepassword">
                    <span className="title topLevel">Change Password</span>
                </NavLink>
            </Menu.Item>
        </Menu>
    );

    menu4 = (
        <Menu>
            <Menu.Item>
                <NavLink to="/profile">
                    <span className="title topLevel">My Profile</span>
                </NavLink>
            </Menu.Item>
            {/*<Menu.Item>*/}
                {/*<NavLink to="/loginhistory">*/}
                    {/*<span className="title topLevel">Login History</span>*/}
                {/*</NavLink>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item>*/}
                {/*<NavLink to="/changepassword">*/}
                    {/*<span className="title topLevel">Account settings</span>*/}
                {/*</NavLink>*/}
            {/*</Menu.Item>*/}
            <Menu.Item>
                <NavLink to="/Logout">
                    <span className="title topLevel">Logout</span>
                </NavLink>
            </Menu.Item>

            {/*<Menu.Item>*/}
            {/*<NavLink to="/exchange">*/}
            {/*<span className="title topLevel">Linked Accounts</span>*/}
            {/*</NavLink>*/}
            {/*</Menu.Item>*/}
        </Menu>
    );

    renderMenu = () => {
        let isLoggedIn = sessionStorage.getItem('exchange_token') ? true : false;

        if (isLoggedIn) {
            return (
                <Fragment>
                    <Dropdown overlay={this.menu1}>
                        <NavLink to="/balances">
                            <span className="title topLevel">
                                Balances
                                {/*<i className="fa fa-caret-down dim"></i>*/}
                            </span>
                        </NavLink>
                    </Dropdown>

                    <Dropdown overlay={this.menu2}>
                        <NavLink to="/OpenOrders">
                            <span className="title topLevel">
                                Orders
                                {/*<i className="fa fa-caret-down dim"></i>*/}
                            </span>
                        </NavLink>
                    </Dropdown>

                    {/*<Dropdown overlay={this.menu3}>*/}
                    {/*<NavLink to='/changepassword'>*/}
                    {/*<span className="title topLevel">*/}
                    {/*Settings*/}
                    {/*/!*<i className="fa fa-caret-down dim"></i>*!/*/}
                    {/*</span>*/}
                    {/*</NavLink>*/}
                    {/*</Dropdown>*/}

                    <Dropdown overlay={this.menu4}>
                        <NavLink to="/profile">
                        <span className="title topLevel">
                            {/*<i className="fa fa-user-o" aria-hidden="true"></i>*/}
                            <img src={userIcon} alt=""/>
                            {/*<i className="fa fa-caret-down dim"></i>*/}
                        </span>
                        </NavLink>
                    </Dropdown>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div className="message">
                        <div className='logout-navigtion'>
                            <NavLink to="/balances">
                            <span className="title topLevel">
                                Support
                                {/*<i className="fa fa-caret-down dim"></i>*/}
                            </span>
                            </NavLink>

                            <NavLink to="/balances">
                            <span className="title topLevel">
                                News
                                {/*<i className="fa fa-caret-down dim"></i>*/}
                            </span>
                            </NavLink>
                        </div>
                        <NavLink className="header-create" to="/signup">Sign up</NavLink>
                        <NavLink className="header-sign" to="/login">Log in</NavLink>
                    </div>
                </Fragment>

            )
        }
    };

    render() {
        return (
            <header>
                <div className='size-container'>
                    <div className='header'>
                        <div className="logo">
                            <NavLink to="/">
                                <img src={logo} alt="logo"/>
                                {/*<span style={{fontSize: '48px'}}>Sinsline</span>*/}
                            </NavLink>
                        </div>
                        <div className="tabs exchange-link">
                            <NavLink to="/exchange">Exchange</NavLink>
                        </div>

                        <div className="tabs right">
                            {this.renderMenu()}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;

