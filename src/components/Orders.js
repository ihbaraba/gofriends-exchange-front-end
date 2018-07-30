import React, {Component} from 'react';
import {Input, Button } from 'antd';
import io from 'socket.io-client';

import 'antd/lib/input/style/css';


import '../App.css';

class Orders extends Component {
    constructor(props) {
        super(props);

        this.InputsFrame = this.InputsFrame.bind(this);

        this.state = {
            price: this.props.price,//price of the fist coin of the pair
            first: this.props.first,//name of the fist coin of the pair
            second: this.props.second,//name of the 2nd coin of the pair
            loanRate: this.props.loanRate,
            total: this.props.price * 1,
            amount: 1,
        };
    }

    InputsFrame = ({first, second, loanRate, firePostToServer, type}) => {
        const optionsPrice = {
            addonAfter: first,
            style: { width: '15rem' },
            value: this.state.price,
            onChange: (e) => {
                const price = e.target.value;
                const total = price * this.state.amount;
                console.log(e.target.value, total);
                this.setState({
                        price,
                        total,
                });
            }
        };
        const optionsAmount = {
            addonAfter: second,
            style: { width: '15rem' },
            value: this.state.amount,
            onChange: (e) => {
                const amount = e.target.value;
                const total =  this.state.price * amount;
                console.log(e.target.value, total);
                this.setState({
                    amount,
                    total,
                });
            }
        };
        const optionsLoanRate = {
            addonAfter: loanRate,
            style: { width: '15rem' },
            value: this.state.loanRate,
            onChange: (e) => {
                const val = e.target.value;
                console.log(e.target.value, e.target, e);
                this.setState({loanRate: val});
            }
        };
        const optionsTotal = {
            addonAfter: first,
            style: { width: '15rem' },
            value: this.state.total,
            onChange: (e) => {
                const total = e.target.value;
                console.log(e.target.value, e.target, e);
                const price = total / this.state.amount;
                this.setState({total, price});
            }
        };
        const onBidButtonClick = ({type}) => {
            firePostToServer({
                price: this.state.price,
                amount: this.state.amount,
                loanRate: this.state.loanRate,
                type,
            });
        };
        // console.log(this.state.price,this.state.amount, this.state.total);
        return (
            <div style={{width: "30 rem",}}>
                <span>Price:</span><Input {...optionsPrice} />
                <span>Amount:</span><Input {...optionsAmount}/>
                <span>Loan Rate:</span> <Input  {...optionsLoanRate}/>
                <span>Total:</span><Input {...optionsTotal}/>
                <Button type="primary" ghost onClick={() => { onBidButtonClick({type})} }>Bid!</Button>
            </div>
        )
    };

    render() {
        // console.log( this.state);
        const {first, second, price, loanRate, firePostToServer} = this.props;
        const {total} = this.state;
        // console.log(first, second, price, total, loanRate);
        return (
            <div className="orders">
                <div className="marketDepthTables">
                    <div className="marketDepthColumns">
                        <span>Buy{`${first}`}</span>
                        {this.InputsFrame({first, second, price, loanRate, firePostToServer, type : "buy"})}
                    </div>
                    <div className="marketDepthColumns">
                        <span>Limits</span>
                    </div>
                    <div className="marketDepthColumns">
                        <span>Sell</span>
                        {this.InputsFrame({first, second, price, loanRate, firePostToServer, type : "sell"})}
                    </div>
                </div>
            </div>
        )
    }
}

export default Orders;
