import React from 'react';
import logo from '../img/logo_go.svg';
import NavLink from './NavLink';

import '../styles/footer.css';

const Footer = () => {
    return (
        <div className="footer ">
            <div className="footer-container size-container">
                <div className="group">
                    {/*<img src={logo} alt="Exchange"/>*/}

                    <div className="meta">
                    <div className="group" style={{fontSize: '40px'}}>Sinsline</div>
                    <div className="footer-info" style={{fontSize: '12px'}}>
                    <div><p>Musterstrasse 1</p><p>Musterort, Germany</p></div>
                    <div><a href="tel:+49123456789">Tel. +49123456789</a><a
                    href="mailto:sinsline21@gmail.com">sinsline21@gmail.com</a></div>
                    </div>
                    </div>
                </div>

                <div className="links noWrap desktop">
                    <NavLink to="/contact">
                        <div className="group">
                            <span>About</span>
                        </div>
                    </NavLink>
                    <NavLink to="/terms">
                        <div className="group">
                            <span>Terms of Use</span>
                        </div>
                    </NavLink>

                    <NavLink to="/privacy">
                        <div className="group">
                            <span>Privacy Policy</span>
                        </div>
                    </NavLink>
                    <NavLink to="/contact">
                        <div className="group">
                            <span>Contact</span>
                        </div>
                    </NavLink>
                </div>

                <div className="links noWrap mobile">
                    <div>
                        <NavLink to="/contact">
                            About
                        </NavLink>
                        <NavLink to="/terms">
                            Terms of Use
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/privacy">
                            Privacy Policy
                        </NavLink>
                        <NavLink to="/contact">
                            Contact
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className='copyright-block'>
                © 2017 - 2018 SINSLINE. All rights reserved
            </div>
        </div>
    );
};

export default Footer;