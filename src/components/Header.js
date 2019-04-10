import React, {Component, Fragment} from 'react';
import logo from '../img/logo_go.svg';
import userIcon from '../img/user_icon.svg';
import userGreenIcon from '../img/avatarGreen.svg';
import NavLink from './NavLink';
import {Menu, Dropdown, Tooltip} from 'antd';
import {slide as MenuBurger} from 'react-burger-menu';
import Pdf from '../img/beetok_wp_eng.pdf';

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
                    <span className="title topLevel">Deposits & Withdrawals</span>
                </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to="/DepositHistory">
                    <span className="title topLevel">Deposit History</span>
                </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to="/withdrawalpanel">
                    <span className="title topLevel">Withdrawal History</span>
                </NavLink>
            </Menu.Item>

        </Menu>
    );

    menu2 = (
        <Menu>
            <Menu.Item>
                <NavLink to="/OpenOrders">
                    <span className="title topLevel">My Open Orders</span>
                </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to="/orders">
                    <span className="title topLevel">My Trade History & Analysis</span>
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
            <Menu.Item>
                <NavLink to="/news">
                    <span className="title topLevel">News</span>
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
                <NavLink to="/Logout" className='logout'>
                    <span className="title topLevel" style={{color: '#DD4457'}}>Logout</span>
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
                    {/*<a href='https://beetok.io' className='ant-dropdown-trigger' target='_blank'>*/}
                                {/*<span className="title topLevel">*/}
                                {/*About*/}
                            {/*</span>*/}
                    {/*</a>*/}

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
                            {/*<a href='https://beetok.io' target='_blank'>*/}
                                {/*<span className="title topLevel">*/}
                                {/*About*/}
                            {/*</span>*/}
                            {/*</a>*/}

                            <Tooltip placement="bottom" title={'Coming Soon'}>
                                <NavLink to="/">
                                   <span className="title topLevel">
                                        Support
                                   </span>
                                </NavLink>
                            </Tooltip>

                            <NavLink to="/news">
                            <span className="title topLevel">
                                News
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
        let isLoggedIn = sessionStorage.getItem('exchange_token') ? true : false;

        return (
            <header>
                <div className='size-container' style={{height: '100%'}}>
                    <div className='header'>
                        <div className="logo">
                            <NavLink to="/">
                                <img src={logo} alt="logo"/>
                                {/*<span style={{fontSize: '48px'}}>Beetok</span>*/}
                            </NavLink>
                        </div>
                        <div className="tabs exchange-link">
                            <NavLink to="/exchange">Exchange</NavLink>
                        </div>

                        <div className="tabs right">
                            <div className='desk-nav'>
                                {this.renderMenu()}
                            </div>

                            <div className='mobile-nav'>
                                {!isLoggedIn ? <div className='mobile-authentication-link'>
                                    <NavLink className="header-create" to="/signup">Sign up</NavLink>
                                    <NavLink className="header-sign" to="/login">Login</NavLink>
                                </div> : ''}

                                <MenuBurger isOpen={false} right>
                                    {isLoggedIn ?
                                        <div className='burger-menu login'>
                                            <div className='top-side-burger-menu'>
                                                <img src={userGreenIcon} alt=""/>
                                                <NavLink className="header-sign" to="/profile">My profile</NavLink>
                                            </div>

                                            <div className='login-navigation'>
                                                <NavLink to="/exchange">
                                                    Exchange
                                                </NavLink>

                                                <div>
                                                    Balances

                                                    <div className="sub-menu">
                                                        <NavLink to="/balances">
                                                            Balances
                                                        </NavLink>

                                                        <NavLink to="/DepositHistory">
                                                            Deposit history
                                                        </NavLink>

                                                        <NavLink to="/withdrawalpanel">
                                                            Withdrawal history
                                                        </NavLink>
                                                    </div>

                                                </div>

                                                <div>
                                                    Orders

                                                    <div className="sub-menu">
                                                        <NavLink to="/OpenOrders">
                                                            My open orders
                                                        </NavLink>

                                                        <NavLink to="/orders">
                                                            My trade history
                                                        </NavLink>
                                                    </div>

                                                </div>

                                                <NavLink to="/balances">
                                                    News
                                                </NavLink>

                                                <NavLink to="/contact">
                                                    Contact
                                                </NavLink>

                                                {/*<a href='https://beetok.io' target='_blank'>*/}
                                {/*<span className="title topLevel">*/}
                                {/*About*/}
                            {/*</span>*/}
                                                {/*</a>*/}


                                                <NavLink to="/Logout">
                                                    Logout
                                                </NavLink>
                                            </div>
                                        </div>
                                        :
                                        <div className='burger-menu logout'>
                                            <div className='top-side-burger-menu'>
                                                <img src={userGreenIcon} alt=""/>
                                                <NavLink className="header-create" to="/signup">Sign up</NavLink>
                                                <NavLink className="header-sign" to="/login">Log in</NavLink>
                                            </div>

                                            <div className='logout-navigation'>
                                                <NavLink to="/">
                                                    Home
                                                </NavLink>

                                                <NavLink to="/balances">
                                                    Support
                                                </NavLink>

                                                <NavLink to="/balances">
                                                    News
                                                </NavLink>

                                                {/*<a href='https://beetok.io' target='_blank'>*/}
                                {/*<span className="title topLevel">*/}
                                {/*About*/}
                            {/*</span>*/}
                                                {/*</a>*/}

                                            </div>
                                        </div>
                                    }
                                </MenuBurger>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;

