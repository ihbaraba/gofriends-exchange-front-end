import React from 'react';
import {Table, Tabs} from 'antd';
import moment from "moment/moment";

const TabPane = Tabs.TabPane;


const HistoryList = ({onChangeTab, onChange, list, coinPairs, total, current, pageSize,}) => {

        const columns = [
            {
                title: 'User ID',
                dataIndex: 'userId',
                key: 'userId',
                width: 100,
                sorter: true
            },
            {
                title: 'Order ID',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                sorter: true
            },
            {
                title: 'Pair',
                dataIndex: 'pairId',
                key: 'pairId',
                width: 100,
                sorter: true,
                render: (item) => {
                    let currentPair = '';

                    coinPairs.forEach(pair => {
                        if (+item === +pair.id) {
                            currentPair = pair;
                        }
                    });

                    return (<span>{currentPair.name}</span>)
                }
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
                dataIndex: 'createdAt',
                key: 'createdAt',
                width: 100,
                sorter: true,
                render: (item) => (<span>{moment(item).format('YYYY-MM-DD HH:mm')}</span>)

            },
            {
                title: 'Completed at',
                dataIndex: 'completedAt',
                key: 'completedAt',
                width: 100,
                sorter: true,
                render: (item) => (<span>{item ? moment(item).format('YYYY-MM-DD HH:mm') : ''}</span>)
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                width: 150,
                sorter: true,
                render: item => (
                    <span>
                   {item === 'completed' ?
                       <span style={{color: '#00CE7D'}}>Completed</span> :
                       item === 'active' ?
                           <span style={{color: '#fff'}}>Active</span> :
                           item === 'cancelled' ?
                               <span style={{color: '#ae0515'}}>Cancelled</span> : ''}
                               </span>
                )
            }
        ];

        const config = {
            pagination: {
                total,
                current,
                pageSize
            }
        };

        return (
            <div className="history-list">
                <Tabs
                    defaultActiveKey="buy"
                    type="card"
                    onChange={onChangeTab}
                >
                    <TabPane tab="Buy trade history" key="buy">
                        <Table
                            {...config}
                            columns={columns}
                            dataSource={list}
                            rowKey={record => record.id}
                            onChange={onChange}
                            className='admin-table'
                        />

                    </TabPane>

                    <TabPane tab="Sell trade history" key="sell">
                        <Table
                            {...config}
                            columns={columns}
                            dataSource={list}
                            rowKey={record => record.id}
                            onChange={onChange}
                            className='admin-table'
                        />
                    </TabPane>
                </Tabs>

            </div>
        )
    }
;

export default HistoryList;