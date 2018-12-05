import React, {Component} from 'react';
import UserOrder from "./UserOrder";

import '../App.css';
import {connect} from "react-redux";

class OpenOrders extends Component {
    render() {
        return (
            <div className="card-container">
                <div className="card-container-head">
                    <h3>My open orders</h3>
                </div>

                <div className='table'>
                    <UserOrder completed="false"/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        token: state.user.token
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenOrders)