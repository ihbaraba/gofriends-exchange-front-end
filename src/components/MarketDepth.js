import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'antd';
import DepthChart from './Graphic/Depth'
import {getMarcketDpthData} from "./../utils"
import io from 'socket.io-client';

import 'antd/lib/table/style/css';


class MarketDepth extends Component {

    constructor() {
        super();

        this.socket = io("http://gofriends.ru:3001");

        this.getDataFromSocket = this.getDataFromSocket.bind(this);
        this.getInitialPairDataFromServer = this.getInitialPairDataFromServer.bind(this);

        this.state = {
            socket: "undefined",
            marketDepth: {
                buy: [],
                sell: [],
            },
        };
    }

    getDataFromSocket(socket, stopTime = 0) {
        // console.log('state: ', this.state);

        if (stopTime !== 0) {
            console.time("Getting data from socket time took");
        }
        // socket.on('connect_error', (error) => {
        //     console.error("Socket connection to server is fail", error);
        //     alert("Socket connection to server is fail", error);
        // });
        // socket.on('connect_failed', (error) => {
        //     console.error("Socket connection to server error", error);
        //     alert("Socket connection to server error", error);
        // });
        // socket.on('disconnect', (reason) => {
        //     if (reason === 'io server disconnect') {
        //         // the disconnection was initiated by the server, you need to reconnect manually
        //         socket.connect();
        //     }
        //     // else the socket will automatically try to reconnect
        // });

        this.socket.on("order_created_" + socket, (bid) => {
        // console.log("order_created_", bid);

            if (bid.completed) return;

            const line = {
                amount: bid.amount,
                price: bid.price,
                Sum: bid.amount * bid.price,
                quoteCurrency: bid.amount * bid.price,
                key: bid.id,
                completed: bid.completed
            };

            const {marketDepth} = this.state;
            const {buy, sell} = marketDepth;
            // console.log(marketDepth, buy, sell);

            if (bid.type === "sell") {
                sell.unshift(line);
            }
            if (bid.type === "buy") {
                buy.unshift(line);
            }

            this.setState({
                marketDepth: {
                    ...marketDepth,
                    buy,
                    sell,
                }
            });
        });

        this.socket.on("order_updated_" + socket, (bid) => {

            const {marketDepth} = this.state;
            const {buy, sell} = marketDepth;

            const resOfSearchInBuy = buy.findIndex(item => item.id === bid.id);
            const resOfSearchInSell = sell.findIndex(item => item.id === bid.id);

            const flagBuy = (resOfSearchInBuy !== -1);
            const flagSell = (resOfSearchInSell !== -1);

            // console.log(resOfSearchInBuy, resOfSearchInSell, bid.id, bid);

            if (flagSell && !bid.completed) {
                const foundElement = sell[resOfSearchInSell];
                sell[resOfSearchInSell] = {...foundElement, amount: foundElement["amount"] - bid.amount}
            }
            if (flagBuy && !bid.completed) {
                const foundElement = buy[resOfSearchInBuy];
                sell[resOfSearchInBuy] = {...foundElement, amount: foundElement["amount"] - bid.amount}
            }

            const filtredBuy = (flagBuy && bid.completed) ? buy.splice(resOfSearchInBuy, 1) : buy; // remove element
            const filtredSell = (flagSell && bid.completed) ? sell.splice(resOfSearchInSell, 1) : sell;

            // const differenceSell = sell.length - filtredSell.length;
            // const differenceBuy = buy.length - filtredBuy.length;
            // if ( differenceSell !== 0) {console.log('!! differenceSell=', differenceSell);}
            // if ( differenceBuy !== 0) {console.log('!! differenceBuy=', differenceBuy);}

            this.setState({
                marketDepth: {
                    buy: filtredSell,
                    sell: filtredBuy,
                }
            });
        });

        if (stopTime !== 0) {
            setTimeout(() => {
                // console.log("closing");
                console.timeEnd("Getting data from socket time took");
                this.socket.close();
            }, stopTime);
        }
    }

    async getInitialPairDataFromServer(id) {

        await this.setState({marketDepth: {buy: [], sell: []}});

        // console.log("making getMarcketDpthData", {type: "buy", book: id});

        const buyDepth = await getMarcketDpthData({type: "buy", book: id});
        const sellDepth = await getMarcketDpthData({type: "sell", book: id});
        // console.log(buyDepth.filter( item => !item.completed), sellDepth.filter( item => !item.completed));
        await this.setState({
                marketDepth:
                    {
                        buy: buyDepth.filter(item => !item.completed), //save not completed bids only
                        sell: sellDepth.filter(item => !item.completed),
                    }
            }
            // , ()=> { console.log(this.state) }
        );
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
        const readyForDrawing = buy.length > 0 && sell.length > 0;
        // const {marketDepth} = this.state;
        // console.log("render marketDepth props = ", this.props.currentPair,this.state,);

        const {currentPair} = this.props;

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

        return (
            <div className="marketDepth">
                <div className="marketDepthTables">
                    <div className="marketDepthColumns">
                        <h5>BUY ORDERS</h5>
                        <Table columns={columns} dataSource={buy} bordered={false} pagination={false} scroll={{y: 240}}
                               size="small" rowClassName="custom__tr"/>
                    </div>
                    <div className="marketDepthColumns">
                        <h5>SELL ORDERS</h5>
                        <Table columns={columns} dataSource={sell} bordered={false} pagination={false} scroll={{y: 240}}
                               size="small" rowClassName="custom__tr"/>
                    </div>
                </div>
                <div className="marketDepthChart">
                    { readyForDrawing && <DepthChart buy={buy} sell={sell} height={200}/> }
                </div>
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

export default MarketDepth;

