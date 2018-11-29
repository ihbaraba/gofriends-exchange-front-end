import React, {Component} from 'react';
import UserOrder from "./UserOrder";

import '../App.css';
import {connect} from "react-redux";

class OpenOrders extends Component {
    render() {
        const {user: {username, email}} = this.props;

        return (
            <div>
                <div className="card-container, currencysPairs" style={{width: "70vw", margin: "auto"}}>
                    <div className="card-container-head">
                        <p className="h2">
                            Name:&emsp;<strong>{`${username}`}</strong>&emsp; &emsp; &emsp; &emsp;  E-mail:&emsp;
                            <strong>{`${email}`}</strong>
                        </p>

                        <div style={{clear: "both"}}>
                            <h1 className="sign">YOUR OPEN ORDERS</h1>
                        </div>

                        <UserOrder completed="false"/>
                    </div>
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