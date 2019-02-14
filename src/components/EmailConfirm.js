import React, {Component} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import {NavLink} from 'react-router-dom';

import {REGISTER_CONFIRM} from '../constants/APIURLS'

import success from '../img/success.svg';

class EmailConfirm extends Component {
    componentDidMount() {
        let urlParams = queryString.parseUrl(this.props.location.search).query;
        axios.get(`${REGISTER_CONFIRM}/${urlParams.token}`)
    }

    render() {
        return (
            <div className='confirm-page'>
                <div className='title'>
                    Successful
                </div>
                <div className="description">
                    Your email has been successfully verified
                </div>
                <img src={success} alt=""/>

                <button className='green-btn'>
                    <NavLink to='/login'>
                        Ok
                    </NavLink>
                </button>
            </div>
        )
    }
}

export default EmailConfirm;