import React, {Component} from 'react';
import {Table} from 'antd';
import axios from 'axios';
import moment from 'moment';

import {GET_USER_DEPOSITS} from '../constants/APIURLS';

import '../App.css';

class DepositHistory extends Component {
    state = {
        deposits: []
    };

    async componentDidMount() {
        const res = await axios.get(GET_USER_DEPOSITS);

        this.setState({
            deposits: res.data.deposit
        })
    }

    render() {
        const {deposits} = this.state;

       const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 150,
            },
            {
                title: 'Currency',
                dataIndex: 'currencyCode',
                key: 'currencyCode',
                width: 100,
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                width: 150,
            },
            // {
            //     title: 'Total',
            //     dataIndex: 'total',
            //     key: 'total',
            //     width: 150,
            // },
            {
                title: 'Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
                width: 150,
                render: date => (
                    <span>{moment(date).format('YYYY-MM-DD HH:mm')}</span>
                )
            },
        ];

        return (
            <div className='card-container'>
                <div className="card-container-head">
                    <h3>Deposit history</h3>
                </div>

                <div className="table">
                    <Table
                        columns={columns}
                        dataSource={deposits}
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