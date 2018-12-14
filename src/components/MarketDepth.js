import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {Table} from 'antd';
import {getMarcketDpthData} from "./../utils"
import io from 'socket.io-client';
import {SOCKET_SOURCE, ORDERS} from "./../constants/APIURLS.js"
import {save_user_info} from "../actions/UserActions";
import {USERINFO} from "../constants/APIURLS";
import {getUserInfo} from "../utils";

class MarketDepth extends Component {
    constructor() {
        super();

        this.socket = io(SOCKET_SOURCE);

        this.getDataFromSocket = this.getDataFromSocket.bind(this);
        this.getInitialPairDataFromServer = this.getInitialPairDataFromServer.bind(this);
        this.calculateSum = this.calculateSum.bind(this);

        this.state = {
            socket: "undefined",
            marketDepth: {
                buy: [],
                sell: [],
            },
        };
    }

    calculateSum(bids) {

        const calculated = bids.map(bid => {
            const price = +bid["price"];
            const amount = +bid["amount"];

            return ({
                ...bid,
                price: +price.toFixed(5),
                amount: +amount.toFixed(5),
                Sum: +(bid.amount * bid.price).toFixed(5),
                quoteCurrency: +(bid.amount * bid.price).toFixed(5),
            })

        });
        return calculated
    }

    getDataFromSocket(socket, stopTime = 0) {
        // console.log('state: ', this.state);

        const {orders} = this.props;

        this.socket.on("order_created_" + socket, (bid) => {

            if (bid.completed) return;

            const {marketDepth} = this.state;
            const {buy, sell} = marketDepth;
            // console.log(marketDepth, buy, sell);

            if (bid.type === "sell") {
                sell.unshift(bid);
            }
            if (bid.type === "buy") {
                buy.unshift(bid);
            }

            this.setState({
                marketDepth: {
                    ...marketDepth,
                    buy: this.calculateSum(buy),
                    sell: this.calculateSum(sell),
                }
            });
        });

        this.socket.on("order_updated_" + socket, (bid) => {
            /**
             * don't add completed and stop/sell orders to tables
             **/
            // console.log("order_updated_", bid, !(bid.stop || bid.limit));
            if (!(bid.stop || bid.limit)) return;

            const {marketDepth} = this.state;
            const {buy = [], sell = []} = marketDepth;

            const resOfSearchInBuy = buy.findIndex(item => item.id === bid.id);
            const resOfSearchInSell = sell.findIndex(item => item.id === bid.id);

            const flagBuy = (resOfSearchInBuy !== -1);
            const flagSell = (resOfSearchInSell !== -1);

            if (flagSell && !bid.completed) {
                const foundElement = sell[resOfSearchInSell];
                sell[resOfSearchInSell] = {...foundElement, amount: foundElement["amount"] - bid.amount}
            }
            if (flagBuy && !bid.completed) {
                const foundElement = buy[resOfSearchInBuy];
                sell[resOfSearchInBuy] = {...foundElement, amount: foundElement["amount"] - bid.amount}
            }
            if (flagBuy && bid.completed) {
                buy.splice(resOfSearchInBuy, 1)
            }
            ; // remove element
            if (flagSell && bid.completed) {
                sell.splice(resOfSearchInSell, 1)
            }
            ; // remove element

            // console.log("order_updated_", bid, "  buy =", buy, "sell =", sell);

            orders.forEach(async (value, valueAgaine, set) => {
                if (value === bid.id) {
                    //update user info - call SAVE_USER_INFO action
                    const userInfo = await getUserInfo({rout: USERINFO, token: this.props.user.token});
                    this.props.save_user_info(userInfo.body);
                }
            });

            this.setState({
                marketDepth: {
                    buy: this.calculateSum(buy),
                    sell: this.calculateSum(sell),
                }
            });
        });

    }

    async getInitialPairDataFromServer(id) {

        await this.setState({marketDepth: {buy: [], sell: []}});

        // console.log("making getMarcketDpthData", {type: "buy", book: id});
        // console.log(this.state);
        const buyDepth = await getMarcketDpthData({
            rout: ORDERS,
            type: "buy",
            take: 50,
            book: id,
            price: "desc",
            withStop: "false"
        });
        const sellDepth = await getMarcketDpthData({
            rout: ORDERS,
            type: "sell",
            take: 50,
            book: id,
            price: "desc",
            withStop: "false"
        });

        // const buy_ = buyDepth.filter(item => !item.completed);
        // console.log("buyDepth =", buyDepth);
        // console.log("sellDepth =", sellDepth);

        await this.setState({
            marketDepth:
                {
                    buy: this.calculateSum(buyDepth.filter(item => !item.completed)), //save not completed bids only
                    // buy: buyDepth.filter(item => !item.completed).map(item => {console.log(item); return item.toFixed(3)} ),
                    sell: this.calculateSum(sellDepth.filter(item => !item.completed)),
                }
        });
    }

    async componentDidMount() {
        const {currentPair: {id = 1}} = this.props;
        await this.getInitialPairDataFromServer(id);
        // console.log("componentDidMount", this.state);
        this.getDataFromSocket(id, 0);
    }

    componentWillUnmount() {
        this.socket.close();
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.currentPair.id !== this.props.currentPair.id) {
            // console.log("componentWillReceiveProps", nextProps);
            const {currentPair: {id = 1}} = nextProps;
            await this.getInitialPairDataFromServer(id);
            this.getDataFromSocket(nextProps.currentPair.id, 0);
        }
    }

    render() {
        const {marketDepth: {buy, sell}} = this.state;
        const {mobile} = this.props;
        // const readyForDrawing = buy.length > 0 && sell.length > 0;
        // const {marketDepth} = this.state;
        // console.log("render marketDepth props = ", this.props.currentPair,this.state,);

        // const {currentPair} = this.props;

        const columns = [{
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 150,
        }, {
            title: this.props.currentPair.first,
            dataIndex: 'amount',
            key: 'amount',
            width: 150,
        }, {
            title: this.props.currentPair.second,
            dataIndex: 'quoteCurrency',
            key: 'quoteCurrency',
            width: 150,
        }, {
            title: 'Sum',
            dataIndex: 'Sum',
            key: 'Sum',
            width: 150,
        }];

        const mobileColumns = [
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                width: 150,
            },
            // {
            //     title: this.props.currentPair.first,
            //     dataIndex: 'amount',
            //     key: 'amount',
            //     width: 150,
            // },
            // {
            //     title: this.props.currentPair.second,
            //     dataIndex: 'quoteCurrency',
            //     key: 'quoteCurrency',
            //     width: 150,
            // },
            {
                title: 'Sum',
                dataIndex: 'Sum',
                key: 'Sum',
                width: 150,
            }
        ];

        // const buy4DepthChart = buy
        //     .filter(item => (!item.completed && !item.stop && !item.limit && (item.status === "active")));
        // const sell4DepthChart = sell
        //     .filter(item => (!item.completed && !item.stop && !item.limit && (item.status === "active")));

        const buy4Table = buy
            .filter(item => (!item.completed && !item.stop && !item.limit && (item.status === "active")))
            .sort((a, b) => b.price - a.price);
        const sell4Table = sell
            .filter(item => (!item.completed && !item.stop && !item.limit && (item.status === "active")))
            .sort((a, b) => a.price - b.price);

        return (
            <div className="marketDepth">
                <div className="marketDepthTables">
                    <div className="marketDepthColumns table-block buy-table">
                        <div className='table-title'>Buy orders</div>
                        <Table columns={mobile ? mobileColumns : columns}
                               dataSource={buy4Table}
                               bordered={false}
                               pagination={false}
                               rowKey={record => record.id}
                               scroll={{y: mobile ? 200 : 450}}
                               size="small"
                               rowClassName="custom__tr"/>
                    </div>
                    <div className="marketDepthColumns table-block sell-table">
                        <div className='table-title'>Sell orders</div>
                        <Table columns={mobile ? mobileColumns : columns}
                               dataSource={sell4Table}
                               bordered={false}
                               pagination={false}
                               rowKey={record => record.id}
                               scroll={{y: mobile ? 200 : 450}}
                               size="small"
                               rowClassName="custom__tr"/>
                    </div>
                </div>
                {/*<div className="marketDepthChart">*/}
                {/*{readyForDrawing && <DepthChart buy={buy4DepthChart} sell={sell4DepthChart} height={200}/>}*/}
                {/*</div>*/}
            </div>
        )
    }
}

MarketDepth.defaultProps = {
    currentPair: {
        id: 1,
        first: "BTC",
        second: "ETH",
    }
};

MarketDepth.propTypes = {
    currentPair: PropTypes.object.isRequired,
};

MarketDepth.propTypes = {
    // dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user,
        orders: state.user.orders
    }
}

const mapDispatchToProps = dispatch => ({
    save_user_info: (info) => dispatch(save_user_info(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketDepth)