import React, {Component} from 'react';
import {Table, Button} from 'antd';
import axios from 'axios';
import moment from 'moment';

import {WITHDRAW, USERINFO} from '../constants/APIURLS';
import '../App.css';

class Withdrawalpanel extends Component {
    state = {
        withdraw: []
    };

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 150,
        },
        {
            title: 'Сurrency',
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
            dataIndex: 'amount',
            key: 'amount',
            width: 150,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: item => (
                <span>{moment(item).format('YYYY-MM-DD HH:mm')}</span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
        },
    ];

    async componentDidMount() {
        const user = await axios.get(`${USERINFO}`);
        const res = await axios.get(`${WITHDRAW}?userId=${user.data.id}`);

        this.setState({
            withdraw: res.data.withdraw
        })
    }

    render() {
        const {withdraw} = this.state;

        return (
            <div className='card-container'>
                <div className="card-container-head">
                    <h3>Withdrawal panel</h3>
                </div>

                <div className="table">
                    <Table
                        columns={this.columns}
                        bordered={false}
                        dataSource={withdraw}
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

export default Withdrawalpanel;