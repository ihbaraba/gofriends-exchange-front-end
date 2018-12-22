import React from 'react';
import {Table} from 'antd';

const NewsList = () => {
    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 200,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 200,
        },
        {
            title: 'Created At',
            dataIndex: 'date',
            key: 'date',
            width: 200,
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            width: 150,
            render: () => (
                <div>
                    <button className='admin-btn'>Edit</button>
                    <button className='admin-btn'>Delite</button>
                </div>
            )

        }
    ];
    return (
        <div className='news-list'>
            <Table
                columns={columns}
                // dataSource={list}
                // rowKey={record => record.id}
                // onChange={onChange}
                // loading={list.length === 0}
                className='admin-table'
            />
        </div>
    )
}

export default NewsList;