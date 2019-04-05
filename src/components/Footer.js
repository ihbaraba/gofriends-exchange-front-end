import React from 'react';
import logo from '../img/logo_footer.png';
import NavLink from './NavLink';
import Pdf from '../img/beetok_wp_eng.pdf';

import '../styles/footer.css';

const Footer = () => {
    return (
        <div className="footer ">
            <div className="footer-container size-container">
                <div className="group">
                    <div className="meta logo">
                        <img src={logo} alt=""/>
                        {/*<div className="group" style={{fontSize: '40px'}}>Beetok</div>*/}
                    </div>
                </div>

                <div className="links noWrap desktop">
                    <a href={Pdf} target='_blank'>
                        About
                    </a>
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
                        <a href={Pdf} target='_blank'>
                            About
                        </a>
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
                © 2017 - 2018 Beetok All rights reserved
            </div>
        </div>
    );
};

export default Footer;