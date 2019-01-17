import React from 'react';
import moment from "moment/moment";
import {Table} from 'antd';

const TradeHistory = ({data, type, total, current, pageSize, onChange, coinPairs}) => {
    const columns = [
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
            width: 100,
            // sorter: true
        },
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            // sorter: true
        },
        {
            title: 'Pair',
            dataIndex: 'pairId',
            key: 'pairId',
            width: 100,
            // sorter: true,
            render: (item) => {
                let currentPair = '';

                coinPairs.forEach(pair => {
                    if (+item === +pair.id) {
                        currentPair = pair;
                    }
                });

                return (<span>{currentPair.name}</span>)
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100,
            // sorter: true
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 100,
            // sorter: true
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: 100,
            // sorter: true
        },
        {
            title: 'Fee',
            dataIndex: 'fee',
            key: 'fee',
            width: 100,
            // sorter: true
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 100,
            // sorter: true,
            render: (item) => (<span>{moment(item).format('YYYY-MM-DD HH:mm')}</span>)

        },
        {
            title: 'Completed at',
            dataIndex: 'completedAt',
            key: 'completedAt',
            width: 100,
            // sorter: true,
            render: (item) => (<span>{item ? moment(item).format('YYYY-MM-DD HH:mm') : ''}</span>)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            // sorter: true,
            render: item => (
                <span>
                   {item === 'completed' ?
                       <span style={{color: '#00CE7D'}}>Completed</span> :
                       item === 'active' ?
                           <span style={{color: '#fff'}}>Active</span> :
                           item === 'cancelled' ?
                               <span style={{color: '#ae0515'}}>Cancelled</span> : ''}
                               </span>
            )
        }
    ];

    const config = {
        pagination: {
            total,
            current,
            pageSize
        }
    };


    return(
        <div>
            <Table
                {...config}
                columns={columns}
                dataSource={data}
                rowKey={record => record.id}
                onChange={e => onChange(e, type)}
                className='admin-table'
            />

        </div>
    )
};

export default TradeHistory;