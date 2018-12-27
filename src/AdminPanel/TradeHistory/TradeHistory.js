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
            selectPair: '',
            dateFrom: '',
            dateTo: '',
            status: ''
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
        this.setState({
            coinPairs: data
        })
    }

    getTradeHistory = async () => {
        const {filter: {id, selectPair, dateFrom, dateTo, status}, pagination: {current, pageSize}, historyType} = this.state;

        const urlParams = [
            id ? `&id=${id}` : null,
            selectPair ? `&pair=${selectPair}` : null,
            dateFrom ? `&dateFrom=${dateFrom}` : null,
            dateTo ? `&dateTo=${dateTo}` : null,
            status ? `&status=${status}` : null,
        ];

        const url = `${GET_TRADE_HISTORY}?type=${historyType}&skip=${current * 10 - 10}&take=${pageSize}${urlParams.join('')}`;
        const {data} = await axios.get(url);
        // this.setState({
        //     coinPairs: data
        // })
    };

    render() {
        const {historyList, coinPairs} = this.state;

        return (
            <div className="trade-history">
                <FilterBlock
                    onSearch={e => console.log(e)}
                    pairs={coinPairs}
                    page='trade'
                />

                <HistoryList
                    onChangeTab={type => this.setState({historyType: type})}
                    list={historyList}
                />
            </div>
        )
    }
}

export default TradeHistory;