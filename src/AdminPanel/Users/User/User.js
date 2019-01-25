import React, {Component} from 'react';
import {Tabs} from 'antd';
import axios from "axios/index";

import ShortUserInformation from './ShortUserInformation';
import TradeHistory from './TradeHistory';
import KYC from './KYC';

import {GET_TRADE_HISTORY, PAIRS} from "../../../constants/APIURLS";

const TabPane = Tabs.TabPane;


class User extends Component {
    state = {
        user: {
            name: 'Ivan',
            phone: 132442
        },
        coinPairs: [],
        tradeHistoryList: [],

        pagination: {
            total: 0,
            current: 1,
            pageSize: 10,
        }
    };

    userId = this.props.match.params.id;

    getTradeHistory = async (type) => {
        const {pagination: {current, pageSize}} = this.state;

        const url = `${GET_TRADE_HISTORY}?userId=${this.userId}&type=${type}&skip=${current * 10 - 10}&take=${pageSize}`;
        const {data} = await axios.get(url);

        this.setState({
            tradeHistoryList: data.orders,
            pagination: {
                ...this.state.pagination,
                total: +data.count
            }
        })
    };

    handleChangePagination = (pagination, type) => {
        console.log(pagination);
        this.setState({
                pagination
            },
            () => {
                if (type === 'sell' || type === 'buy')
                    this.getTradeHistory(type)
            })
    };

    onChangeTab = async (tab) => {
        await this.setState({
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            }
        });

        if (tab === 'sell' || tab === 'buy') {
            this.getTradeHistory(tab);
        }

        switch (tab) {
            case 'wallets':
                console.log('wallets');
                break;

            case 'withdraws':
                console.log('withdraws');
                break;

            default:
                break;
        }
    };

    async componentDidMount() {
        const {data} = await axios.get(PAIRS);

        let coinPairs = data.map(pair => {
            return ({
                id: pair.id,
                name: `${pair.baseCurrency.code}/${pair.quoteCurrency.code}`
            })
        });
        this.setState({
            coinPairs
        })
    };

    render() {
        const {tradeHistoryList, coinPairs, user, pagination: {total, current}} = this.state;

        return (
            <div className="user-page">
                <div className='top-block'>
                    <ShortUserInformation/>

                    <div className='blocked-user-block'>
                        <div className='title'>Block user</div>

                        <div className='input-side'>
                            <div>
                                <label>Reason </label>
                                <input type="text"/>
                            </div>
                            <button className='admin-btn'>Block user</button>
                        </div>
                    </div>
                </div>

                <div className='all-information'>
                    <Tabs
                        defaultActiveKey="kyc"
                        type="card"
                        onChange={this.onChangeTab}
                    >
                        <TabPane tab="KYC" key="kyc">
                            <KYC
                                user={user}
                            />
                        </TabPane>

                        <TabPane tab="Wallets" key="wallets">
                            2
                        </TabPane>

                        <TabPane tab="Buy trade history" key="buy">
                            <TradeHistory
                                coinPairs={coinPairs}
                                data={tradeHistoryList}
                                total={total}
                                current={current}
                                type='buy'
                                onChange={this.handleChangePagination}
                            />
                        </TabPane>

                        <TabPane tab="Sell trade history" key="sell">
                            <TradeHistory
                                coinPairs={coinPairs}
                                data={tradeHistoryList}
                                total={total}
                                current={current}
                                type='sell'
                                onChange={this.handleChangePagination}
                            />
                        </TabPane>

                        <TabPane tab="Withdraws list" key="withdraws">
                            5
                        </TabPane>
                    </Tabs>

                </div>
            </div>
        )
    }
}

export default User;