import React from 'react';
import logo from '../img/Logo.png';
import NavLink from './NavLink';

const Footer = () => {
    return (
        <div className="footer">

            <div className="links noWrap">
                <NavLink to="/contact">
                <div className="group">
                    <h3>Contact Us</h3>
                </div>
                </NavLink>
                <NavLink to="/privacy">
                <div className="group">
                    <h3>Privacy Policy</h3>
                </div>
                </NavLink>
                <NavLink to="/terms">
                <div className="group">
                    <h3>Terms of Use</h3>
                </div>
                </NavLink>
            </div>

            <div className="meta">
                <div className="group">
                    <img src={logo} alt="Exchange"/>
                </div>
            </div>
        </div>
    );
};

export default Footer;