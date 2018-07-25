import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table} from 'antd';
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
            // pair: {
            //     id: 1,
            //     first: "BTC",
            //     second: "ETH",
            // },
            marketDepth: {
                buy: [],
                sell: [],
            },
        };
    }

    getDataFromSocket(socket, stopTime = 0) {
            console.log('state: ', this.state);

        if (stopTime !== 0) { console.time("Getting data from socket time took"); }

        this.socket.on("order_created_" + socket, (bid) => {

            // console.log('stock: ' + typeof(bid) ,bid);
            const {marketDepth} = this.state;
            const {buy, sell} = marketDepth;
            // console.log(marketDepth, buy, sell);

            const line = {
                amount: bid.amount,
                price: bid.price,
                Sum: bid.amount * bid.price,
                quoteCurrency: bid.amount * bid.price,
                key: bid.id,
            };

            if (bid.type === "sell") { sell.unshift(line); }
            if (bid.type === "buy") { buy.unshift(line); }

            this.setState({marketDepth: {
                    ...marketDepth,
                    buy,
                    sell,
                }});
        });

        this.socket.on("order_updated_" + socket, (bid) => {

            // console.log('order_updated_'+ socket ,bid);
            const {marketDepth} = this.state;
            const {buy, sell} = marketDepth;
            // console.log(marketDepth, buy, sell);

            const resOfSearchInBuy = buy.findIndex( item => item.id === bid.id );
            const resOfSearchInSell = sell.findIndex( item => item.id === bid.id );

            const flagBuy = (resOfSearchInBuy !== -1);
            const flagSel = (resOfSearchInSell !== -1);


            console.log(resOfSearchInBuy, resOfSearchInSell,  bid);



            const filtredSell = (flagBuy && bid.completed) ? sell.splice(resOfSearchInBuy, 1) : sell; // remove element
            const filtredBuy = (flagSel && bid.completed) ? buy.splice(resOfSearchInSell, 1) : buy;


            // const filtredSell = sell.filter( item => item.id !== bid.id );
            // const filtredBuy = buy.filter( item => item.id !== bid.id );

            const differenceSell = sell.length - filtredSell.length;
            const differenceBuy = buy.length - filtredBuy.length;
            if ( differenceSell !== 0) {console.log('!! differenceSell=', differenceSell);}
            if ( differenceBuy !== 0) {console.log('!! differenceBuy=', differenceBuy);}

            // console.log(resOfSearchInBuy, resOfSearchInSell, filtredSell, filtredBuy, bid.id);


            this.setState({marketDepth: {
                    ...marketDepth,
                    buy: filtredSell,
                    sell: filtredBuy,
                }});
        });

        if (stopTime !== 0) {
            setTimeout( () => {
                // console.log("closing");
                console.timeEnd("Getting data from socket time took");
                this.socket.close();
            }, stopTime );
        }
    }

    async getInitialPairDataFromServer(id) {
        // console.log(this.props, id);

        await this.setState({marketDepth: {buy: [], sell: []}});

        const buyDepth = await getMarcketDpthData({type: "buy", book: id});
        const sellDepth = await getMarcketDpthData({type: "sell", book: id});
        await this.setState({marketDepth: {buy: buyDepth, sell: sellDepth}}
            , ()=> { console.log(this.state) }
        );
    }

    async componentDidMount() {
        const {currentPair: {id =1}} = this.props;
        await this.getInitialPairDataFromServer(id);
        this.getDataFromSocket(id, 0);
    }

    componentWillUnmount() {
        this.socket.close();
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.currentPair.id !== this.props.currentPair.id) {
            console.log("componentWillReceiveProps", nextProps);
            const {currentPair: {id =1}} = nextProps;
            await this.getInitialPairDataFromServer(id);
            this.getDataFromSocket(nextProps.currentPair.id, 0);
        }
    }

    render() {
        const {marketDepth: {buy, sell}} = this.state;
        // const {marketDepth} = this.state;
        // console.log("render marketDepth props = ", this.props.currentPair,this.state,);

        const { currentPair } = this.props;

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
            <div>
                <div className="marketDepth">
                    <div className="marketDepthColumns">
                        <h5>BUY ORDERS</h5>
                        <Table columns={columns} dataSource={buy} bordered={true}  pagination={false} scroll={{ y: 240 }}  size="small"  rowClassName="rowClassName, Test"/>
                    </div>
                    <div className="marketDepthColumns">
                        <h5>SELL ORDERS</h5>
                        <Table columns={columns} dataSource={sell} bordered={true} pagination={false} scroll={{ y: 240 }}  size="small"  rowClassName="rowClassName"/>
                    </div>
                </div>
            </div>
        )
    }
}

MarketDepth.defaultProps = {
    currentPair:  {
        id: 1,
        first: "BTC",
        second: "ETH",
    }
};

MarketDepth.propTypes = {
    currentPair: PropTypes.object.isRequired,
};

export default MarketDepth;

