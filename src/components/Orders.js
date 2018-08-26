import React, {Component} from 'react';
import {Input, Button } from 'antd';
import io from 'socket.io-client';

// import 'antd/lib/input/style/css';

import '../App.css';

class Orders extends Component {
    constructor(props) {
        super(props);

        this.InputsFrame = this.InputsFrame.bind(this);
        this.StopLimitFrame = this.StopLimitFrame.bind(this);

        this.state = {
            sellPrice: this.props.price,//price of the fist coin of the pair
            buyPrice: this.props.price,//price of the fist coin of the pair
            limit: this.props.price,
            stop: this.props.price,
            price: this.props.price,//price of the fist coin of the pair
            first: this.props.first,//name of the fist coin of the pair
            second: this.props.second,//name of the 2nd coin of the pair
            loanRate: this.props.loanRate,
            total: this.props.price * 1,
            sellTotal: this.props.price * 1,
            buyTotal: this.props.price * 1,
            stopTotal: this.props.price * 1,
            sellAmount: 1,
            buyAmount: 1,
            stopAmount: 1,
            amount: 1,
        };
    }

    InputsFrame = ({first, second, loanRate, firePostToServer, type}) => {
        const optionsPrice = {
            addonAfter: first,
            style: { width: '15rem' },
            value: this.state[`${type}Price`],
            onChange: (e) => {
                const price = +e.target.value;
                const total = price * this.state[`${type}Amount`];
                this.setState({
                    [`${type}Price`]: price,
                    [`${type}Total`]: total,
                });
            }
        };
        const optionsAmount = {
            addonAfter: second,
            style: { width: '15rem' },
            value: this.state[`${type}Amount`],
            onChange: (e) => {
                const amount = +e.target.value;
                const total =  this.state.stopPrice * amount;
                // console.log(amount, total);
                this.setState({
                    [`${type}Amount`]: amount,
                    [`${type}Total`]: total,
                });
            }
        };
        const optionsLoanRate = {
            addonAfter: loanRate,
            style: { width: '15rem' },
            value: this.state.loanRate,
            onChange: (e) => {
                const val = +e.target.value;
                this.setState({loanRate: val});
            }
        };
        const optionsTotal = {
            addonAfter: first,
            style: { width: '15rem' },
            value: this.state[`${type}Total`],
            onChange: (e) => {
                const total = +e.target.value;
                const price = total / this.state[`${type}Amount`];
                this.setState({
                    [`${type}Price`]: price,
                    [`${type}Total`]: total,
                });
            }
        };
        const onBidButtonClick = ({type}) => {
            // console.log("onBidButtonClick", type);
            firePostToServer({
                price: this.state[`${type}Price`],
                amount: this.state[`${type}Amount`],
                loanRate: this.state.loanRate,
                type,
            });
        };
        // console.log(type, this.state[`${type}Price`],this.state[`${type}Amount`], this.state[`${type}Total`]);
        // const STOP = (type === "stop");
        return (
            <div className="fullHeight" style={{width: "30 rem",}}>
               <div className="orders__item">
                        <span>"Price:"</span>
                        <Input {...optionsPrice} />
                    </div>
                <div className="orders__item">
                    <span>Amount:</span>
                    <Input {...optionsAmount}/>
                </div>
                <div className="orders__item">
                    <span>Loan Rate:</span>
                    <Input {...optionsLoanRate}/>
                </div>
                <div className="orders__item orders__item-total">
                    <span>Total:</span>
                    <Input {...optionsTotal}/>
                </div>
                <Button type="primary" ghost onClick={() => { onBidButtonClick({type})} }>{type}</Button>
            </div>
        )
    };
    StopLimitFrame = ({first, second, loanRate, firePostToServer, type}) => {
        const optionsLimit = {
            addonAfter: first,
            style: { width: '15rem' },
            value: this.state.limit,
            onChange: (e) => {
                const limit = +e.target.value;
                const stopTotal = limit * this.state.stopAmount;
                this.setState({
                    limit,
                    stopTotal,
                });
            }
        };
        const optionsAmount = {
            addonAfter: second,
            style: { width: '15rem' },
            value: this.state[`${type}Amount`],
            onChange: (e) => {
                const amount = +e.target.value;
                const total =  this.state.stopPrice * amount;
                // console.log(amount, total);
                this.setState({
                    [`${type}Amount`]: amount,
                    [`${type}Total`]: total,
                });
            }
        };
        const optionsStop = {
            addonAfter: second,
            style: { width: '15rem' },
            value: this.state[`${type}Stop`],
            onChange: (e) => {
                const stop = +e.target.value;
                // const total =  this.state[`${type}Price`] * amount;
                this.setState({
                    [`${type}Stop`]: stop,
                    // [`${type}Total`]: total,
                });
            }
        };
        const optionsTotal = {
            addonAfter: first,
            style: { width: '15rem' },
            value: this.state[`${type}Total`],
            onChange: (e) => {
                const total = +e.target.value;
                const price = total / this.state[`${type}Amount`];
                this.setState({
                    [`${type}Price`]: price,
                    [`${type}Total`]: total,
                });
            }
        };
        const onBidButtonClick = ({type}) => {
            // console.log(type, this.state.stop,this.state.limit, this.state.stopAmount);
            firePostToServer({
                stop: this.state[`stop`],
                limit: this.state[`limit`],
                amount: this.state[`stopAmount`],
                type,
            });
        };
        return (
            <div className="fullHeight" style={{width: "30 rem",}}>
               <div className="orders__item">
                        <span>Stop:</span>
                        <Input {...optionsStop} />
                    </div>
                <div className="orders__item">
                    <span>Limit:</span>
                    <Input {...optionsLimit}/>
                </div>
                <div className="orders__item">
                    <span>Amount:</span>
                    <Input {...optionsAmount}/>
                </div>
                <div className="orders__item orders__item-total">
                    <span>Total:</span>
                    <Input {...optionsTotal}/>
                </div>
                <Button type="primary" ghost onClick={() => { onBidButtonClick({type: "buy"})} }>Buy</Button>
                <Button type="primary" ghost onClick={() => { onBidButtonClick({type: "sell"})} }>Sell</Button>
            </div>
        )
    };

    render() {
        // console.log( this.state);
        const {first, second, price, loanRate, firePostToServer} = this.props;
        const {sellPrice, buyPrice, stopPrice, total} = this.state;
        // console.log(first, second, price, total, loanRate);
        return (
            <div className="orders">
                <div className="ordersTables">
                    <div className="ordersBlock">
                        <span className="h5">Buy{`${first}`}</span>
                        <hr className="ordersHr"/>
                        {this.InputsFrame({first, second, price: buyPrice, loanRate, firePostToServer, type : "buy"})}
                    </div>
                    <div className="ordersBlock">
                        <span className="h5">Limits</span>
                        <hr className="ordersHr"/>
                        {this.StopLimitFrame({first, second, price: stopPrice, loanRate, firePostToServer})}

                    </div>
                    <div className="ordersBlock">
                        <span className="h5">Sell</span>
                        <hr className="ordersHr"/>
                        {this.InputsFrame({first, second, price: sellPrice, loanRate, firePostToServer, type : "sell"})}


                    </div>
                </div>
            </div>
        )
    }
}

export default Orders;
