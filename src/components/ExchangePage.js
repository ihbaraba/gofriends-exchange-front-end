import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Orders from './Orders';
import Graphic from './Graphic/Graphic'
import MarketDepth from './MarketDepth'
import OrdersHistory from './OrdersHistory'
import CoinsList from "./CoinsList";
import UserOrder from './UserOrder';
import initialState from "../store/initialState";
import {sendOrder, getUserInfo} from "./../utils";
import {Radio} from "antd";
import {ORDERS, USERINFO} from "./../constants/APIURLS.js"
import {login_success, save_user_info, save_user_orders} from "../actions/UserActions";
import {chart_timing, chart_range} from "../actions/ChartActions";
import "antd/lib/radio/style/css";
import '../styles/exchangePage.css';

class ExchangePage extends Component {

    constructor() {
        super();

        this.setCurrentCoinsPair2State = this.setCurrentCoinsPair2State.bind(this);
        this.handleTimeFrameChange = this.handleTimeFrameChange.bind(this);
        this.firePostToServer = this.firePostToServer.bind(this);
        this.state = {
            ...initialState,
            isAuthorised: false,
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

    // componentWillUnmount() {
    //     document.querySelector('.w-content').classList.remove('second-background');
    // }

    async firePostToServer(bidProps) {
        // console.log("firePostToServer", this.state.pair, bidProps);
        const responce = await sendOrder({
            rout: ORDERS,
            pairId: this.state.pair.id,
            balanceId: this.state.pair.id,
            ...bidProps
        });
        // console.log(responce);
        this.props.save_user_orders(responce.id);
    };

    setCurrentCoinsPair2State = (pair) => {
        this.setState({
            currentPair: pair,
            pair: pair,
        })
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
        const {interval, isAuthorised} = this.state;
        // console.log(this.props);
        return (
            <Fragment>
                {(!isAuthorised) &&
                <div className="wrapper-all">
                    <h3><b>You have not been authorized. Please go to the authorization page.</b></h3>
                </div>}
                {isAuthorised &&
                <div className="wrapper-all">
                    <div className="centerArea">
                        <div className='pair-information' style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <div className="padding" style={{flex: "1 0", clear: "both"}}>
                                <div className="small-text current-pair"><span className='first'>{first}</span>/<span className='second'>{second}</span></div>

                                <div className="pair-description">{`${baseCurrencyName} exchange on ${quoteCurrencyName}`} </div>
                            </div>
                        </div>

                        <MarketDepth currentPair={this.state.currentPair}/>

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
                            price={52}
                            amount={1}
                            loanRate={2}
                            firePostToServer={this.firePostToServer}
                        />

                        <CoinsList setCurentCoinsPair2State={this.setCurrentCoinsPair2State}/>

                        <OrdersHistory/>

                        <div className='open-orders-block table-block'>
                            <div className='table-title'>
                                Open orders
                            </div>
                            <UserOrder completed="false"/>
                        </div>
                    </div>

                    <div className="centerArea-second">
                        <div className="main-content">
                        </div>
                    </div>
                </div>
                }
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



