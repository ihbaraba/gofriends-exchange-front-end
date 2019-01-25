import React, {Component} from 'react';
import {Table, Modal} from 'antd';
import axios from 'axios';

import {WALLETS} from '../../constants/APIURLS';

class AdminWallet extends Component {
    state = {
        wallets: [],
        selectedWallet: {},
        visible: false
    };

    showModal = (item) => {
        this.setState({
            visible: true,
            selectedWallet: item
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    async componentDidMount() {
        const res = await axios.get(WALLETS);

        this.setState({
            wallets: res.data
        })
    }

    render() {
        const {wallets, visible, selectedWallet} = this.state;

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
                        <input type="text"/>
                        <span className='amount-label'>{selectedWallet.currencyCode}</span>
                    </div>

                    <div className="vertical-line"></div>

                    <div className='form-item'>
                        <label htmlFor=" ">Walllet </label>
                        <input type="text"/>
                    </div>

                    <button className='admin-btn' onClick={this.handleOk}>Withdraw</button>
                </Modal>
            </div>
        )
    }
}

export default AdminWallet;