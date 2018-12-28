import React from 'react';
import {Table} from 'antd';
import moment from 'moment';

const columns = [
    {
        title: 'User ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        sorter: true,
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: 200,
        sorter: true,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200,
        sorter: true,
    },
    {
        title: 'Verify ststus',
        dataIndex: 'verifyStatus',
        key: 'verifyStatus',
        width: 150,
        sorter: true,
        render: (item) => {
            if (item === 'verified') {
                return (<span style={{color: '#00CE7D'}}>Verified</span>)
            }
        }
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 150,
        sorter: true,
        render: (item) => (<span>{moment(item).format('YYYY-MM-DD HH:mm')}</span>)
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
    },
    {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        width: 150,
        render: () => (
            <button className='admin-btn'>View</button>
        )

    },
];


const UsersList = ({list, total, current, pageSize, onChange}) => {
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
        <div className='users-list'>
            <Table
                {...config}
                columns={columns}
                dataSource={list}
                rowKey={record => record.id}
                onChange={onChange}
                className='admin-table'
            />
        </div>
    )
};

export default UsersList;