import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Input, Button, Tabs} from 'antd';

import Wallet from '../img/ic_wallet.svg'

const TabPane = Tabs.TabPane;


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
            price: this.props.price,//price of the fist coin of the pair
            first: this.props.first,//name of the fist coin of the pair
            second: this.props.second,//name of the 2nd coin of the pair
            loanRate: this.props.loanRate,
            total: this.props.price * 1,
            sellTotal: this.props.price * 1,
            buyTotal: this.props.price * 1,
            sellAmount: 1,
            buyAmount: 1,
            amount: 1,
            //    stop limit value
            buyLimit: this.props.price,
            sellLimit: this.props.price,
            buyStop: this.props.price,
            sellStop: this.props.price,
            buyStopTotal: this.props.price * 1,
            sellStopTotal: this.props.price * 1,
            buyStopAmount: 1,
            sellStopAmount: 1,
        };
    }

    checkKeyPress(evt) {
        const data = evt.target.value;
        if ((evt.charCode >= 48 && evt.charCode <= 57) || +evt.charCode === 46 || +evt.charCode === 0) {

            console.log(evt.charCode, data);
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

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    InputsFrame = ({first, second, loanRate, firePostToServer, type}) => {
        let currencyWallet = 0;

        this.props.userBalances ? this.props.userBalances.forEach(item => {
            if(item.currency.code === first) currencyWallet = item.amount;
        }) : null;

        const optionsPrice = {
            addonAfter: second,
            value: this.state[`${type}Price`],
            onKeyPress: (e) => {
                this.checkKeyPress(e)
            },
            onChange: (e) => {
                const price = e.target.value;
                const total = +price * (+this.state[`${type}Amount`]);
                this.setState({
                    [`${type}Price`]: price,
                    [`${type}Total`]: total,
                });
            }
        };

        const optionsAmount = {
            addonAfter: first,
            value: this.state[`${type}Amount`],
            onKeyPress: (e) => {
                this.checkKeyPress(e)
            },
            onChange: (e) => {
                const amount = e.target.value;
                const total = +this.state[`${type}Price`] * (+amount);

                this.setState({
                    [`${type}Amount`]: amount,
                    [`${type}Total`]: total,
                });
            }
        };

        const optionsLoanRate = {
            addonAfter: loanRate,
            value: this.state.loanRate,
            onKeyPress: (e) => {
                this.checkKeyPress(e)
            },
            onChange: (e) => {
                const val = e.target.value;
                this.setState({loanRate: val});
            }
        };

        const optionsTotal = {
            addonAfter: second,
            value: this.state[`${type}Total`],
            onKeyPress: (e) => {
                this.checkKeyPress(e)
            },
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
            firePostToServer({
                token: this.props.token,
                price: 1 * this.state[`${type}Price`],
                amount: 1 * this.state[`${type}Amount`],
                loanRate: 1 * this.state.loanRate,
                type,
            });
        };

        return (
            <div>
                <div className="order-block-title">
                    <span>{`${this.capitalizeFirstLetter(type)}  ${first}`}</span>
                    <span className='total-coins'><img src={Wallet} alt=""/>{`${currencyWallet} ${first}`}</span>
                </div>

                <div className="orders__item">
                    <span className="orders__item_name">Price:</span>
                    <Input {...optionsPrice} />
                </div>

                <div className="orders__item">
                    <span className="orders__item_name">Amount:</span>
                    <Input {...optionsAmount}/>
                </div>

                <div className="orders__item">
                    <span className="orders__item_name">Limit:</span>
                    <Input {...optionsLoanRate}/>
                </div>

                {/*<div className="rate-block orders__item">*/}
                {/*<RadioGroup defaultValue="25">*/}
                {/*<RadioButton value="25">25%</RadioButton>*/}
                {/*<RadioButton value="50">50%</RadioButton>*/}
                {/*<RadioButton value="75">75%</RadioButton>*/}
                {/*<RadioButton value="100">100%</RadioButton>*/}
                {/*</RadioGroup>*/}
                {/*</div>*/}

                <div className="orders__item orders__item-total">
                    <span className="orders__item_name">Total:</span>
                    <Input {...optionsTotal}/>
                </div>

                <Button
                    className={type === 'buy' ? 'order-buy-btn order-action-btn' : 'order-sell-btn order-action-btn'}
                    type="primary"
                    ghost
                    onClick={() => {
                        onBidButtonClick({type})
                    }}>
                    {this.capitalizeFirstLetter(type) + ` ${first}`}
                </Button>
            </div>
        )
    };

    StopLimitFrame = ({first, second, loanRate, firePostToServer, hz, type}) => {
        let currencyWallet = 0;

        this.props.userBalances ? this.props.userBalances.forEach(item => {
            if(item.currency.code === first) currencyWallet = item.amount;
        }) : null;

        const optionsLimit = {
            addonAfter: second,
            value: this.state[`${type}Limit`],
            onKeyPress: (e) => {
                this.checkKeyPress(e)
            },
            onChange: (e) => {
                const limit = e.target.value;
                const stopTotal = +limit * this.state[`${type}StopAmount`];
                this.setState({
                    [`${type}Limit`]: limit,
                    [`${type}StopTotal`]: stopTotal,
                });
            }
        };
        const optionsAmount = {
            addonAfter: first,
            value: this.state[`${type}StopAmount`],

            onKeyPress: (e) => {
                this.checkKeyPress(e)
            },

            onChange: (e) => {
                const amount = e.target.value;
                const total = +this.state[`${type}Stop`] * (+amount);

                this.setState({
                    [`${type}StopAmount`]: amount,
                    [`${type}StopTotal`]: total,
                });
            }
        };
        const optionsStop = {
            addonAfter: second,
            value: this.state[`${type}Stop`],
            onKeyPress: (e) => {
                this.checkKeyPress(e)
            },
            onChange: (e) => {
                const stop = e.target.value;
                // const total =  this.state[`${type}Price`] * amount;
                this.setState({
                    [`${type}Stop`]: stop,
                    // [`${type}Total`]: total,
                });
            }
        };
        const optionsTotal = {
            addonAfter: second,
            value: this.state[`${type}StopTotal`],
            onKeyPress: (e) => {
                this.checkKeyPress(e)
            },
            onChange: (e) => {
                const total = e.target.value;
                const price = +total / this.state[`${type}topAmount`];
                this.setState({
                    [`${type}Stop`]: price,
                    [`${type}topTotal`]: total,
                });
            }
        };
        const onBidButtonClick = ({type}) => {
            firePostToServer({
                token: this.props.token,
                stop: (1) * this.state.stopStop,
                limit: (1) * this.state.limit,
                amount: (1) * this.state.stopAmount,
                type,
            });
        };
        return (
            <Fragment>
                <div className="order-block-title">
                    <span>{`${this.capitalizeFirstLetter(type)} ${first}`}</span>
                    <span className='total-coins'><img src={Wallet} alt=""/>{`${currencyWallet} ${first}`}</span>
                </div>

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

                <Button
                    type="primary"
                    ghost
                    onClick={() => {
                        onBidButtonClick({type: type})
                    }}
                    className={type === 'buy' ? "order-buy-btn order-action-btn" : 'order-sell-btn order-action-btn'}
                >
                    {this.capitalizeFirstLetter(type) + ` ${first}`}
                </Button>

                {/*<Button*/}
                {/*type="primary"*/}
                {/*ghost onClick={() => {*/}
                {/*onBidButtonClick({type: "sell"})*/}
                {/*}}*/}
                {/*className="order-sell-btn order-action-btn"*/}
                {/*>*/}
                {/*Sell*/}
                {/*</Button>*/}
            </Fragment>
        )
    };

    render() {
        const {first, second, loanRate, firePostToServer} = this.props;
        const {sellPrice, buyPrice, stopBuyPrice, stopSellPrice} = this.state;
        return (
            <div className="orders">
                <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="Limit" key="1">
                        <div className="ordersBlock">
                            <div className='buy-order'>
                                {this.InputsFrame({
                                    first,
                                    second,
                                    price: buyPrice,
                                    loanRate,
                                    firePostToServer,
                                    type: "buy"
                                })}
                            </div>

                            <div className='sell-order'>
                                {this.InputsFrame({
                                    first,
                                    second,
                                    price: sellPrice,
                                    loanRate,
                                    firePostToServer,
                                    type: "sell"
                                })}
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="Stop-Limit" key="2">
                        <div className="ordersBlock market">
                            <div className='buy-order'>
                                {this.StopLimitFrame({
                                    first,
                                    second,
                                    price: stopBuyPrice,
                                    loanRate,
                                    firePostToServer,
                                    type: 'buy'
                                })}
                            </div>

                            <div className='sell-order'>
                                {this.StopLimitFrame({
                                    first,
                                    second,
                                    price: stopSellPrice,
                                    loanRate,
                                    firePostToServer,
                                    type: 'sell'
                                })}
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    userBalances: state.user.balances,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
