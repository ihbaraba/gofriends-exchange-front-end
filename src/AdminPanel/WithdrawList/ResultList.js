import React from 'react';
import {Table} from 'antd';
import moment from 'moment';

const columns = [
    {
        title: 'Currency',
        dataIndex: 'currency',
        key: 'currency',
        width: 100,
        sorter: true,
    },
    {
        title: 'User ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        sorter: true,
    },
    {
        title: 'Transaction ID',
        dataIndex: 'transaction_id',
        key: 'transaction_id',
        width: 200,
        sorter: true,
    },
    {
        title: 'Recepient',
        dataIndex: 'recepient',
        key: 'recepient',
        width: 200,
        sorter: true,
    },
    {
        title: 'Sender',
        dataIndex: 'sender',
        key: 'sender',
        width: 200,
        sorter: true,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        width: 200,
        sorter: true,
    },
    {
        title: 'Tax ID',
        dataIndex: 'tax_id',
        key: 'tax_id',
        width: 200,
        sorter: true,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 200,
        sorter: true,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        sorter: true,
        render: (item) => {
            // if(item === 'Active') {
            return (<span style={{color: '#00CE7D'}}>Active</span>)
            // }
        }
    }
];


const ResultList = ({list, total, current, pageSize, onChange}) => {
    const config = {
        pagination: {
            // pageSizeOptions : ['30', '40'],
            // showSizeChanger : true
            total,
            current,
            pageSize
        }
    };

    return (
        <div className='result-list response-side'>
            <Table
                {...config}
                columns={columns}
                // dataSource={list}
                rowKey={record => record.id}
                // onChange={onChange}
                // loading={list.length === 0}
                className='admin-table'
            />
        </div>
    )
};

export default ResultList;