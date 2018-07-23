import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import io from 'socket.io-client';

import 'antd/lib/table/style/css';

class MarketDepth extends Component {

    constructor() {
        super();

        this.socket = io("http://gofriends.ru:3001");

        this.getDataFromSocket = this.getDataFromSocket.bind(this);

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

        if (stopTime !== 0) { console.time("Getting data from socket time took"); }

        // console.log("order_created_" + socket);
        this.socket.on("order_created_" + socket, (bid) => {

            // console.log('stock: ' + typeof(bid) ,bid);
            const {marketDepth} = this.state;
            const {buy, sell} = marketDepth;
            const line = {
                amount: bid.amount,
                price: bid.price,
                Sum: bid.amount * bid.price,
                quoteCurrency: bid.amount * bid.price,
                key: bid.id,
            };

            if (bid.type === "sell") { sell.push(line); }
            if (bid.type === "buy") { buy.push(line); }

            this.setState({marketDepth: {
                    ...marketDepth,
                    buy,
                    sell,
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

    componentDidMount() {
        // console.log(" props = ", this.props.currentPair,this.props,);
        this.getDataFromSocket(this.props.currentPair.id, 0);
    }
    componentWillUnmount() {
        this.socket.close();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentPair.id !== this.props.currentPair.id) {
            // console.log("componentWillReceiveProps", nextProps);
            const {marketDepth} = this.state;
            this.setState({marketDepth: {
                    ...marketDepth,
                    buy: [],
                    sell: [],
                }}
                ,() => {
                    this.getDataFromSocket(nextProps.currentPair.id, 0);
                }
                );
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
                {/*<h3>Market Depth</h3>*/}
                <div className="marketDepth">
                    <div className="marketDepthColumns">
                        <h5>BUY ORDERS</h5>
                        <Table columns={columns} dataSource={buy} bordered={true}  pagination={false} scroll={{ y: 240 }}  size="small"  rowClassName="rowClassName"/>
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

