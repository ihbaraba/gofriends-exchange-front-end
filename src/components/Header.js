import React, {Component} from 'react';
import logo from '../img/Logo.png';
import NavLink from './NavLink';
import '../App.css';


class Header extends Component {
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
                    <div className="tabs right loggedOut">
                        <ul>


                            <li className="message">
                                <span className="title"><NavLink className="header-sign"  to="/login">Sign in</NavLink>  <NavLink className="header-create" to="/signup">Create an Account</NavLink></span>
                            </li>




                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

export default Header;

