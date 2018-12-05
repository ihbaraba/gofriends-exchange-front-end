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
                            <h3>About</h3>
                        </div>
                    </NavLink>
                    <NavLink to="/terms">
                        <div className="group">
                            <h3>Terms of Use</h3>
                        </div>
                    </NavLink>
                    <NavLink to="/privacy">
                        <div className="group">
                            <h3>Privacy Policy</h3>
                        </div>
                    </NavLink>
                    <NavLink to="/contact">
                        <div className="group">
                            <h3>Contact</h3>
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