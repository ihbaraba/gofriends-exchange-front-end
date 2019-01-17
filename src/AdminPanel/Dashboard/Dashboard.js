import React, {Component} from 'react';
import axios from "axios/index";
import moment from 'moment';

import Statistics from './Statistics';
import LatestOperations from './LatestOperations';
import {GET_TRADE_HISTORY, PAIRS} from "../../constants/APIURLS";

class Dashboard extends Component {
    state = {
        coinPairs: [],
        tradeHistory: []
    };

    async componentDidMount() {
        const dateFrom = moment(new Date()).subtract(1, "days").format('YYYY-MM-DD');
        const dateTo = moment(new Date()).format('YYYY-MM-DD');

        const [pairs, tradeHistory, withdrawsHistory] = await Promise.all([
            axios.get(PAIRS),
            axios.get(`${GET_TRADE_HISTORY}?skip=0&take=20&dateFrom=${dateFrom}&dateTo=${dateTo}`),
        ]);


        console.log(tradeHistory);

        let coinPairs = pairs.data.map(pair => {
            return ({
                id: pair.id,
                name: `${pair.baseCurrency.code}/${pair.quoteCurrency.code}`
            })
        });

        this.setState({
            coinPairs,
            tradeHistory: tradeHistory.data
        })
    }

    render() {
        const {coinPairs} = this.state;
        return (
            <div className='dashboard-page'>
                <Statistics/>

                <div className='latest-operations-block'>
                    <LatestOperations
                        coinPairs={coinPairs}
                        types='Latest trades'
                    />

                    <LatestOperations
                        types='Latest withdraws'
                    />
                </div>
            </div>
        )
    }
}

export default Dashboard;