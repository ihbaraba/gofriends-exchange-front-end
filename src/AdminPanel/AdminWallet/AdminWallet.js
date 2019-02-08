import React, {Component} from 'react';
import {Table, Modal, Icon} from 'antd';
import axios from 'axios';

import {WALLETS, WITHDRAW} from '../../constants/APIURLS';
import {toast} from "react-toastify";

class AdminWallet extends Component {
    state = {
        wallets: [],
        selectedWallet: {},
        amount: 0,
        wallet: '',
        visible: false
    };

    showModal = (item) => {
        this.setState({
            visible: true,
            selectedWallet: item
        });
    };

    handleOk = async (e) => {
        const {amount, wallet, selectedWallet} = this.state;

        try {
            await axios.post(WITHDRAW, {
                recepient: wallet,
                amount: +amount,
                currencyId: selectedWallet.currencyId
            });

            toast.success(<div className='toaster-container'><Icon type="check-circle" /> Confirmed</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

            this.setState({
                visible: false,
                amount: 0,
                wallet: ''
            });
        } catch (e) {
            toast.error(<div className='toaster-container'><Icon type="close" /> {e.response.data.userMessage}</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    async componentDidMount() {
        const res = await axios.get(WALLETS);

        this.setState({
            wallets: res.data
        })
    }

    render() {
        const {wallets, visible, selectedWallet, amount, wallet} = this.state;

        const columns =
            [
                {
                    title: 'Currency',
                    dataIndex: 'currencyCode',
                    key: 'currencyCode',
                    width: 100,
                },
                {
                    title: 'Deposit',
                    dataIndex: 'deposit',
                    key: 'deposit',
                    width: 100,
                },
                {
                    title: 'Profit',
                    dataIndex: 'profit',
                    key: 'profit',
                    width: 200,
                },
                {
                    title: '',
                    dataIndex: 'actions',
                    key: 'actions',
                    width: 150,
                    render: (text, record) => (
                        <button className='admin-btn' onClick={() => this.showModal(record)}>Withdraw</button>
                    )
                }
            ];

        return (
            <div className="admin-wallet-page">
                <Table
                    columns={columns}
                    dataSource={wallets}
                    rowKey={record => record.currencyId}
                    pagination={false}
                    className='admin-table'
                />

                <Modal
                    title="Withdraw"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    className='admins-modal admin-wallet-modal'
                >
                    <div className='description'>
                        You can withdraw {selectedWallet.currencyCode} to any wallet
                    </div>

                    <div className='form-item'>
                        <label htmlFor=" ">Amount </label>
                        <input
                            type="text"
                            value={amount}
                            onChange={e => this.setState({amount: e.target.value})}
                        />
                        <span className='amount-label'>{selectedWallet.currencyCode}</span>
                    </div>

                    <div className="vertical-line"></div>

                    <div className='row-block'>
                        <div className='form-item wallet'>
                            <label htmlFor=" ">Walllet </label>
                            <input
                                type="text"
                                value={wallet}
                                onChange={e => this.setState({wallet: e.target.value})}
                            />
                        </div>
                        <button className='admin-btn' onClick={this.handleOk}>Withdraw</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AdminWallet;