import React from 'react';
import logo from '../img/logo_go.svg';
import NavLink from './NavLink';
import '../styles/footer.css';


const Footer = () => {
    return (
        <div className="footer ">
            <div className="footer-container size-container">
                <div className="group">
                    <img src={logo} alt="Exchange"/>
                </div>

                <div className="links noWrap">
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
            </div>

            <div className='copyright-block'>
                © 2017 - 2018  Gofriends.pro. All rights reserved
            </div>
        </div>
    );
};

export default Footer;