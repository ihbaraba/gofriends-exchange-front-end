import React from 'react';
import {Table} from 'antd';
import moment from "moment/moment";

const columns = [
    {
        title: 'User ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: 200,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200,
    },
    {
        title: 'Verify ststus',
        dataIndex: 'verify',
        key: 'verify',
        width: 150,
    },
    {
        title: 'Created at',
        dataIndex: 'created',
        key: 'created',
        width: 150,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (item) => {
            if(item === 'Active') {
                return(<span style={{color: '#00CE7D'}}>Active</span>)
            }
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


const UsersList = ({list}) => {
    return (
        <div className='users-list'>
            <Table
                columns={columns}
                dataSource={list}
                rowKey={record => record.id}
                className='admin-table'
            />


        </div>
    )
}

export default UsersList;