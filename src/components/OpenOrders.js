import React, {Component} from 'react';
import '../App.css';

class OpenOrders extends Component {
    render() {
        return (
            <div>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Your open Orders</h1>
                </div>
                <div className="ordwrap"><h2>You have no open orders.</h2></div>
            </div>
        )
    }
}

export default OpenOrders;
