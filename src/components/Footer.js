import React from 'react';
import logo from '../img/Logo.png';
import NavLink from './NavLink';
import '../App.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">

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
                    <NavLink to="/support">
                        <div className="group">
                            <h3>Support</h3>
                        </div>
                    </NavLink>
                </div>

                <div className="meta">
                    <div className="group">
                        <img src={logo} alt="Exchange"/>
                    </div>
                    <div className="footer-info">
                        <div>
                            <p>
                                28a Panasa Mirnogo street
                            </p>
                            <p>
                                Kyiv, Ukraine
                            </p>
                        </div>
                        <div>
                            <a href="tel:+380630101797">
                                Tel. +38 063 01 01 797
                            </a>
                            <a href="mailto:evgeniymeo@gmail.com">
                                evgeniymeo@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;