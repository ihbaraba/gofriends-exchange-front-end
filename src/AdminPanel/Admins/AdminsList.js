import React from 'react';
import {Table} from 'antd';

const AdminsList = ({list, onRemove}) => {
    const columns = [
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
                    {/*<button className='admin-btn green-btn'>*/}
                        {/*Edit*/}
                    {/*</button>*/}
                    <button className='admin-btn red-btn' onClick={() => onRemove(item.id)}>
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
                dataSource={list}
                rowKey={record => record.id}
                className='admin-table'
                pagination={false}
            />

        </div>
    )
};

export default AdminsList;