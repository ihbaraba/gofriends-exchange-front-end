import React from 'react';
import {Table, Tabs} from 'antd';

const TabPane = Tabs.TabPane;


const HistoryList = ({onChangeTab}) => {
    const columns = [
        {
            title: 'User ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            sorter: true
        },
        {
            title: 'Order ID',
            dataIndex: 'order',
            key: 'order',
            width: 100,
            sorter: true
        },
        {
            title: 'Pair',
            dataIndex: 'pair',
            key: 'pair',
            width: 100,
            sorter: true
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100,
            sorter: true
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 100,
            sorter: true
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: 100,
            sorter: true
        },
        {
            title: 'Fee',
            dataIndex: 'fee',
            key: 'fee',
            width: 100,
            sorter: true
        },
        {
            title: 'Created At',
            dataIndex: 'create_date',
            key: 'create_date',
            width: 100,
            sorter: true
        },
        {
            title: 'Completed at',
            dataIndex: 'completed_date',
            key: 'completed_date',
            width: 100,
            sorter: true
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            sorter: true
        },
    ];


    return (
        <div className="history-list">
            <Tabs
                defaultActiveKey="buy"
                type="card"
                onChange={onChangeTab}
            >
                <TabPane tab="Buy trade history" key="buy">
                    <Table
                        columns={columns}
                        // dataSource={list}
                        rowKey={record => record.id}
                        // onChange={onChange}
                        className='admin-table'
                    />
                </TabPane>

                <TabPane tab="Sell trade history" key="sell">
                    <Table
                        columns={columns}
                        // dataSource={list}
                        rowKey={record => record.id}
                        // onChange={onChange}
                        className='admin-table'
                    />
                </TabPane>
            </Tabs>

        </div>
    )
};

export default HistoryList;