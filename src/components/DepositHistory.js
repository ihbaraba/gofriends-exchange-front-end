import React, {Component} from 'react';
import Header from './Header';
import NavLink from './NavLink';
import Footer from './Footer';
import '../App.css';
import Header2 from "./Header2";


class DepositHistory extends Component {


    render() {
        return (
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">DEPOSIT & WITHDRAWAL HISTORY</h1>
                </div>
                <div className="orderBookWrap">
                    <h3 id="depositsHeading">Deposit History</h3>
                    <p>ZEC/USDT</p>
                    <table className="orderBook">
                        <tbody>
                        <tr>
                            <th>Type</th>
                            <th>Price(USDT)</th>
                            <th>Amount(ZEC)</th>
                            <th>Total(USDT)</th>
                            <th>Stop/Rate</th>
                            <th>Date</th>
                        </tr>
                        <tr>
                            <td>Buy</td>
                            <td>612.00000000</td>
                            <td>0.3000000</td>
                            <td>183.6000000</td>
                            <td>-</td>
                            <td>2018-07-02  12:04:54</td>
                        </tr>
                        </tbody>
                    </table>

                    <h3 id="depositsHeading">WITHDRAWAL HISTORY</h3>
                    <p>ZEC/USDT</p>
                    <table className="orderBook">
                        <tbody>
                        <tr>
                            <th>Type</th>
                            <th>Price(USDT)</th>
                            <th>Amount(ZEC)</th>
                            <th>Total(USDT)</th>
                            <th>Stop/Rate</th>
                            <th>Date</th>
                        </tr>
                        <tr>
                            <td>Buy</td>
                            <td>612.00000000</td>
                            <td>0.3000000</td>
                            <td>183.6000000</td>
                            <td>-</td>
                            <td>2018-07-02  12:04:54</td>
                        </tr>
                        </tbody>
                    </table>
                </div>




            </div>
        )
    }
}

export default DepositHistory;