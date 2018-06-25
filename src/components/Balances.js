import React, {Component} from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';

class Balances extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">BALANCES, DEPOSITS & WITHDRAWALS</h1>
                    <h3>Estimated value of holdings: $0.00 USD / 0.00000000 BTC</h3>
                </div>
            </div>
        )
    }
}

export default Balances;
