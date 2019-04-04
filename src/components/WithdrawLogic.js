import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input} from 'antd';

import '../App.css';

class WithdrawLogic extends Component {
    constructor(props) {
        super(props);

        // this.InputsFrame = this.InputsFrame.bind(this);
        this.validate = this.validate.bind(this);
        this.checkKeyPress = this.checkKeyPress.bind(this);

        this.state = {
            wallet: "",
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
        const {record: {first, second, currency}, onWithdraw} = this.props;
        let transactionFee = 0;

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

        currency.fee.forEach(item => {
            if (this.state.amount >= item.fromSteps && this.state.amount <= item.toSteps) {
                transactionFee = this.state.amount / 100 * item.fee;
            }
        });

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
                this.setState({
                    amount,
                    total,
                });
            }
        };

        const total = (+this.state.amount);

        return (
            <div>
                <div className="formWrap">
                    <label>Your wallet address:</label>
                    <Input {...optionsWallet} style={{width: "100%"}}/>
                </div>
                <div className="formWrap">
                    <label>Amount:</label>
                    <Input {...optionsAmount} style={{width: "100%"}}/>
                </div>
                <div className="formWraptotal">
                    <label>Transaction Fee:</label>
                    <span>{transactionFee}</span>
                </div>
                <div className="formWraptotal">
                    <label>Total:</label>
                    <span>{total + transactionFee}</span>
                </div>

                <button className='btn' onClick={() => onWithdraw(this.state)}>
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
