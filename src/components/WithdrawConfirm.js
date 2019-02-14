import React, {Component} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import {NavLink} from 'react-router-dom';

import {CONFIRM_WITHDRAW} from '../constants/APIURLS'

import stopwatch from '../img/stopwatch.svg';

class WithdrawConfirm extends Component {
    componentDidMount() {
        let urlParams = queryString.parseUrl(this.props.location.search).query;
        axios.get(`${CONFIRM_WITHDRAW}/${urlParams.token}`)
    }

    render() {
        return (
            <div className='confirm-page'>
                <div className='title'>
                    Your application is accepted
                </div>
                <div className="description">
                    You have confirmed the withdrawal. <br/>
                    Wait for the admin to confirm the withdrawal.
                </div>
                <img src={stopwatch} alt=""/>
                <div className='description'>It usually takes a few minutes.</div>

                <button className='green-btn'>
                    <NavLink to='/login'>
                        Ok
                    </NavLink>
                </button>
            </div>
        )
    }
}

export default WithdrawConfirm;