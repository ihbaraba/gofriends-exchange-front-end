import React from 'react';
import {Table} from 'antd';
import moment from 'moment';




const WithdrawList = ({list, total, current, pageSize, onChange, onApprove}) => {
    const columns = [
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            width: 130,
        },
        // {
        //     title: 'User ID',
        //     dataIndex: 'userId',
        //     key: 'userId',
        //     width: 130,
        // },
        {
            title: 'Transaction ID',
            dataIndex: 'transactionId',
            key: 'transactionId',
            width: 200,
        },
        {
            title: 'Recepient',
            dataIndex: 'recepient',
            key: 'recepient',
            width: 200,
            render: item => (
                <span style={{whiteSpace: 'pre-line'}}>
                {item}
            </span>
            )
        },
        {
            title: 'Sender',
            dataIndex: 'sender',
            key: 'sender',
            width: 200,
            render: item => (
                <span style={{whiteSpace: 'pre-line'}}>
                {item}
            </span>
            )
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 150,
        },
        // {
        //     title: 'Tax ID',
        //     dataIndex: 'tax_id',
        //     key: 'tax_id',
        //     width: 130,
        //     sorter: true,
        // },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 200,
            render: item => (
                <span>{moment(item).format('YYYY-MM-DD HH:mm')}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (item) => {
                if (item === 'opened') {
                    return (<span style={{color: '#00CE7D'}}>Opened</span>)

                } else if(item === 'confirmed') {
                    return (<span style={{color: '#00CE7D'}}>Opened</span>)
                }else if(item === 'completed') {
                    return (<span style={{color: '#00CE7D'}}>Completed</span>)
                }
            }
        }
    ];

    const config = {
        pagination: {
            // pageSizeOptions : ['30', '40'],
            // showSizeChanger : true
            total: +total,
            current,
            pageSize
        }
    };
    console.log(list);
    return (
        <div>
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
};

export default WithdrawList;