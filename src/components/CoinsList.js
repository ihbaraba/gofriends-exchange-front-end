import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {pair} from '../actions/ExchangeActions'
import {PAIRS, MARKETS, SOCKET_SOURCE} from '../constants/APIURLS'

import {getCoinsList} from "./../utils"
import {Tabs, Table} from "antd";
import io from "socket.io-client";
// import 'antd/lib/table/style/css';

const TabPane = Tabs.TabPane;

class CoinsList extends React.Component {
    constructor() {
        super();

        this.socket = io(SOCKET_SOURCE);

        this.getDataFromSocket = this.getDataFromSocket.bind(this);
        this.list = this.list.bind(this);
        this.tabsCallback = this.tabsCallback.bind(this);

        // this.currenciesTabs = this.currenciesTabs.bind(this);

        this.state = {
            activeTab: ''
        }
    }

    async componentDidMount() {
        const data = await getCoinsList(PAIRS);
        const markets_pairs = await getCoinsList(MARKETS);

        const pairs = data.map((item, idx) => ({
            id: item.id,
            fee: item.fee,
            first: item.baseCurrency.code,
            baseCurrency: item.baseCurrency.code,
            baseCurrencyName: item.baseCurrency.name,
            second: item.quoteCurrency.code,
            quoteCurrency: item.quoteCurrency.code,
            quoteCurrencyName: item.quoteCurrency.name,

            change: markets_pairs[idx]["change"],
            price: markets_pairs[idx]["price"],
            volumeBase: markets_pairs[idx]["volumeBase"],
            volumeQuote: markets_pairs[idx]["volumeQuote"],
        })).sort((a, b) => a.id - b.id);
        // console.log("pairs=", pairs);
        // const coins = [... new Set( data.map( item => item.baseCurrency.code ))];
        const coins = [...new Set(pairs.map(item => item.baseCurrency))];
        // console.log("PAIRS ", pairs, coins, markets_pairs, data);
        this.setState({data, coins, pairs});

        if (!this.props.currentPair) {
            this.tabsCallback(pairs[pairs.length-1]);

            this.setState({
                activeTab: pairs[pairs.length-1].first
            })
        } else {
            this.tabsCallback(this.props.currentPair)
        }

        pairs.forEach(item => this.getDataFromSocket(item.id, 0));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            activeTab: nextProps.currentPair.first
        })
    }

    list = data => data.map(
        item => (<div
            key={`CoinsList_${item.baseCurrency.code}_${item.quoteCurrency.code}`}>{item.id} {item.baseCurrency.name} / {item.quoteCurrency.code}</div>)
    );

    getDataFromSocket(id, stopTime = 0) {
        const pairs = this.state.pairs ? this.state.pairs : [];
        const idx = pairs.findIndex(el => el.id === id);
        // console.log("idx =", idx, "id =", id);

        this.socket.on("markets_updated_" + id, (bid) => {
            const pairs = this.state.pairs;
            const newPair = {
                ...pairs[idx],
                ...bid,
            };
            const newPairs = [...pairs];
            newPairs[idx] = newPair;
            // console.log("id =", id, "newPair =",newPair);
            // console.log("newPairs =", newPairs);
            this.setState({
                pairs: [...newPairs]
            });
        });
    }

    tabsCallback(key) {
        const pairs = this.state.pairs;
        const newCurrent = pairs ? pairs.find(item => item.id === +key.id) : '';
        this.props.setCurentCoinsPair2State(newCurrent);
        this.props.pair(newCurrent);
    }

    currenciesTabs = items => {
        const pairs = this.state.pairs;
        const columns = [
            {
                title: 'Coin',
                dataIndex: 'coin',
                className: 'coinRawItems',
                width: '25%',

            },
            {
                title: 'Price',
                dataIndex: 'price',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.price - b.price,
                className: 'coinRawItems',
                width: '25%',

            },
            {
                title: 'Volume',
                dataIndex: 'volume',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.volume - b.volume,
                className: 'coinRawItems',
                width: '25%',

            },
            {
                title: 'Change',
                dataIndex: 'change',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.change - b.change,
                className: 'coinRawItems',
                width: '25%',

            },
            //     {
            //     title: 'Name',
            //     dataIndex: 'name',
            //     className: 'coinRawItems',
            // }
        ];

        return (items.map(
            (item, idx) => <TabPane tab={item} key={item} className="coinsPairs">
                <Table
                    columns={columns}
                    pagination={false}
                    rowKey={item.id}
                    bordered={false}
                    scroll={{y: 330}}

                    onRow={(record) => {
                        return {
                            onClick: () => this.tabsCallback(record),       // click row
                        };
                    }}
                    rowClassName={record => {
                        if ((record.coin === this.props.state.pair.quoteCurrency) && (item === this.props.state.pair.baseCurrency)) {
                            return 'selected-coin-row'
                        }
                    }}
                    dataSource={
                        [...pairs.filter(pair => pair.first === item)]
                            .map(item => ({
                                coin: item.quoteCurrency,
                                price: item["price"].toFixed(3),
                                volume: item["volumeBase"].toFixed(3),
                                change: item["change"].toFixed(2),
                                name: item.quoteCurrencyName,
                                id: item.id,
                                key: `key_${item.id}`,
                            }))
                    }
                />
            </TabPane>
        ))
    };

    render() {
        // console.log(this.state);
        const {activeTab} = this.state;
        if (!this.state.activeTab) {
            return <div>Loading...</div>
        }

        return (
            <div className="currencysPairs table-block">
                {/*<div className='border2'>*/}
                <Tabs
                    type="card"
                    defaultActiveKey={activeTab}
                >
                    {this.state.coins && this.currenciesTabs(this.state.coins)}
                </Tabs>
                {/*</div>*/}
            </div>
        )
    }
}

CoinsList.propTypes = {
    // dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        state,
        currentPair: state.pair
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(pair, dispatch),
        pair: (newPair) => dispatch(pair(newPair)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinsList)


