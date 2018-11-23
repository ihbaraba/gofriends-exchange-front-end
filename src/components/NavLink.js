import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';



class NavLink2 extends Component{

    render() {
        return(
            <NavLink {...this.props} activeClassName="active"/>
        )

    }
}

export default NavLink2;


