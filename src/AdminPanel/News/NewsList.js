import React from 'react';
import {Table} from 'antd';
import moment from 'moment';

const NewsList = ({list = [], onChangeTable, deleteNews, editNews, total, current, pageSize}) => {
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
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 200,
            render: date => (
                <span>{moment(date).format('YYYY-MM-DD HH:mm')}</span>
            )
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
                        Delete
                    </button>
                </div>
            )

        }
    ];

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
        <div className='news-list'>
            <Table
                columns={columns}
                {...config}
                dataSource={list}
                rowKey={record => record.id}
                onChange={onChangeTable}
                className='admin-table'
            />
        </div>
    )
}

export default NewsList;