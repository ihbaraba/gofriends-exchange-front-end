import React from 'react';
import logo from '../img/logo_go.svg';
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
                    {/*<a href='https://beetok.io' target='_blank'>*/}
                        {/*About*/}
                    {/*</a>*/}
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
                    {/*<a href={Pdf} target='_blank'>*/}
                        {/*White paper*/}
                    {/*</a>*/}

                </div>

                <div className="links noWrap mobile">
                    <div>
                        {/*<a href='https://beetok.io' target='_blank'>*/}
                            {/*About*/}
                        {/*</a>*/}
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
                        {/*<a href={Pdf} target='_blank'>*/}
                            {/*White paper*/}
                        {/*</a>*/}

                    </div>
                </div>
            </div>

            <div className='copyright-block'>
                © 2017 - 2018  Gofriends.pro. All rights reserved
            </div>
        </div>
    );
};

export default Footer;