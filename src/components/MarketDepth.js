import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {Table} from 'antd';
import axios from 'axios';

import io from 'socket.io-client';
import {SOCKET_SOURCE, ORDERS, ORDERS_PAIR} from "./../constants/APIURLS.js"
import {save_user_info} from "../actions/UserActions";

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
            const price = bid.price;
            const amount = bid.amount;

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
            const {marketDepth: {buy, sell}} = this.state;

            let newBuyArr = buy,
                newSellArr = sell;

            if (bid.type === 'buy') {
                if(newBuyArr.some(item => {
                    +item.price === +bid.price.toFixed(5)
                })) {
                    newBuyArr.forEach(item => {
                        if(item.price === bid.price) {
                            item.amount = item.amount + +bid.amount
                        }
                    })
                } else {
                    newBuyArr.unshift(bid);
                }
            } else if (bid.type === 'sell') {
                newSellArr.unshift(bid);
            }

                this.setState({
                    marketDepth: {
                        buy: this.calculateSum(newBuyArr),
                        sell: this.calculateSum(newSellArr)
                    }
                })

            // else if (bid.type === 'sell') {
            //     newSellArr = sell.map(item => {
            //         if (item.price === bid.price) {
            //             item.amount += bid.amount
            //         }
            //     })
            // }
        });

        this.socket.on("order_updated_" + socket, (bid) => {
            /**
             * don't add completed and stop/sell orders to tables
             **/
            this.getInitialPairDataFromServer(this.props.pair.id)

            // console.log(bid);
            //
            // const {marketDepth: {buy, sell}} = this.state;
            //
            // let newBuyArr = buy.map(item => {
            //     console.log(item);
            //     if(item.id === bid.id) {
            //        item.price = bid.price;
            //        item.amount = bid.amount
            //    }
            // });
            //
            // console.log(newBuyArr);

            // this.setState({
            //     marketDepth: {
            //         buy: this.calculateSum(newBuyArr),
            //         sell: this.calculateSum(sell),
            //     }
            // }, () => {
            //     console.log(this.state)
            // });
        });
    }

    getInitialPairDataFromServer = async (id) => {
        const buyUrl = `${ORDERS_PAIR}/${id}?type=buy`;
        const sellUrl = `${ORDERS_PAIR}/${id}?type=sell`;

        const [buyDepth, sellDepth] = await Promise.all([axios.get(buyUrl), axios.get(sellUrl)]);

        this.props.onSelectOrder(buyDepth.data ? buyDepth.data[0] : {price: 0, amount: 0}, 'buy');
        this.props.onSelectOrder(sellDepth.data ? sellDepth.data[0] : {price: 0, amount: 0}, 'sell');

        this.setState({
            marketDepth:
                {
                    buy: this.calculateSum(buyDepth.data),
                    sell: this.calculateSum(sellDepth.data),
                }
        });
    };

    async componentDidMount() {
        const {pair: {id}} = this.props;
        await this.getInitialPairDataFromServer(id);
        this.getDataFromSocket(id, 0);
    }

    componentWillUnmount() {
        this.socket.close();
    }

    async componentWillReceiveProps(nextProps) {
        // if (nextProps.currentPair.id !== this.props.pair.id) {
        // console.log("componentWillReceiveProps", nextProps);
        const {pair: {id}} = nextProps;
        await this.getInitialPairDataFromServer(id);
        this.getDataFromSocket(id, 0);
        // }
    }

    render() {
        const {marketDepth: {buy, sell}} = this.state;
        const {mobile, onSelectOrder} = this.props;

        const columns = [{
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            defaultSortOrder: 'descend',
            sorter: (a, b) => b.price - a.price,
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

        // const buy4Table = buy
        //     .filter(item => (!item.completed && !item.stop && !item.limit && (item.status === "active")))
        //     .sort((a, b) => b.price - a.price);
        // const sell4Table = sell
        //     .filter(item => (!item.completed && !item.stop && !item.limit && (item.status === "active")))
        //     .sort((a, b) => a.price - b.price);

        return (
            <div className="marketDepth">
                <div className="marketDepthTables">
                    <div className="marketDepthColumns table-block buy-table">
                        <div className='table-title'>Buy orders</div>
                        <Table columns={mobile ? mobileColumns : columns}
                               dataSource={buy}
                               bordered={false}
                               pagination={false}
                               // rowKey={record => record.price}
                               scroll={{y: mobile ? 200 : 450}}
                               size="small"
                               rowClassName="custom__tr"
                               onRow={(record) => {
                                   return {
                                       onClick: () => onSelectOrder(record, 'buy'),       // click row
                                   };
                               }}
                        />
                    </div>
                    <div className="marketDepthColumns table-block sell-table">
                        <div className='table-title'>Sell orders</div>
                        <Table columns={mobile ? mobileColumns : columns}
                               dataSource={sell}
                               bordered={false}
                               pagination={false}
                               // rowKey={record => record.price}
                               scroll={{y: mobile ? 200 : 450}}
                               size="small"
                               rowClassName="custom__tr"
                               onRow={(record) => {
                                   return {
                                       onClick: () => onSelectOrder(record, 'sell'),       // click row
                                   };
                               }}
                        />
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
        pair: state.pair,
        orders: state.user.orders
    }
}

const mapDispatchToProps = dispatch => ({
    save_user_info: (info) => dispatch(save_user_info(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketDepth)