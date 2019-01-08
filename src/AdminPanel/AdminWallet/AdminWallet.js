import React, {Component} from 'react';
import {Table} from 'antd';

class AdminWallet extends Component {


    render() {
        const columns =
            [
                {
                    title: 'Currency',
                    dataIndex: 'currency',
                    key: 'currency',
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
                    render: () => (
                        <button className='admin-btn'>View</button>
                    )
                }
            ];

        return (
            <div className="admin-wallet-page">
                <Table
                    columns={columns}
                    className='admin-table'
                />
            </div>
        )
    }
}

export default AdminWallet;