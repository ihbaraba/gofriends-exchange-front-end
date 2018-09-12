import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Input, Button, Tooltip} from 'antd';
import io from 'socket.io-client';

// import 'antd/lib/input/style/css';

import '../App.css';
import {chart_timing} from "../actions/ChartActions";
import {login_success} from "../actions/UserActions";

class WithdrawLogic extends Component {
    constructor(props) {
        super(props);

        this.InputsFrame = this.InputsFrame.bind(this);
        this.validate = this.validate.bind(this);
        this.checkKeyPress = this.checkKeyPress.bind(this);

        this.state = {
            wallet: "",
            transactionFee: 0.005,
            total: 0,

            sellPrice: this.props.price,//price of the fist coin of the pair
            buyPrice: this.props.price,//price of the fist coin of the pair
            limit: this.props.price,
            stopStop: this.props.price,
            price: this.props.price,//price of the fist coin of the pair
            first: this.props.first,//name of the fist coin of the pair
            second: this.props.second,//name of the 2nd coin of the pair
            loanRate: this.props.loanRate,
            // total: this.props.price * 1,
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
        if((evt.charCode>= 48 && evt.charCode <= 57) || evt.charCode == 46 ||evt.charCode == 0){

            console.log(evt.charCode, data);
            if(data.indexOf('.') > -1){
                if(evt.charCode== 46)
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
        const optionsWallet = {
            addonAfter: second,
            style: { width: '15rem' },
            value: this.state.wallet,
            onChange: (e) => {
                const wallet = e.target.value;
                // console.log(price);
                // const total = +price * (+this.state[`${type}Amount`]);
                this.setState({
                    wallet,
                    // [`${type}Price`]: price,
                    // [`${type}Total`]: total,
                });
            }
        };

        const optionsTransactionFee = {
            addonAfter: second,
            style: { width: '15rem' },
            value: this.state.transactionFee,
            onChange: (e) => {
                const TransactionFee= e.target.value;
                // console.log(price);
                const total = +TransactionFee * (+this.state[`Amount`]);
                this.setState({
                    TransactionFee,
                    total,
                });
            }
        };



        const optionsAmount = {
            addonAfter: first,
            style: { width: '15rem' },
            value: this.state[`Amount`],
            onKeyPress: (e) => { this.checkKeyPress(e) },
            onChange: (e) => {
                // const amount = e.target.value;
                // const amountStr = +e.target.value;
                // const amount = amountStr.toFixed(5);
                const amount = parseFloat(e.target.value);
                const total = +this.state.TransactionFee * (+amount);
                // console.log(amount, total);
                this.setState({
                    amount,
                    total,
                }
                ,                console.log(this.state)

            );
            }
        };


        const optionsLoanRate = {
            addonAfter: loanRate,
            style: { width: '15rem' },
            value: this.state.loanRate,
            onKeyPress: (e) => { this.checkKeyPress(e) },
            onChange: (e) => {
                const val = e.target.value;
                this.setState({loanRate: val});
            }
        };

        const optionsTotal = {
            addonAfter: second,
            style: { width: '15rem' },
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
        return (
            <div  style={{width: "30 rem", paddingBottom: "20px",}}>
               <div className="formWrap">
                        <label>Your wallet address:</label> <br/>
                        <Input {...optionsWallet} style={{width: "100%",}} />
                    </div>
                <div className="formWrap">
                    <label>Amount:</label>  <br/>
                    <Input {...optionsAmount} style={{width: "100%",}}/>
                </div>
                <div className="formWrap">
                    <label>Transaction Fee</label><br/>
                    <Input {...optionsTransactionFee} style={{width: "100%",}}/>
                </div>
                <div className="formWraptotal">
                    <label>Total:</label><br/>
                    <span>0</span>
                </div>

                <div>
                    {/*<Button type="primary" ghost onClick={() => { onBidButtonClick({type})} }>{type}</Button>*/}

                    <a href="#" className="act-btn">Cancel</a>
                    <a href="#" className="act-btn">Withdraw</a>
                </div>


            </div>
        )
    };

    render() {
        // console.log( this.props.token );
        const {record} = this.props;
        const {total} = this.state;

        // console.log( first, second, price: sellPrice, loanRate, firePostToServer, type : "sell");
        const {first, second, price, loanRate, firePostToServer} = this.props;
        // console.log(first, second, price, total, loanRate);




        // console.log( first, second, price: sellPrice, loanRate, firePostToServer, type : "sell");
        // const {first, second, price, loanRate, firePostToServer} = this.props;
        // console.log(first, second, price, total, loanRate);
        // return (
        //     <div className="orders">
        //         <div className="ordersTables">
        //
        //             <div className="ordersBlock">
        //                 <span className="h5">Sell {`${first}`}</span>
        //                 <hr className="ordersHr"/>
        //                 {this.InputsFrame({first, second, price: sellPrice, loanRate, firePostToServer, type : "sell"})}
        //
        //             </div>
        //         </div>
        //     </div>
        // )






        return (

            <Tooltip
                title={
                    <div>
                        <h3>Withdraw {record.name}</h3>
                        <div className="line"></div>

                        <div>
                            {/*<div className="formWrap">*/}
                                {/*<label>Your wallet address:</label><br/>*/}
                                {/*<input type="text"  />*/}
                            {/*</div>*/}

                            {/*<div className="formWrap">*/}
                                {/*<span>Amount:</span>*/}
                                {/*<input type="number"  />*/}
                            {/*</div>*/}

                            {/*<div className="formWrap">*/}
                                {/*<label>Transaction Fee:</label><br/>*/}
                                {/*<input type="number"  />*/}
                            {/*</div>*/}

                            {/*<div className="formWraptotal">*/}
                                {/*<div>Total:</div>*/}
                                {/*<div>*/}
                                    {/*<span>{total}</span>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="formWrap">*/}
                                {/*<a href="#" className="act-btn">Cancel</a>*/}
                                {/*<a href="#" className="act-btn">Withdraw</a>*/}
                            {/*</div>*/}
                        </div>
                        {this.InputsFrame({first, second,  loanRate, firePostToServer, type : "sell"})}

                    </div>
                }
                trigger="click"
                placement="topRight">

                            <span>
                                <a href="javascript:;" className="act-btn">Withdraw {record.code}</a>
                            </span>

            </Tooltip>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawLogic);
