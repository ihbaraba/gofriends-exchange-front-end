import React, {Component} from 'react';
import {Table} from 'antd';

import '../App.css';

class LoginHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 150,
        },
        {
            title: 'IP Address',
            dataIndex: 'address',
            key: 'address',
            width: 150,
        },
        {
            title: 'Used Two-Factor Authentication',
            dataIndex: 'twoFactor',
            key: 'twoFactor',
            width: 300,
        },
        {
            title: 'Location',
            dataIndex: 'Location',
            key: 'Location',
            width: 300,
        },

    ]


    render() {
        let testData = [
            {
                date: '24 03 2018',
                address: '134.132.352.1',
                twoFactor: 'yes',
                Location: 'Kiev Ukraine'
            }, {
                date: '24 03 2018',
                address: '134.132.352.1',
                twoFactor: 'yes',
                Location: 'Kiev Ukraine'
            }, {
                date: '24 03 2018',
                address: '134.132.352.1',
                twoFactor: 'yes',
                Location: 'Kiev Ukraine'
            }, {
                date: '24 03 2018',
                address: '134.132.352.1',
                twoFactor: 'yes',
                Location: 'Kiev Ukraine'
            }, {
                date: '24 03 2018',
                address: '134.132.352.1',
                twoFactor: 'yes',
                Location: 'Kiev Ukraine'
            }, {
                date: '24 03 2018',
                address: '134.132.352.1',
                twoFactor: 'yes',
                Location: 'Kiev Ukraine'
            }, {
                date: '24 03 2018',
                address: '134.132.352.1',
                twoFactor: 'yes',
                Location: 'Kiev Ukraine'
            }, {
                date: '24 03 2018',
                address: '134.132.352.1',
                twoFactor: 'yes',
                Location: 'Kiev Ukraine'
            }, {
                date: '24 03 2018',
                address: '134.132.352.1',
                twoFactor: 'yes',
                Location: 'Kiev Ukraine'
            },
        ]
        return (
            <div className='card-container'>
                {/*<div className='card-container-head'>*/}
                    {/*<h3>My login history</h3>*/}
                {/*</div>*/}

                <div className="table">
                    <Table
                        columns={this.columns}
                        dataSource={testData}
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

export default LoginHistory;
