import React, {Component} from 'react';
import logo from '../img/Logo.png';
import NavLink from './NavLink';
import {Menu, Dropdown} from 'antd';


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
                    <span className="title topLevel">DEPOSITS & WITHDRAWALS</span>
                </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to="/DepositHistory">
                    <span className="title topLevel">DEPOSIT HISTORY</span>
                </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to="/withdrawalpanel">
                    <span className="title topLevel">WITHDRAWAL HISTORY</span>
                </NavLink>
            </Menu.Item>

        </Menu>
    );

    menu2 = (
        <Menu>
            <Menu.Item>
                <NavLink to="/OpenOrders">
                    <span className="title topLevel">MY OPEN ORDERS</span>
                </NavLink>
            </Menu.Item>

            <Menu.Item>
                <NavLink to="/orders">
                    <span className="title topLevel">MY TRADE HISTORY & ANALYSIS</span>
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
                <NavLink to="/loginhistory">
                    <span className="title topLevel">Login History</span>
                </NavLink>
            </Menu.Item>
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
        let isLoggedIn = localStorage.getItem('exchange_token') ? true : false;

        if (isLoggedIn) {
            return (
                <div>
                    <Dropdown overlay={this.menu1}>
                        <NavLink to="/balances">
                            <span className="title topLevel">
                                Balances
                                <i className="fa fa-caret-down dim"></i>
                            </span>
                        </NavLink>
                    </Dropdown>

                    <Dropdown overlay={this.menu2}>
                        <NavLink to="/OpenOrders">
                            <span className="title topLevel">
                                Orders
                                <i className="fa fa-caret-down dim"></i>
                            </span>
                        </NavLink>
                    </Dropdown>

                    <Dropdown overlay={this.menu3}>
                        <NavLink to='/changepassword'>
                            <span className="title topLevel">
                                <i className="fa fa-wrench"></i>
                                <i className="fa fa-caret-down dim"></i>
                            </span>
                        </NavLink>
                    </Dropdown>

                    <Dropdown overlay={this.menu4}>
                        <NavLink to="/profile">
                        <span className="title topLevel">
                            <i className="fa fa-user"></i>
                            <i className="fa fa-caret-down dim"></i>
                        </span>
                        </NavLink>
                    </Dropdown>
                </div>
            )
        } else {
            return (
                <ul>
                    <li className="message">
                        <span className="title">
                            <NavLink className="header-sign" to="/login">Sign in</NavLink>
                            <NavLink className="header-create" to="/signup">Create an Account</NavLink>
                        </span>
                    </li>
                </ul>
            )
        }
    };

    render() {
        return (
            <div className="App">
                <div className="header">
                    <div className="logo">
                        <NavLink to="/"><img src={logo} alt="logo"/></NavLink>
                    </div>
                    <div className="tabs">
                        <ul>
                            <li><NavLink to="/exchange">Exchange</NavLink></li>
                            {/*<li><NavLink to="/marginTrading">Margin Trading</NavLink></li>*/}
                            {/*<li><NavLink to="/lending">Lending</NavLink></li>*/}
                        </ul>
                    </div>

                    <div className="tabs right">
                        {this.renderMenu()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;

