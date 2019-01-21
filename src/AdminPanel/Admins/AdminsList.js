import React from 'react';
import {Table} from 'antd';

const AdminsList = ({list}) => {
    const columns = [
        {
            title: 'Role',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Email',
            dataIndex: 'title',
            key: 'title',
            width: 200,
        },
        {
            title: 'Password',
            dataIndex: 'date',
            key: 'date',
            width: 200,
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            width: 150,
            render: (e, item) => (
                <div className='action-btn'>
                    <button className='admin-btn green-btn'>
                        Edit
                    </button>
                    <button className='admin-btn red-btn'>
                        Delite
                    </button>
                </div>
            )

        }
    ];

    return(
        <div className='admins-list-block response-side'>
            <Table
                columns={columns}
                // dataSource={list}
                // rowKey={record => record.id}
                className='admin-table'
            />

        </div>
    )
};

export default AdminsList;