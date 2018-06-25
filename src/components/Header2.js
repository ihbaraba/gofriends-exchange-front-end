import React from 'react';
import logo from '../img/Logo.png';
import NavLink from './NavLink';
import '../App.css';

const Header2 = () => {
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
                <ul>

                    <li className="desktopNav hideAlert ">
                        <NavLink to="/balances">
                        <span className="title topLevel">Balances
                            <i className="fa fa-caret-down dim"></i>
                        </span>
                        </NavLink>
                    </li>
                    <li className="desktopNav hideAlert">
                        <NavLink to="/orders">
                        <span className="title topLevel">
                            Orders
                            <i className="fa fa-caret-down dim"></i>
                        </span>
                        </NavLink>

                    </li>
                    <li className="desktopNav hideAlert">
                        <span className="title topLevel">
                            <i className="fa fa-wrench"></i>
                            <i className="fa fa-caret-down dim"></i>
                        </span>
                    </li>
                    <li className="desktopNav hideAlert active">
                        <NavLink to="/profile">
                        <span className="title topLevel">
                            <i className="fa fa-user"></i>
                            <i className="fa fa-caret-down dim"></i>
                        </span>
                        </NavLink>

                    </li>


                </ul>
            </div>
        </div>
    )
};

export default Header2;
