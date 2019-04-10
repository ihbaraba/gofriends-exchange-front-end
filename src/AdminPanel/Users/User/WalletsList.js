import React from 'react';
import {Table} from 'antd';


const WalletsList = ({data}) => {
    const columns = [
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            width: 130,
            render: (currency) => (
                <span>{currency.code}</span>
            )
        },
        {
            title: 'Wallet',
            dataIndex: 'address',
            key: 'address',
            width: 200,
        },
        {
            title: 'Balance',
            dataIndex: 'amount',
            key: 'amount',
            width: 200,
        },
        {
            title: '',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 200,
            render: item => (
                <button className='admin-btn'>View</button>
            )
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.id}
                // loading={list.length === 0}
                className='admin-table wallets'
                pagination={false}
            />
        </div>
    )
};

export default WalletsList;