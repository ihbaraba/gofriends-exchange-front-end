import React, {Component} from 'react';
import '../App.css';
import Header2 from "./Header2";


class Transactions extends Component {


    render() {
        return (
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Transaction panel</h1>
                </div>

                <div className="orderBookWrap">
                    <table className="orderBook">
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Transaction type</th>
                            <th>Currency account type</th>
                            <th>Date</th>
                        </tr>
                        <tr>
                            <td>M12.3</td>
                            <td>Buy</td>
                            <td>BTC</td>
                            <td>2018-07-02 12:04:54</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Transactions;