import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {changePair} from '../actions/ExchangeActions';
import Header2 from './Header2';

import Footer from './Footer';

import Orders from './Orders';
import Graphic from './Graphic/Graphic'
import MarketDepth from './MarketDepth'
import '../App.css';
import CoinsList from "./CoinsList";
import UserInfo from "./UserInfo";
import initialState from "../store/initialState";
import {sendOrder, getUserInfo} from "./../utils";
import { Radio } from "antd";
// import * as ExchangeActions from '../actions/ExchangeActions'
// import ExchangePageLogic from './Logics/ExchangePageLogic';
import "antd/lib/radio/style/css";
import {ORDERS, USERINFO} from "./../constants/APIURLS.js"
import {login_success, save_user_info, save_user_orders} from "../actions/UserActions";
import {chart_timing} from "../actions/ChartActions";


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
        const { user: {token} } = this.props; //read from redux state
        console.log("token =", token, "this.state ==>", this.state);
        const isAuthorised = (token !== "") && (token !== null); // ? true : false
        // const isAuthorised = true; // ? true : false
        this.setState({isAuthorised, token});
        if (isAuthorised) {
            // this.props.login_success({token});
            const userInfo = await getUserInfo({rout: USERINFO, token});
            // console.log("userInfo", userInfo.body);
            const {body} = userInfo;
            this.props.save_user_info(body);
        }
    }

    async firePostToServer (bidProps) {
      // console.log("firePostToServer", this.state.pair.id, bidProps);
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
        const {pair: { first, second, id }, interval, appendFake, isAuthorised, token, user } = this.state;
        // console.log("isAuthorised =",isAuthorised);
        return (
            <div>
                <Header2/>
                { (!isAuthorised) &&
                    <div className="wrapper-all">
                        <h3><bold>You have not been authorized. Please go to the authorization page.</bold></h3>
                    </div>}
                { isAuthorised &&
                        <div className="wrapper-all">

                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div className="padding" style={{flex: "1 0", clear: "both"}}>
                            <h1 className="h1">{`${first} exchange on ${second}`} </h1>
                            <p className="small-text">{`${first} / ${second}`}</p>
                        </div>
                    </div>

                    <div className="centerArea">
                        <div className="rightSide">
                            <Graphic
                                pairId={id}
                                dateFrom={"2018-07-24"}
                                dateTo={"2018-07-31"}
                                take={1000}
                                interval={interval}
                                appendFake={"false"}
                            />
                            <div className="candlesticks">
                                <Radio.Group value={interval} onChange={this.handleTimeFrameChange}>
                                    <Radio.Button value="5min" >5-min</Radio.Button>
                                    <Radio.Button value="15min" >15-min</Radio.Button>
                                    <Radio.Button value="30min" >30-min</Radio.Button>
                                    <Radio.Button value="1hr" >1-hr</Radio.Button>
                                    <Radio.Button value="2hr" >2-hr</Radio.Button>
                                    <Radio.Button value="4hr" >4-hr</Radio.Button>
                                    <Radio.Button value="1day" >1-day</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className="side">
                            <CoinsList setCurentCoinsPair2State={this.setCurrentCoinsPair2State}/>
                        </div>
                    </div>
                    <div className="centerArea-second">
                        <div className="main-content">
                            <UserInfo short />
                            <MarketDepth currentPair={this.state.currentPair}/>
                            <Orders {...this.state.pair} price={52} amount={1} loanRate={2} firePostToServer={this.firePostToServer}/>
                        </div>
                        <div className="box notices">
                            <div className="head">
                                <div className="name h1">Notices</div>
                                <div className="social">
                                    <a href="#" className="twitter-icon"></a>
                                </div>
                            </div>
                            <div className="data" id="noticesBoard">
                                <div className="msg">
                                    <div className="info">We understand that there are some concerns about our process
                                        to verify
                                        legacy accounts. Although we are actively encouraging customers to complete the
                                        process within the next two weeks and doing our best to address any issues that
                                        may
                                        arise, there will be customers who are unable to complete the process in that
                                        timeframe. These customers will still have the option to complete verification
                                        to
                                        restore full account functionality, but meanwhile will not be able to trade or
                                        withdraw funds. At all times, their funds will be safe and accounted for. As a
                                        reminder, please beware of scams - at no point in time will we ask for a deposit
                                        to
                                        restore account functionality.
                                    </div>
                                    <div className="by">Posted by <strong>GoFriends Team</strong> at 2018-05-31 17:34:34
                                    </div>
                                </div>
                                <div className="msg">
                                    <div className="info">We are now requiring that all legacy GoFriends accounts become
                                        verified
                                        through the latest version of our verification portal. If you have a legacy
                                        account,
                                        you will not have the ability to use GoFriends until your profile verification
                                        is
                                        complete. We are asking everyone to take action within the next 14 days. We
                                        appreciate your cooperation in this process.
                                    </div>
                                    <div className="by">Posted by <strong>GoFriends Team</strong> at 2018-05-27 05:46:49
                                    </div>
                                </div>
                                <div className="msg">
                                    <div className="info">We are permanently shutting down the SJCX wallet on June 29.
                                        This
                                        means that you will have until then to transfer any SJCX that you have off the
                                        exchange. Following June 29, 2018 you will have no ability to recover or access
                                        any
                                        SJCX that you currently hold on GoFriends. Note that the STORJ team is offering
                                        to
                                        exchange SJCX for STORJ. For more information please visit <a
                                            href="https://sjcxto.storj.io">https://sjcxto.storj.io</a></div>
                                    <div className="by">Posted by <strong>GoFriends Team</strong> at 2018-05-25 19:34:48
                                    </div>
                                </div>
                                <div className="msg">
                                    <div className="info">The BELA legacy coin will no longer be supported by the Bela
                                        team as
                                        of May 31. As a result, we will be delisting all legacy BELA markets on May 17.
                                        Trading in BELA pairs will no longer be supported at that time, and you will
                                        have
                                        until May 31 to withdraw your balance.
                                    </div>
                                    <div className="by">Posted by <strong>GoFriends Team</strong> at 2018-05-10 23:49:30
                                    </div>
                                </div>
                                <div className="msg">
                                    <div className="info">On May 15, we're introducing more compelling, consistent
                                        pricing
                                        across the board. Read more <a
                                            href="#"><b><u>here</u></b></a>.
                                    </div>
                                    <div className="by">Posted by <strong>GoFriends Team</strong> at 2018-05-01
                                        18:45:56
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                }
                <Footer/>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    login_success: (token) => dispatch(login_success(token)),
    chart_timing: (timing) => dispatch(chart_timing(timing)),
    save_user_info: (info) => dispatch(save_user_info(info)),
    save_user_orders: (order) => dispatch(save_user_orders(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePage);



