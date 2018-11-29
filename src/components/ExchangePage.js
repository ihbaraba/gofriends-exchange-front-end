import React, {Component} from 'react';
import {connect} from 'react-redux';

import Orders from './Orders';
import Graphic from './Graphic/Graphic'
import MarketDepth from './MarketDepth'
import OrdersHistory from './OrdersHistory'
import CoinsList from "./CoinsList";
import UserInfo from "./UserInfo";
import Notices from './Notices';
import initialState from "../store/initialState";
import {sendOrder, getUserInfo} from "./../utils";
import {Radio} from "antd";
import {ORDERS, USERINFO} from "./../constants/APIURLS.js"
import {login_success, save_user_info, save_user_orders} from "../actions/UserActions";
import {chart_timing, chart_range} from "../actions/ChartActions";
import "antd/lib/radio/style/css";
import '../App.css';

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
        }
        /**
         * Save in Redux Store current Chart range
         **/
        // const currentDate = new Date();
        // const format = d3.timeFormat("%Y-%m-%d");
        // const currentDatePlusOdin = d3.timeDay.offset(currentDate, intervalInDays(this.state.interval, 1) ) ;
        // const offsetData = d3.timeDay.offset(currentDate, (-1) * intervalInDays(this.state.interval, 3*24) ) ;
        // this.props.chart_range({
        //     dateFrom: format(offsetData),
        //     dateTo: format(currentDatePlusOdin),
        // });
    }

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
            <div>
                {(!isAuthorised) &&
                <div className="wrapper-all">
                    <h3><b>You have not been authorized. Please go to the authorization page.</b></h3>
                </div>}
                {isAuthorised &&
                <div className="wrapper-all">

                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div className="padding" style={{flex: "1 0", clear: "both"}}>
                            <h1 className="h1">{`${baseCurrencyName} exchange on ${quoteCurrencyName}`} </h1>
                            <p className="small-text">{`${first} / ${second}`}</p>
                        </div>
                    </div>

                    <div className="centerArea">
                        <div className="rightSide">
                            <Graphic
                                pairId={id}
                                dateFrom={dateFrom}
                                dateTo={dateTo}
                                take={100}
                                interval={interval}
                                appendFake={"false"}
                            />
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
                        </div>
                        <div className="side">
                            <CoinsList setCurentCoinsPair2State={this.setCurrentCoinsPair2State}/>
                        </div>
                    </div>
                    <div className="centerArea-second">
                        <div className="main-content">
                            <UserInfo short/>
                            <MarketDepth currentPair={this.state.currentPair}/>
                            <Orders {...pair} price={52} amount={1} loanRate={2}
                                    firePostToServer={this.firePostToServer}/>
                            <OrdersHistory/>
                        </div>
                        <div className="box notices">
                            <div className="head">
                                <div><h3>Notices</h3></div>
                                <div className="social">
                                    <a href="" className="twitter-icon"> </a>
                                </div>
                            </div>

                            <Notices />
                        </div>

                    </div>
                </div>
                }
            </div>
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



