import React, {Component} from 'react';
import Header from './Header';
import NavLink from './NavLink';
import Footer from './Footer';
import '../App.css';
import Header2 from "./Header2";


class Withdrawalpanel extends Component {


    render() {
        return (
            <div>
                <Header2/>
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

                <Footer/>

            </div>
        )
    }
}

export default Withdrawalpanel;