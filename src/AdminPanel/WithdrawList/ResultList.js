import React from 'react';
import {Table} from 'antd';
import moment from 'moment';




const ResultList = ({list, total, current, pageSize, onChange, onApprove}) => {
    const columns = [
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            width: 130,
            sorter: true,
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
            width: 130,
            sorter: true,
        },
        {
            title: 'Transaction ID',
            dataIndex: 'transactionId',
            key: 'transactionId',
            width: 200,
            sorter: true,
        },
        {
            title: 'Recepient',
            dataIndex: 'recepient',
            key: 'recepient',
            width: 200,
            sorter: true,
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
            sorter: true,
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
            sorter: true,
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
            sorter: true,
            render: item => (
                <span>{moment(item).format('YYYY-MM-DD HH:mm')}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            sorter: true,
            render: (item, withdraw) => {
                if (item === 'opened') {
                    return (<span>Opened</span>)

                } else if(item === 'confirmed') {
                    return (<button className='admin-btn' onClick={() => onApprove(withdraw.id)}>
                        Approve
                    </button>)
                }else if(item === 'complete') {
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

    return (
        <div className='result-list response-side'>
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

export default ResultList;