import React, {Component} from 'react';
import axios from 'axios';

import FilterBlock from '../components/FilterBlock';
import HistoryList from "./HistoryList";

import {PAIRS, GET_TRADE_HISTORY} from "../../constants/APIURLS";


class TradeHistory extends Component {
    state = {
        historyType: 'buy',
        coinPairs: [],
        historyList: [],
        filter: {
            id: '',
            pair: '',
            dateFrom: '',
            dateTo: '',
            status: '',
            sortName: '',
            sortType: ''
        },
        pagination: {
            total: 0,
            current: 1,
            pageSize: 10,
        }
    };

    async componentDidMount() {
        this.getTradeHistory();

        const {data} = await axios.get(PAIRS);

        let coinPairs = data.map(pair => {
            return ({
                id: pair.id,
                name: `${pair.baseCurrency.code}/${pair.quoteCurrency.code}`
            })
        })
        this.setState({
            coinPairs
        })
    }

    getTradeHistory = async () => {
        const {filter: {id, pair, dateFrom, dateTo, status, sortName, sortType}, pagination: {current, pageSize}, historyType} = this.state;

        const urlParams = [
            id ? `&userId=${id}` : null,
            pair ? `&pairId=${pair}` : null,
            dateFrom ? `&dateFrom=${dateFrom}` : null,
            dateTo ? `&dateTo=${dateTo}` : null,
            status ? `&status=${status}` : null,
            sortName ? `&sort=${sortName}:${sortType}` : null,
        ];

        const url = `${GET_TRADE_HISTORY}?type=${historyType}&skip=${current * 10 - 10}&take=${pageSize}${urlParams.join('')}`;
        const {data} = await axios.get(url);
        this.setState({
            historyList: data.orders,
            pagination: {
                ...this.state.pagination,
                total: +data.count
            }
        })
    };

    handlePaginationChange = (pagination, filters, sorter) => {
        const sortType = sorter.order === 'descend' ? 'desc' : sorter.order === 'ascend' ? 'asc' : '';
        this.setState({
                pagination,
                filter: {
                    ...this.state.filter,
                    sortName: sorter.columnKey,
                    sortType
                }
            },
            () => this.getTradeHistory())
    };

    handleSearch = params => {
        console.log(params);
        this.setState({
                filter: {
                    ...this.state.filter,
                    ...params
                }
            },
            () => this.getTradeHistory());
    };


    handleChangeTab = type => {
        this.setState({
            historyType: type
        }, () => this.getTradeHistory())
    };

    render() {
        const {historyList, coinPairs, pagination} = this.state;

        return (
            <div className="trade-history">
                <FilterBlock
                    onSearch={e => this.handleSearch(e)}
                    pairs={coinPairs}
                    page='trade'
                />

                <HistoryList
                    {...pagination}
                    onChangeTab={this.handleChangeTab}
                    onChange={this.handlePaginationChange}
                    list={historyList}
                    coinPairs={coinPairs}
                />
            </div>
        )
    }
}

export default TradeHistory;