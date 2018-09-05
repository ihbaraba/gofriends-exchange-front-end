import React from 'react';
import logo from '../img/Logo.png';
import NavLink from './NavLink';
// import 'antd/dist/antd.css';
import '../App.css';
import { Menu, Dropdown, Icon } from 'antd';

const Header2 = () => {
    const menu1 = (
        <Menu>
            <Menu.Item>
                <a  rel="noopener noreferrer" href="">TRANSFER BALANCES</a>
            </Menu.Item>
            <Menu.Item>
                <a  rel="noopener noreferrer" href="/balancespanel">DEPOSITS & WITHDRAWALS</a>
            </Menu.Item>
            <Menu.Item>
                <a  rel="noopener noreferrer" href="#">HISTORY</a>
            </Menu.Item>
        </Menu>
    );
    const menu2 = (
        <Menu>
            <Menu.Item>
                <a  rel="noopener noreferrer" href="#">MY OPEN ORDERS</a>
            </Menu.Item>
            <Menu.Item>
                <a  rel="noopener noreferrer" href="#">MY TRADE HISTORY & ANALYSIS</a>
            </Menu.Item>
        </Menu>
    );
    const menu3 = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">TWO-FACTOR AUTHENTICATION</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">API Keys</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">Trading Tier Status</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">Login History</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">Change Password</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">Logout</a>
            </Menu.Item>
        </Menu>
    );
    const menu4 = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="/profile" target="">My Profile</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">Linked Accounts</a>
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="header">
            <div className="logo">
                <NavLink to="/exchange"><img src={logo} alt="logo"/></NavLink>
            </div>

            <div className="tabs">
                <ul>
                    <li><NavLink to="/exchange">Exchange</NavLink></li>
                    {/*<li><NavLink to="/marginTrading">Margin Trading</NavLink></li>*/}
                    {/*<li><NavLink to="/lending">Lending</NavLink></li>*/}
                </ul>
            </div>


            <div className="tabs right ">
                {/*<ul>*/}

                    {/*<li className="desktopNav hideAlert ">*/}
                        {/*<NavLink to="/balances">*/}
                        {/*<span className="title topLevel">Balances*/}
                            {/*<i className="fa fa-caret-down dim"></i>*/}
                        {/*</span>*/}
                        {/*</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className="desktopNav hideAlert">*/}
                        {/*<NavLink to="/orders">*/}
                        {/*<span className="title topLevel">*/}
                            {/*Orders*/}
                            {/*<i className="fa fa-caret-down dim"></i>*/}
                        {/*</span>*/}
                        {/*</NavLink>*/}

                    {/*</li>*/}
                    {/*<li className="desktopNav hideAlert">*/}
                        {/*<span className="title topLevel">*/}
                            {/*<i className="fa fa-wrench"></i>*/}
                            {/*<i className="fa fa-caret-down dim"></i>*/}
                        {/*</span>*/}
                    {/*</li>*/}
                    {/*<li className="desktopNav hideAlert active">*/}
                        {/*<NavLink to="/signup" >*/}
                        {/*<span className="title topLevel">*/}
                            {/*<i className="fa fa-user"></i>*/}
                            {/*<i className="fa fa-caret-down dim"></i>*/}
                        {/*</span>*/}
                        {/*</NavLink>*/}

                    {/*</li>*/}


                {/*</ul>*/}

                <div>
                    <Dropdown overlay={menu1}>

                        <NavLink to="/balances">
                            <span className="title topLevel">Balances
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
                        <a className="ant-dropdown-link" href="#">

                            <span className="title topLevel">
                                <i className="fa fa-wrench"></i>
                                <i className="fa fa-caret-down dim"></i>
                            </span>
                            {/*<Icon type="down" />*/}
                        </a>
                    </Dropdown>
                    <Dropdown overlay={menu4}>
                        <NavLink to="/signup" >
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
