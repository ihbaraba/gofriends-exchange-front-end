import React, {Component} from 'react';
import '../App.css';

class YourOpenOrders extends Component {
    render() {
        return (
            <div>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Your Open Orders</h1>
                </div>

                <div className="orderBookWrap">
                    <table className="orderBook">
                        <tbody>
                        <tr>
                            <th>Type</th>
                            <th>Price USDT)</th>
                            <th>Amount(ZEC)</th>
                            <th>Total(USDT)</th>
                            <th>Stop/Rate</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>Buy</td>
                            <td>612.000000</td>
                            <td>0.30000000</td>
                            <td>183.6000000</td>
                            <td>-</td>
                            <td>2018-07-02 12:04:54</td>
                            <td>Cancel</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default YourOpenOrders;