import React, {Component} from 'react';
import axios from "axios/index";
import moment from 'moment';

import Statistics from './Statistics';
import LatestOperations from './LatestOperations';
import {GET_TRADE_HISTORY, PAIRS, WITHDRAW, GET_USERS, WALLETS} from "../../constants/APIURLS";
import {changePage, lastPage} from "../../actions/AdminActions";
import {connect} from "react-redux";

class Dashboard extends Component {
    state = {
        coinPairs: [],
        tradeHistory: [],
        withdrawsHistory: [],
        wallets: [],
        usersCount: 0
    };

    async componentDidMount() {
        const dateFrom = moment(new Date()).subtract(1, "days").format('YYYY-MM-DD');
        const dateTo = moment(new Date()).format('YYYY-MM-DD');

        const [pairs, tradeHistory, withdrawsHistory, users, wallets] = await Promise.all([
            axios.get(PAIRS),
            axios.get(`${GET_TRADE_HISTORY}?skip=0&take=10&dateFrom=${dateFrom}&dateTo=${dateTo}`),
            axios.get(`${WITHDRAW}?skip=0&take=10&dateFrom=${dateFrom}&dateTo=${dateTo}`),
            axios.get(`${GET_USERS}?skip=0&take=10`),
            axios.get(WALLETS)
        ]);

        let coinPairs = pairs.data.map(pair => {
            return ({
                id: pair.id,
                name: `${pair.baseCurrency.code}/${pair.quoteCurrency.code}`
            })
        });

        this.setState({
            coinPairs,
            tradeHistory: tradeHistory.data.orders,
            withdrawsHistory: withdrawsHistory.data.withdraw,
            usersCount: users.data.count,
            wallets: wallets.data,
        })
    }

    goToHistoryPage = (type) => {
        if (type) {
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
        const {coinPairs, tradeHistory, withdrawsHistory, usersCount,wallets} = this.state;
        return (
            <div className='dashboard-page'>
                <Statistics
                    users={usersCount}
                    wallets={wallets}
                />

                <div className='latest-operations-block'>
                    <LatestOperations
                        coinPairs={coinPairs}
                        list={tradeHistory}
                        types='Latest trades'
                        goTo={this.goToHistoryPage}
                    />

                    <LatestOperations
                        list={withdrawsHistory}
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