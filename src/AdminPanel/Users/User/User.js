import React, {Component} from 'react';
import {Tabs, Icon} from 'antd';
import axios from "axios/index";
import {toast} from "react-toastify";

import ShortUserInformation from './ShortUserInformation';
import TradeHistory from './TradeHistory';
import WalletsList from './WalletsList';
import WithdrawList from './WithdrawList';
import KYC from './KYC';

import {
    GET_TRADE_HISTORY,
    PAIRS,
    VERIFICATION,
    WITHDRAW,
    VERIFY,
    USER_WALLETS,
    GET_USERS
} from "../../../constants/APIURLS";

const TabPane = Tabs.TabPane;

class User extends Component {
    state = {
        kyc: {
            documents: [],
            user: {
                verifyStatus: '',
                status: 'active',
            }
        },
        coinPairs: [],
        tradeHistoryList: [],
        withdrawList: [],
        wallets: [],
        blockedReason: '',

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

    getWithdrawList = async () => {
        const {pagination: {current, pageSize}} = this.state;

        const url = `${WITHDRAW}?userId=${this.userId}&skip=${current * 10 - 10}&take=${pageSize}`;
        const {data} = await axios.get(url);

        this.setState({
            withdrawList: data.withdraw,
            pagination: {
                ...this.state.pagination,
                total: +data.count
            }
        })
    };

    getWallets = async () => {
        const {data} = await axios.get(`${USER_WALLETS}/${this.userId}`);

        this.setState({
            wallets: data,
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

    onVerifyUser = async (id, verify) => {
        try {
            await axios.put(`${VERIFY}/${id}`, {
                isVerified: verify
            });

            toast.success(<div className='toaster-container'><Icon type="check-circle"/> Confirmed</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } catch (e) {
            toast.error(<div className='toaster-container'><Icon type="close"/> {e.response.data.userMessage}</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

        this.setState({
            kyc: {
                ...this.state.kyc,
                user: {
                    ...this.state.kyc.user,
                    verifyStatus: verify ? 'verified' : 'rejected'
                }
            }
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
                this.getWallets();
                break;

            case 'withdraws':
                this.getWithdrawList();
                break;

            default:
                break;
        }
    };

    blockedUser = () => {
        axios.put(`${GET_USERS}/${this.userId}`, {
            status: "blocked",
            blockedReason: this.state.blockedReason
        })
    };

    async componentDidMount() {
        const [pairs, kyc] = await Promise.all([axios.get(PAIRS), axios.get(`${VERIFICATION}/${this.userId}`)]);

        let coinPairs = pairs.data.map(pair => {
            return ({
                id: pair.id,
                name: `${pair.baseCurrency.code}/${pair.quoteCurrency.code}`
            })
        });

        this.setState({
            coinPairs,
            kyc: kyc.data ? kyc.data : {}
        })
    };

    render() {
        const {tradeHistoryList, withdrawList, coinPairs, wallets, kyc, kyc: {user}, pagination, blockedReason} = this.state;

        return (
            <div className="user-page">
                <div className='top-block'>
                    <ShortUserInformation
                        user={user}
                    />

                    <div className='blocked-user-block'>
                        <div className='title'>Block user</div>

                        <div className='input-side'>
                            <div>
                                <label>Reason </label>
                                <input
                                    type="text"
                                    value={blockedReason}
                                    onChange={({target}) => this.setState({blockedReason: target.value})}
                                />
                            </div>
                            <button className='admin-btn' onClick={this.blockedUser}>Block user</button>
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
                                kyc={kyc}
                                verify={this.onVerifyUser}
                            />
                        </TabPane>

                        <TabPane tab="Wallets" key="wallets">
                            <WalletsList
                                data={wallets}
                            />
                        </TabPane>

                        <TabPane tab="Buy trade history" key="buy">
                            <TradeHistory
                                coinPairs={coinPairs}
                                data={tradeHistoryList}
                                {...pagination}
                                type='buy'
                                onChange={this.handleChangePagination}
                            />
                        </TabPane>

                        <TabPane tab="Sell trade history" key="sell">
                            <TradeHistory
                                coinPairs={coinPairs}
                                data={tradeHistoryList}
                                {...pagination}
                                type='sell'
                                onChange={this.handleChangePagination}
                            />
                        </TabPane>

                        <TabPane tab="Withdraws list" key="withdraws">
                            <WithdrawList
                                list={withdrawList}
                                {...pagination}
                                onChange={this.handlePaginationChange}
                                // onApprove={this.handleApprove}
                            />
                        </TabPane>
                    </Tabs>

                </div>
            </div>
        )
    }
}

export default User;