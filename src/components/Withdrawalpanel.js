import React, {Component} from 'react';
import '../App.css';

class Withdrawalpanel extends Component {
    render() {
        return (
            <div>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Withdrawal panel</h1>
                </div>

                <div className="orderBookWrap">
                    <table className="orderBook">
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Amount(ZEC)</th>
                            <th>Total(USDT)</th>
                        </tr>
                        <tr>
                            <td>M12.3</td>
                            <td>BTC</td>
                            <td>0.3000000</td>
                            <td>183.6000000</td>
                        </tr>

                        </tbody>
                    </table>
                </div>



            </div>
        )
    }
}

export default Withdrawalpanel;