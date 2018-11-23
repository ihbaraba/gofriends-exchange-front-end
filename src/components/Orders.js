import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Input, Button } from 'antd';
// import 'antd/lib/input/style/css';
import '../App.css';

class Orders extends Component {
    constructor(props) {
        super(props);

        this.InputsFrame = this.InputsFrame.bind(this);
        this.StopLimitFrame = this.StopLimitFrame.bind(this);
        this.validate = this.validate.bind(this);
        this.checkKeyPress = this.checkKeyPress.bind(this);

        this.state = {
            sellPrice: this.props.price,//price of the fist coin of the pair
            buyPrice: this.props.price,//price of the fist coin of the pair
            limit: this.props.price,
            stopStop: this.props.price,
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

    checkKeyPress(evt){
        // console.log(evt.charCode, evt.target.value);
        const data = evt.target.value;
        if((evt.charCode>= 48 && evt.charCode <= 57) || +evt.charCode === 46 || +evt.charCode === 0){

            console.log(evt.charCode, data);
            if(data.indexOf('.') > -1){
                if(+evt.charCode === 46)
                    evt.preventDefault();
            }
        }else
            evt.preventDefault();
    };


    validate(s) {
        const rgx = /^[0-9]*\.?[0-9]*$/;
        return s.match(rgx);
    }

    InputsFrame = ({first, second, loanRate, firePostToServer, type}) => {
        const optionsPrice = {
            addonAfter: second,
            // style: { width: '15rem' },
            value: this.state[`${type}Price`],
            onKeyPress: (e) => { this.checkKeyPress(e) },
            onChange: (e) => {
                const price = e.target.value;
                // console.log(price);
                const total = +price * (+this.state[`${type}Amount`]);
                this.setState({
                    [`${type}Price`]: price,
                    [`${type}Total`]: total,
                });
            }
        };

        const optionsAmount = {
            addonAfter: first,
            // style: { width: '15rem' },
            value: this.state[`${type}Amount`],
            onKeyPress: (e) => { this.checkKeyPress(e) },
            onChange: (e) => {
                const amount = e.target.value;
                // const amountStr = +e.target.value;
                // const amount = amountStr.toFixed(5);
                // const amount = parseFloat(e.target.value);
                console.log(amount);
                const total = +this.state[`${type}Price`] * (+amount);
                // console.log(amount, total);
                this.setState({
                    [`${type}Amount`]: amount,
                    [`${type}Total`]: total,
                });
            }
        };
        const optionsLoanRate = {
            addonAfter: loanRate,
            // style: { width: '15rem' },
            value: this.state.loanRate,
            onKeyPress: (e) => { this.checkKeyPress(e) },
            onChange: (e) => {
                const val = e.target.value;
                this.setState({loanRate: val});
            }
        };
        const optionsTotal = {
            addonAfter: second,
            // style: { width: '15rem' },
            value: this.state[`${type}Total`],
            onKeyPress: (e) => { this.checkKeyPress(e) },
            onChange: (e) => {
                const total = e.target.value;
                // const total = (e.target.value).toFixed(2);
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
                token: this.props.token,
                price: 1*this.state[`${type}Price`],
                amount: 1*this.state[`${type}Amount`],
                loanRate: 1*this.state.loanRate,
                type,
            });
        };
        // console.log(type, this.state[`${type}Price`],this.state[`${type}Amount`], this.state[`${type}Total`]);
        // const STOP = (type === "stop");
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return (
            <div className="fullHeight" style={{width: "30 rem",}}>
               <div className="orders__item">
                        <span className="orders__item_name">Price:</span>
                        <Input {...optionsPrice} />
                    </div>
                <div className="orders__item">
                    <span className="orders__item_name">Amount:</span>
                    <Input {...optionsAmount}/>
                </div>
                <div className="orders__item">
                    <span className="orders__item_name">Loan Rate:</span>
                    <Input {...optionsLoanRate}/>
                </div>
                <div className="orders__item orders__item-total">
                    <span className="orders__item_name">Total:</span>
                    <Input {...optionsTotal}/>
                </div>

                <div className="ordBtn">
                    <Button type="primary" ghost onClick={() => { onBidButtonClick({type})} }>{capitalizeFirstLetter(type)}</Button>
                </div>
            </div>
        )
    };

    StopLimitFrame = ({first, second, loanRate, firePostToServer, type}) => {
        const optionsLimit = {
            addonAfter: second,
            // style: { width: '15rem' },
            value: this.state.limit,
            onKeyPress: (e) => { this.checkKeyPress(e) },
            onChange: (e) => {
                const limit = e.target.value;
                const stopTotal = +limit * this.state.stopAmount;
                this.setState({
                    limit,
                    stopTotal,
                });
            }
        };
        const optionsAmount = {
            addonAfter: first,
            // style: { width: '15rem' },
            value: this.state[`stopAmount`],
            onKeyPress: (e) => { this.checkKeyPress(e) },
            onChange: (e) => {
                const amount = e.target.value;
                const total = +this.state.stopStop * (+amount);
                // console.log(amount, total);
                this.setState({
                    [`stopAmount`]: amount,
                    [`stopTotal`]: total,
                });
            }
        };
        const optionsStop = {
            addonAfter: second,
            // style: { width: '15rem' },
            value: this.state[`stopStop`],
            onKeyPress: (e) => { this.checkKeyPress(e) },
            onChange: (e) => {
                const stop = e.target.value;
                // const total =  this.state[`${type}Price`] * amount;
                this.setState({
                    [`stopStop`]: stop,
                    // [`${type}Total`]: total,
                });
            }
        };
        const optionsTotal = {
            addonAfter: second,
            // style: { width: '15rem' },
            value: this.state[`stopTotal`],
            onKeyPress: (e) => { this.checkKeyPress(e) },
            onChange: (e) => {
                const total = e.target.value;
                const price = +total / this.state[`stopAmount`];
                this.setState({
                    [`stopStop`]: price,
                    [`stopTotal`]: total,
                });
            }
        };
        const onBidButtonClick = ({type}) => {
            // console.log(type, this.state.stop,this.state.limit, this.state.stopAmount);
            firePostToServer({
                token: this.props.token,
                stop: (1) * this.state.stopStop,
                limit: (1) * this.state.limit,
                amount: (1) * this.state.stopAmount,
                type,
            });
        };
        return (
            <div className="fullHeight" style={{width: "30 rem",}}>
               <div className="orders__item">
                        <span className="orders__item_name">Stop:</span>
                        <Input {...optionsStop} />
                    </div>
                <div className="orders__item">
                    <span className="orders__item_name">Limit:</span>
                    <Input {...optionsLimit}/>
                </div>
                <div className="orders__item">
                    <span className="orders__item_name">Amount:</span>
                    <Input {...optionsAmount}/>
                </div>
                <div className="orders__item orders__item-total">
                    <span className="orders__item_name">Total:</span>
                    <Input {...optionsTotal}/>
                </div>

                <div className="ordBtn">
                    <Button type="primary" ghost onClick={() => { onBidButtonClick({type: "buy"})} } className="">Buy</Button>
                    <Button type="primary" ghost onClick={() => { onBidButtonClick({type: "sell"})} } className="">Sell</Button>
                </div>
            </div>
        )
    };

    render() {
        // console.log( this.props.token );
        const { first, second, loanRate, firePostToServer } = this.props;
        const { sellPrice, buyPrice, stopPrice } = this.state;
        // console.log(first, second, price, total, loanRate);
        return (
            <div className="orders">
                <div className="ordersTables">
                    <div className="ordersBlock">
                        <span className="h5">Buy {`${first}`}</span>
                        <hr className="ordersHr"/>
                        {this.InputsFrame({first, second, price: buyPrice, loanRate, firePostToServer, type : "buy"})}
                    </div>
                    <div className="ordersBlock">
                        <span className="h5">Limits</span>
                        <hr className="ordersHr"/>
                        {this.StopLimitFrame({first, second, price: stopPrice, loanRate, firePostToServer})}

                    </div>
                    <div className="ordersBlock">
                        <span className="h5">Sell {`${first}`}</span>
                        <hr className="ordersHr"/>
                        {this.InputsFrame({first, second, price: sellPrice, loanRate, firePostToServer, type : "sell"})}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
