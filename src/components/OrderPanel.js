import React, {Component} from 'react';
import Header from './Header';
import NavLink from './NavLink';
import Footer from './Footer';
import '../App.css';
import Header2 from "./Header2";


class OrderPanel extends Component {


    render() {
        return (
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Orders panel</h1>
                </div>
                <div className="orderBookWrap">
                    <table className="orderBook">
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Price(USDT)</th>
                            <th>Amount(ZEC)</th>
                            <th>Total(USDT)</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>M12.3</td>
                            <td>Buy</td>
                            <td>612.00000000</td>
                            <td>0.3000000</td>
                            <td>183.6000000</td>
                            <td>2018-07-02  12:04:54</td>
                            <td>Cancel</td>
                        </tr>

                        </tbody>
                    </table>
                </div>



            </div>
        )
    }
}

export default OrderPanel;