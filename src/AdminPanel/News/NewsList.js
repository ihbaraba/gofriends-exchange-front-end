import React from 'react';
import {Table} from 'antd';

const NewsList = ({list, onChangeTable, deleteNews, editNews}) => {
    const columns = [
        {
            title: 'ID',
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
            render: (item) => {
                return(
                    <span className='description-span' dangerouslySetInnerHTML={{__html: item}}></span>
                )
            }
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
            render: (e, item) => (
                <div className='action-btn'>
                    <button className='admin-btn green-btn' onClick={() => editNews(item)}>
                        Edit
                    </button>
                    <button className='admin-btn red-btn' onClick={() => deleteNews(item.id)}>
                        Delite
                    </button>
                </div>
            )

        }
    ];
    return (
        <div className='news-list'>
            <Table
                columns={columns}
                dataSource={list}
                rowKey={record => record.id}
                onChange={onChangeTable}
                className='admin-table'
            />
        </div>
    )
}

export default NewsList;