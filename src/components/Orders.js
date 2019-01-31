import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Input, Button, Tabs} from 'antd';

import Wallet from '../img/ic_wallet.svg'

const TabPane = Tabs.TabPane;


class Orders extends Component {
    constructor(props) {
        super(props);

        this.validate = this.validate.bind(this);

        this.state = {
            buy: this.props.buy ? this.props.buy : {price: 0, amount: 0},
            sell: this.props.sell ? this.props.sell : {price: 0, amount: 0},
            buyLimit: {
                stop: 0,
                limit: 0,
                amount: 0
            },
            sellLimit: {
                stop: 0,
                limit: 0,
                amount: 0
            },
            //    -------
            activeTab: this.props.activeTab ? this.props.activeTab : '1',
            disableBtn: false
        };
    }

    // checkKeyPress(evt) {
    //     const data = evt.target.value;
    //     if ((evt.charCode >= 48 && evt.charCode <= 57) || +evt.charCode === 46 || +evt.charCode === 0) {
    //
    //         console.log(evt.charCode, data);
    //         if (data.indexOf('.') > -1) {
    //             if (+evt.charCode === 46)
    //                 evt.preventDefault();
    //         }
    //     } else
    //         evt.preventDefault();
    // };


    validate(s) {
        const rgx = /^[0-9]*\.?[0-9]*$/;
        return s.match(rgx);
    }

    componentDidMount() {
        this.setState({
            activeTab: this.props.activeTab
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeTab: nextProps.activeTab,
            buy: nextProps.buy ? nextProps.buy : {price: 0, amount: 0},
            sell: nextProps.sell ? nextProps.sell : {price: 0, amount: 0}
        });
    }

    handleActionOrders = async (type, limit) => {
        this.setState({
            disableBtn: true
        });

        if (limit) {
            await this.props.firePostToServer({
                token: this.props.token,
                stop: +this.state[`${type}Limit`].stop,
                limit: +this.state[`${type}Limit`].limit,
                amount: +this.state[`${type}Limit`].amount,
                type
            });

            this.setState({
                disableBtn: false
            });
        } else {
            await this.props.firePostToServer({
                token: this.props.token,
                price: +this.state[type].price,
                amount: +this.state[type].amount,
                type
            });

            this.setState({
                disableBtn: false
            });
        }
    };

    handleChangeInput = (e, type) => {
        const input = e.target;

        this.setState({
            [type]: {
                ...this.state[type],
                [input.name]: input.value,
            }
        })
    };

    render() {
        const {first, second, mobile, fee = []} = this.props;
        const {buy, sell, buyLimit, sellLimit, disableBtn} = this.state;

        let currencyWallet = 0;

        this.props.userBalances ? this.props.userBalances.forEach(item => {
            if (item.currency.code === first) {
                currencyWallet = item.amount;
            }
        }) : null;

        let buyFee = 0,
            sellFee = 0,
            buyLimitFee = 0,
            sellLimitFee = 0;

        fee.forEach(item => {
            if (+buy.price > item.fromSteps && +buy.price < item.toSteps) {
                buyFee = item.fee / 100;
            } else if (+sell.price > item.fromSteps && +sell.price < item.toSteps) {
                sellFee = item.fee / 100;
            }

            if (buyLimit.limit > item.fromSteps && buyLimit.limit < item.toSteps) {
                buyLimitFee = item.fee / 100;
            } else if (sellLimit.limit > item.fromSteps && sellLimit.limit < item.toSteps) {
                sellLimitFee = item.fee / 100;
            }
        });

        return (
            <Fragment>
                {mobile ?
                    <div className="orders mobile">
                        <Tabs
                            activeKey={this.state.activeTab}
                            onTabClick={i => this.setState({activeTab: i})}
                            type="card"
                        >
                            <TabPane tab="Buy" key="1">
                                <div className="ordersBlock">
                                    <div className='buy-order'>
                                        <div className="order-block-title">
                                            <span>{`Buy ${first}`}</span>
                                            <span className='total-coins'><img src={Wallet}
                                                                               alt=""/>{`${currencyWallet} ${first}`}</span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Price:</span>
                                            <input
                                                value={buy.price}
                                                name='price'
                                                type='number'
                                                onChange={e => this.handleChangeInput(e, 'buy')}
                                            />
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Amount:</span>
                                            <input
                                                value={buy.amount}
                                                type='number'
                                                name='amount'
                                                onChange={e => this.handleChangeInput(e, 'buy')}
                                            />
                                            <span className='name-coin'>
                                                {first}
                                            </span>
                                        </div>

                                        <div className="orders__item orders__item-total">
                                            <span className="orders__item_name">Total:</span>
                                            <div className="fake-input">
                                                {(+buy.amount * +buy.price)}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Fee:</span>
                                            <div className="fake-input">
                                                {(+buy.amount * +buy.price * buyFee)}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <button
                                            className='order-buy-btn order-action-btn'
                                            type="primary"
                                            disabled={disableBtn}
                                            onClick={() => this.handleActionOrders('buy')}>
                                            {`Buy ${first}`}
                                        </button>
                                    </div>
                                </div>
                            </TabPane>

                            <TabPane tab="Sell" key="2">
                                <div className="ordersBlock">
                                    <div className='sell-order'>
                                        <div className="order-block-title">
                                            <span>{`Sell ${first}`}</span>
                                            <span className='total-coins'><img src={Wallet}
                                                                               alt=""/>{`${currencyWallet} ${first}`}</span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Price:</span>
                                            <input
                                                value={sell.price}
                                                name='price'
                                                onChange={e => this.handleChangeInput(e, 'sell')}
                                            />
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Amount:</span>
                                            <input
                                                value={sell.amount}
                                                name='amount'
                                                onChange={e => this.handleChangeInput(e, 'sell')}
                                            />
                                            <span className='name-coin'>
                                                {first}
                                            </span>
                                        </div>

                                        <div className="orders__item orders__item-total">
                                            <span className="orders__item_name">Total:</span>
                                            <div className="fake-input">
                                                {(+sell.amount * +sell.price)}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Fee:</span>
                                            <div className="fake-input">
                                                {(+sell.amount * +sell.price * sellFee)}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <button
                                            className='order-sell-btn order-action-btn'
                                            type="primary"
                                            disabled={disableBtn}
                                            onClick={() => this.handleActionOrders('sell')}>
                                            {`Sell ${first}`}
                                        </button>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                    :
                    <div className="orders desktop">
                        <Tabs defaultActiveKey="1" type="card">
                            <TabPane tab="Limit" key="1">
                                <div className="ordersBlock">
                                    <div className='buy-order'>
                                        <div className="order-block-title">
                                            <span>{`Buy ${first}`}</span>
                                            <span className='total-coins'><img src={Wallet}
                                                                               alt=""/>{`${currencyWallet} ${first}`}</span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Price:</span>
                                            <input
                                                value={buy.price}
                                                name='price'
                                                type='number'
                                                onChange={e => this.handleChangeInput(e, 'buy')}
                                            />
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Amount:</span>
                                            <input
                                                value={buy.amount}
                                                type='number'
                                                name='amount'
                                                onChange={e => this.handleChangeInput(e, 'buy')}
                                            />
                                            <span className='name-coin'>
                                                {first}
                                            </span>
                                        </div>

                                        <div className="orders__item orders__item-total">
                                            <span className="orders__item_name">Total:</span>
                                            <div className="fake-input">
                                                {(+buy.amount * +buy.price)}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Fee:</span>
                                            <div className="fake-input">
                                                {(+buy.amount * +buy.price * +buyFee)}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <button
                                            className='order-buy-btn order-action-btn'
                                            type="primary"
                                            disabled={disableBtn}
                                            onClick={() => this.handleActionOrders('buy')}>
                                            {`Buy ${first}`}
                                        </button>
                                    </div>

                                    <div className='sell-order'>
                                        <div className="order-block-title">
                                            <span>{`Sell ${first}`}</span>
                                            <span className='total-coins'><img src={Wallet}
                                                                               alt=""/>{`${currencyWallet} ${first}`}</span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Price:</span>
                                            <input
                                                value={sell.price}
                                                name='price'
                                                onChange={e => this.handleChangeInput(e, 'sell')}
                                            />
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Amount:</span>
                                            <input
                                                value={sell.amount}
                                                name='amount'
                                                onChange={e => this.handleChangeInput(e, 'sell')}
                                            />
                                            <span className='name-coin'>
                                                {first}
                                            </span>
                                        </div>

                                        <div className="orders__item orders__item-total">
                                            <span className="orders__item_name">Total:</span>
                                            <div className="fake-input">
                                                {(+sell.amount * +sell.price)}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Fee:</span>
                                            <div className="fake-input">
                                                {(+sell.amount * +sell.price * sellFee)}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <button
                                            className='order-sell-btn order-action-btn'
                                            type="primary"
                                            disabled={disableBtn}
                                            onClick={() => this.handleActionOrders('sell')}>
                                            {`Sell ${first}`}
                                        </button>
                                    </div>
                                </div>
                            </TabPane>

                            <TabPane tab="Stop-Limit" key="2">
                                <div className="ordersBlock market">
                                    <div className='buy-order'>
                                        <div className="order-block-title">
                                            <span>{`Buy ${first}`}</span>
                                            <span className='total-coins'><img src={Wallet}
                                                                               alt=""/>{`${currencyWallet} ${first}`}</span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Stop:</span>
                                            <input
                                                value={buyLimit.stop}
                                                name='stop'
                                                type='number'
                                                onChange={e => this.handleChangeInput(e, 'buyLimit')}
                                            />
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Limit:</span>
                                            <input
                                                value={buyLimit.limit}
                                                type='number'
                                                name='limit'
                                                onChange={e => this.handleChangeInput(e, 'buyLimit')}
                                            />
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item orders__item-total">
                                            <span className="orders__item_name">Amount:</span>
                                            <input
                                                value={buyLimit.amount}
                                                type='number'
                                                name='amount'
                                                onChange={e => this.handleChangeInput(e, 'buyLimit')}
                                            />
                                            <span className='name-coin'>
                                                {first}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Total:</span>
                                            <div className="fake-input">
                                                {+buyLimit.amount * +buyLimit.limit}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Fee:</span>
                                            <div className="fake-input">
                                                {(+buyLimit.amount * +buyLimit.limit * buyLimitFee)}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <button
                                            style={{marginTop: '20px !important'}}
                                            className='order-buy-btn order-action-btn limits-btn'
                                            type="primary"
                                            disabled={disableBtn}
                                            onClick={() => this.handleActionOrders('buy', true)}>
                                            {`Buy ${first}`}
                                        </button>
                                    </div>

                                    <div className='sell-order'>
                                        <div className="order-block-title">
                                            <span>{`Sell ${first}`}</span>
                                            <span className='total-coins'><img src={Wallet}
                                                                               alt=""/>{`${currencyWallet} ${first}`}</span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Stop:</span>
                                            <input
                                                value={sellLimit.stop}
                                                name='stop'
                                                onChange={e => this.handleChangeInput(e, 'sellLimit')}
                                            />
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Limit:</span>
                                            <input
                                                value={sellLimit.limit}
                                                name='amount'
                                                onChange={e => this.handleChangeInput(e, 'sellLimit')}
                                            />
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item orders__item-total">
                                            <span className="orders__item_name">Amount:</span>
                                            <input
                                                value={sellLimit.amount}
                                                name='amount'
                                                onChange={e => this.handleChangeInput(e, 'sellLimit')}
                                            />
                                            <span className='name-coin'>
                                                {first}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Total:</span>
                                            <div className="fake-input">
                                                {+sellLimit.amount * +sellLimit.limit}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <div className="orders__item">
                                            <span className="orders__item_name">Fee:</span>
                                            <div className="fake-input">
                                                {(+sellLimit.amount * +sellLimit.limit * sellLimitFee)}
                                            </div>
                                            <span className='name-coin'>
                                                {second}
                                            </span>
                                        </div>

                                        <button
                                            className='order-sell-btn order-action-btn limits-btn'
                                            type="primary"
                                            disabled={disableBtn}
                                            onClick={() => this.handleActionOrders('sell', true)}>
                                            {`Sell ${first}`}
                                        </button>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                }

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    userBalances: state.user.balances,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
