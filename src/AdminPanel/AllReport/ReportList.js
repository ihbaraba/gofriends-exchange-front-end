import React from 'react';
import {Table} from 'antd';
import moment from 'moment';

const columns = [
    {
        title: 'Created at',
        dataIndex: 'createDate',
        key: 'createDate',
        width: 200,
        sorter: true,
    },
    {
        title: 'User ID',
        dataIndex: 'id',
        key: 'id',
        width: 150,
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
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: 200,
        sorter: true,
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        width: 100,
        sorter: true,
    },
    {
        title: 'Transaction ID',
        dataIndex: 'transactionId',
        key: 'transactionId',
        width: 150,
        sorter: true,
    }
];


const ReportList = ({list, total, current, pageSize, onChange}) => {
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
        <div className='all-report-list response-side'>
            <Table
                /*{...config}*/
                columns={columns}
                // dataSource={list}
                // rowKey={record => record.id}
                // onChange={onChange}
                // loading={list.length === 0}
                className='admin-table'
            />
        </div>
    )
};

export default ReportList;