import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import Orders from './Orders';
import Graphic from './Graphic/Graphic'
import MarketDepth from './MarketDepth'
import OrdersHistory from './OrdersHistory'
import CoinsList from "./CoinsList";
import UserOrder from './UserOrder';
import initialState from "../store/initialState";
import {sendOrder, getUserInfo} from "./../utils";
import {Radio, Tabs} from "antd";
import Modal from 'react-modal';

import {ORDERS, USERINFO} from "./../constants/APIURLS.js"
import {login_success, save_user_info, save_user_orders} from "../actions/UserActions";
import {chart_timing, chart_range} from "../actions/ChartActions";
import "antd/lib/radio/style/css";
import '../styles/exchangePage.css';

const TabPane = Tabs.TabPane;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        border: '0',
        background: 'none !important'
    }
};

Modal.setAppElement('#root');


class ExchangePage extends Component {
    constructor() {
        super();

        this.setCurrentCoinsPair2State = this.setCurrentCoinsPair2State.bind(this);
        this.handleTimeFrameChange = this.handleTimeFrameChange.bind(this);
        this.firePostToServer = this.firePostToServer.bind(this);

        this.state = {
            ...initialState,
            isAuthorised: false,
            activeTab: '1',
            activeOrderTab: '1',
            modalIsOpen: false,
            sellOrder: {
                price: 52,
                amount: 1
            },
            buyOrder: {
                price: 52,
                amount: 1
            }
        };
    }

    async componentDidMount() {
        /**
         * Read token -  check if the current session is authorized
         * then request user data
         * and save it into redux store
         **/
        const {user: {token}} = this.props; //read from redux state

        const isAuthorised = (token !== "") && (token !== null); // ? true : false
        this.setState({isAuthorised, token});
        if (isAuthorised) {
            const userInfo = await getUserInfo({rout: USERINFO, token});
            const {body} = userInfo;
            this.props.save_user_info(body);
        } else {
            this.props.history.push('/login')
        }
        /**
         * Save in Redux Store current Chart range
         **/


    }

    openTradeTab = (tab = '2', type = '1') => {
        this.setState({
            activeTab: tab,
            activeOrderTab: type
        })
    };

    openModal = () => {
        this.setState({
            modalIsOpen: true
        })
    };

    closeModal = () => {
        this.setState({modalIsOpen: false})
    };

    async firePostToServer(bidProps) {
        try {
            const responce = await sendOrder({
                rout: ORDERS,
                pairId: this.state.pair.id,
                balanceId: this.state.pair.id,
                ...bidProps
            });

            this.props.save_user_orders(responce.id);
        } catch (error) {
            console.log(error);
        }
    };

    setCurrentCoinsPair2State = (pair = this.props.pair) => {
        this.setState({
            currentPair: pair,
            pair: pair,
        })
    };

    handleSelectOrder = (order, type) => {
        if (type === 'buy') {
            this.setState({
                sellOrder: order
            })
        } else {
            this.setState({
                buyOrder: order
            })
        }
    };

    handleTimeFrameChange = (e) => {
        const interval = e.target.value;
        // console.log("chart_timing interval =", interval );
        this.props.chart_timing(interval);
        this.setState({interval});
    };

    render() {
        const {pair, chartRange: {dateFrom = "2018-08-27", dateTo = "2018-08-31"}} = this.props;

        const {first, second, id, baseCurrencyName, quoteCurrencyName} = pair;
        const {interval, sellOrder, buyOrder} = this.state;

        return (
            <Fragment>
                <div className="centerArea desktop">
                    <div className='pair-information'
                         style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div className="padding" style={{flex: "1 0", display: 'flex'}}>
                            <div style={{width: '20%'}}>
                                <div className="small-text current-pair">
                                    <span className='first'>{first}</span>/<span className='second'>{second}</span>
                                </div>

                                <div className="pair-description">
                                    {`${baseCurrencyName} exchange on ${quoteCurrencyName}`}
                                </div>
                            </div>

                            <div className='coin-statistics'>
                                <div>
                                    <span className='label'>Last price</span>
                                    <span className='value' style={{color: '#DD4457'}}>0.0012867</span>
                                </div>
                                <div>
                                    <span className='label'>24h change</span>
                                    <span className='value' style={{color: '#00CE7D'}}>0.0000189</span>
                                </div>
                                <div>
                                    <span className='label'>24h High</span>
                                    <span className='value'>0.001309</span>
                                </div>
                                <div>
                                    <span className='label'>24h Low</span>
                                    <span className='value'>0.001309</span>
                                </div>
                                <div>
                                    <span className='label'>24h Volume</span>
                                    <span className='value'>762.10 BTC</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <MarketDepth
                        currentPair={this.state.currentPair}
                        onSelectOrder={this.handleSelectOrder}
                    />

                    <div className="rightSide ">
                        <div className="candlesticks">
                            <Radio.Group value={interval} onChange={this.handleTimeFrameChange}>
                                <Radio.Button value="5min">5-min</Radio.Button>
                                <Radio.Button value="15min">15-min</Radio.Button>
                                <Radio.Button value="30min">30-min</Radio.Button>
                                <Radio.Button value="1hr">1-hr</Radio.Button>
                                <Radio.Button value="2hr">2-hr</Radio.Button>
                                <Radio.Button value="4hr">4-hr</Radio.Button>
                                <Radio.Button value="1day">1-day</Radio.Button>
                            </Radio.Group>
                        </div>

                        <Graphic
                            pairId={id}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            take={100}
                            interval={interval}
                            appendFake={"false"}
                        />
                    </div>

                    <Orders
                        {...pair}
                        buy={buyOrder}
                        sell={sellOrder}
                        firePostToServer={this.firePostToServer}
                    />

                    <CoinsList
                        setCurentCoinsPair2State={this.setCurrentCoinsPair2State}
                    />

                    <OrdersHistory/>

                    <div className='open-orders-block table-block'>
                        <div className='table-title'>
                            Open orders
                        </div>
                        <UserOrder completed="false"/>
                    </div>
                </div>

                <div className="centerArea mobile">
                    <Tabs
                        activeKey={this.state.activeTab}
                        onTabClick={i => this.openTradeTab(i)}
                        type="card"
                        tabBarStyle={{
                            position: 'fixed',
                            width: '100%',
                            left: '0',
                            top: '47px',
                            zIndex: '999'
                        }}
                    >
                        <TabPane tab="Charts" key="1">
                            <div className='mobile-tab-content'>
                                <div
                                    style={{flex: "1 0", display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        <div className="small-text current-pair" onClick={this.openModal}>
                                            <span className='first'>{first}</span>/<span
                                            className='second'>{second}</span>
                                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                                        </div>

                                        <div>
                                            {/*<span className='label'>Last price</span>*/}
                                            <span className='value' style={{color: '#DD4457'}}>0.0012867</span>
                                        </div>
                                        <div>
                                            {/*<span className='label'>24h change</span>*/}
                                            <span className='value' style={{color: '#00CE7D'}}>0.0000189</span>
                                        </div>

                                    </div>

                                    <div className='coin-statistics'>
                                        <div>
                                            <span className='label'>24h High </span>
                                            <span className='value'> 0.001309</span>
                                        </div>
                                        <div>
                                            <span className='label'>24h Low </span>
                                            <span className='value'> 0.001309</span>
                                        </div>
                                        <div>
                                            <span className='label'>24h Vol </span>
                                            <span className='value'> 762.10</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rightSide ">
                                    <div className="candlesticks">
                                        <Radio.Group value={interval} onChange={this.handleTimeFrameChange}>
                                            <Radio.Button value="5min">5-min</Radio.Button>
                                            {/*<Radio.Button value="15min">15-min</Radio.Button>*/}
                                            {/*<Radio.Button value="30min">30-min</Radio.Button>*/}
                                            <Radio.Button value="1hr">1-hr</Radio.Button>
                                            <Radio.Button value="2hr">2-hr</Radio.Button>
                                            <Radio.Button value="4hr">4-hr</Radio.Button>
                                            <Radio.Button value="1day">1-day</Radio.Button>
                                        </Radio.Group>
                                    </div>

                                    <Graphic
                                        pairId={id}
                                        dateFrom={dateFrom}
                                        dateTo={dateTo}
                                        take={100}
                                        interval={interval}
                                        appendFake={"false"}
                                    />
                                </div>

                                <OrdersHistory mobile={true}/>

                                <div className='trade-nav-btn'>
                                    <div className='btn buy-btn' onClick={() => this.openTradeTab('2', '1')}>Buy BTC
                                    </div>
                                    <div className='btn sell-btn' onClick={() => this.openTradeTab('2', '2')}>Sell BTC
                                    </div>
                                </div>
                            </div>
                        </TabPane>

                        <TabPane tab="Trade" key="2">
                            <div className='mobile-tab-content'>
                                <div
                                    style={{
                                        flex: "1 0",
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '0 0 10px 0'
                                    }}>
                                    <div className="small-text current-pair" onClick={this.openModal}>
                                        <span className='first'>{first}</span>/<span
                                        className='second'>{second}</span>
                                        <i className="fa fa-caret-down" aria-hidden="true"></i>
                                    </div>

                                    <div className='coin-statistics'>
                                        <div>
                                            <span className='value'> 762.10</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='mobile-trade-block'>
                                    <Orders
                                        {...pair}
                                        buy={buyOrder}
                                        sell={sellOrder}
                                        firePostToServer={this.firePostToServer}
                                        activeTab={this.state.activeOrderTab}
                                        mobile={true}
                                    />

                                    <MarketDepth
                                        currentPair={this.state.currentPair}
                                        mobile={true}
                                        onSelectOrder={this.handleSelectOrder}
                                    />
                                </div>
                            </div>
                        </TabPane>

                        <TabPane tab="Open orders" key="3">
                            <div className='mobile-tab-content'>
                                <div className='title-last-tab'>Open order</div>

                                <UserOrder completed="false" mobile={true}/>
                            </div>
                        </TabPane>
                    </Tabs>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <div className="modal-window select-coin-modal">
                            <div className="close-modal-btn" onClick={this.closeModal}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </div>
                            <CoinsList setCurentCoinsPair2State={this.setCurrentCoinsPair2State}/>
                        </div>
                    </Modal>

                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    pair: state.pair,
    chartRange: state.chartRange,
});

const mapDispatchToProps = dispatch => ({
    login_success: (token) => dispatch(login_success(token)),
    chart_timing: (timing) => dispatch(chart_timing(timing)),
    chart_range: (range) => dispatch(chart_range(range)),
    save_user_info: (info) => dispatch(save_user_info(info)),
    save_user_orders: (order) => dispatch(save_user_orders(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePage);



