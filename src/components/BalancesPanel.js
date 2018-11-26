import React, {Component} from 'react';
import '../App.css';

class BalancesPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Balances, deposits & withdrowals</h1>
                </div>
                <div className="orderBookWrap">
                    <table className="orderBook">
                        <tbody>
                        <tr>
                            <th>Coin</th>
                            <th>Name</th>
                            <th>Total Balance</th>
                            <th>On Orders</th>
                            <th>BTC Value</th>
                            <th>Actions</th>
                            <th>Date</th>
                        </tr>
                        <tr>
                            <td>AMP</td>
                            <td>Synereo AMP</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>ARDR</td>
                            <td>Ardor</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>BCH</td>
                            <td>Bitcoin Cash</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>ARDR</td>
                            <td>Ardor</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>AMP</td>
                            <td>Synereo AMP</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>ARDR</td>
                            <td>Ardor</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>BCH</td>
                            <td>Bitcoin Cash</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>ARDR</td>
                            <td>Ardor</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>AMP</td>
                            <td>Synereo AMP</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>ARDR</td>
                            <td>Ardor</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>BCH</td>
                            <td>Bitcoin Cash</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>ARDR</td>
                            <td>Ardor</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>AMP</td>
                            <td>Synereo AMP</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>
                        <tr>
                            <td>ARDR</td>
                            <td>Ardor</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>0.00000000</td>
                            <td>Deposit Withdraw</td>
                            <td>2018-06-14 10:05:36</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default BalancesPanel;
