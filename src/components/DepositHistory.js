import React, {Component} from 'react';
import {Table} from 'antd';
import '../App.css';

class DepositHistory extends Component {
    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 150,
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            width: 150,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 150,
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: 150,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 150,
        },
    ];

    render() {
        return (
            <div className='card-container'>
                <div className="card-container-head">
                    <h3>Deposit history</h3>
                </div>

                <div className="table">
                    <Table
                        columns={this.columns}
                        bordered={false}
                        pagination={false}
                        rowKey="uid"
                        scroll={{y: 330}}
                        size="small"
                        rowClassName="custom__tr"/>
                </div>
            </div>
        )
    }
}

export default DepositHistory;