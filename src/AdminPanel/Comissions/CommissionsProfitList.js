import React from 'react';
import {Table} from 'antd';
import moment from 'moment';

const CommissionsProfitList = ({list, total, current, pageSize, onChange}) => {
    const columns = [
        {
            title: 'User id',
            dataIndex: 'userId',
            key: 'userId',
            width: 100,
        },
        // {
        //     title: 'Trans id',
        //     dataIndex: 'transId',
        //     key: 'transId',
        //     width: 100,
        // },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 200,
            sorter: true,
            render: (date) => (
                <span>{moment(date).format('YYYY-MM-DD HH:mm')}</span>
            )
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 100,
            sorter: true,
        },
        {
            title: 'Currency',
            dataIndex: 'currencyCode',
            key: 'currencyCode',
            width: 100,
            sorter: true,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 150,
        },
        {
            title: 'Fee',
            dataIndex: 'fee',
            key: 'fee',
            width: 100,
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
        <div className='profit-list response-side'>
            <Table
                {...config}
                columns={columns}
                dataSource={list}
                rowKey={record => record.id}
                onChange={onChange}
                // loading={list.length === 0}
                className='admin-table'
            />
        </div>
    )
}

export default CommissionsProfitList;