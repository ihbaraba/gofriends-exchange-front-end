import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, Tooltip} from 'antd';

import '../App.css';

class WithdrawLogic extends Component {
    constructor(props) {
        super(props);

        // this.InputsFrame = this.InputsFrame.bind(this);
        this.validate = this.validate.bind(this);
        this.checkKeyPress = this.checkKeyPress.bind(this);

        this.state = {
            wallet: "",
            transactionFee: 0.005,
            total: 0,
            amount: 1,
        };
    }

    checkKeyPress(evt) {
        // console.log(evt.charCode, evt.target.value);
        const data = evt.target.value;
        if ((evt.charCode >= 48 && evt.charCode <= 57) || +evt.charCode === 46 || +evt.charCode === 0) {

            // console.log(evt.charCode, data);
            if (data.indexOf('.') > -1) {
                if (+evt.charCode === 46)
                    evt.preventDefault();
            }
        } else
            evt.preventDefault();
    };


    validate(s) {
        const rgx = /^[0-9]*\.?[0-9]*$/;
        return s.match(rgx);
    }

    render() {
        const {record: {first, second, loanRate, firePostToServer, type}, close} = this.props;

        const optionsWallet = {
            addonAfter: second,
            style: {width: '15rem'},
            value: this.state.wallet,
            onChange: (e) => {
                const wallet = e.target.value;
                this.setState({
                    wallet,
                });
            }
        };

        const optionsTransactionFee = {
            addonAfter: second,
            style: {width: '15rem'},
            value: this.state.transactionFee,
            onChange: (e) => {
                const transactionFee = e.target.value;
                // console.log(price);
                const total = +transactionFee * (+this.state[`Amount`]);
                this.setState({
                    transactionFee,
                    total,
                });
            }
        };


        const optionsAmount = {
            addonAfter: first,
            style: {width: '15rem'},
            value: this.state.amount,
            onKeyPress: (e) => {
                this.checkKeyPress(e)
            },
            onChange: (e) => {
                const amount = e.target.value;
                const total = +this.state.transactionFee + (+amount);
                // console.log(amount, total);
                this.setState({
                    amount,
                    total,
                });
            }
        };

        // const onBidButtonClick = ({type}) => {
        //     firePostToServer({
        //         token: this.props.token,
        //         price: 1*this.state[`${type}Price`],
        //         amount: 1*this.state[`${type}Amount`],
        //         loanRate: 1*this.state.loanRate,
        //         type,
        //     });
        // };

        const total = +this.state.transactionFee + (+this.state.amount);
        // console.log( this.props.token );
        const {record} = this.props;

        // console.log( first, second, price: sellPrice, loanRate, firePostToServer, type : "sell");

        return (
            <div>
                <div className="formWrap">
                    <label>Your wallet address:</label>
                    <Input {...optionsWallet} style={{width: "100%",}}/>
                </div>
                <div className="formWrap">
                    <label>Amount:</label>
                    <Input {...optionsAmount} style={{width: "100%",}}/>
                </div>
                <div className="formWrap">
                    <label>Transaction Fee</label>
                    <Input {...optionsTransactionFee} style={{width: "100%",}}/>
                </div>
                <div className="formWraptotal">
                    <label>Total:</label>
                    <span>{total}</span>
                </div>

                <button className='btn' onClick={close}>
                    Withdraw
                </button>


            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawLogic);
