import React from 'react';
import {Table, Tabs} from 'antd';

const TabPane = Tabs.TabPane;


const HistoryList = () => {
    const columns = [
        {
            title: 'User ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Order ID',
            dataIndex: 'order',
            key: 'order',
            width: 100,
        },
        {
            title: 'Pair',
            dataIndex: 'pair',
            key: 'pair',
            width: 100,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 100,
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: 100,
        },
        {
            title: 'Fee',
            dataIndex: 'fee',
            key: 'fee',
            width: 100,
        },
        {
            title: 'Created At',
            dataIndex: 'create_date',
            key: 'create_date',
            width: 100,
        },
        {
            title: 'Completed at',
            dataIndex: 'completed_date',
            key: 'completed_date',
            width: 100,
        },
        {
            title: 'completed_date',
            dataIndex: 'status',
            key: 'status',
            width: 150,
        },
    ];


    return(
       <div className="history-list">
           <Tabs
               defaultActiveKey="1"
               type="card"
           >
               <TabPane tab="Buy trade history" key="1">
                   <Table
                       columns={columns}
                       // dataSource={list}
                       rowKey={record => record.id}
                       // onChange={onChange}
                       className='admin-table'
                   />
               </TabPane>

               <TabPane tab="Sell trade history" key="2">
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