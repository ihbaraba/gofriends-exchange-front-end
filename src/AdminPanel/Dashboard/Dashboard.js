import React, {Component} from 'react';
import axios from "axios/index";
import moment from 'moment';

import Statistics from './Statistics';
import LatestOperations from './LatestOperations';
import {GET_TRADE_HISTORY, PAIRS} from "../../constants/APIURLS";
import {changePage, lastPage} from "../../actions/AdminActions";
import {connect} from "react-redux";

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
            axios.get(`${GET_TRADE_HISTORY}?skip=0&take=10&dateFrom=${dateFrom}&dateTo=${dateTo}`),
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
            tradeHistory: tradeHistory.data.orders
        })
    }

    goToHistoryPage = (type) => {
        console.log(type);
        if(type) {
            this.props.changePage({
                title: 'Trade history',
                href: 'trade_history'
            })
        } else {
            this.props.changePage({
                title: 'Withdraw list',
                href: 'withdraw_list',
            })
        }
    };

    render() {
        const {coinPairs, tradeHistory} = this.state;
        return (
            <div className='dashboard-page'>
                <Statistics/>

                <div className='latest-operations-block'>
                    <LatestOperations
                        coinPairs={coinPairs}
                        list={tradeHistory}
                        types='Latest trades'
                        goTo={this.goToHistoryPage}
                    />

                    <LatestOperations
                        types='Latest withdraws'
                        goTo={this.goToHistoryPage}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    changePage: (page) => dispatch(changePage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);