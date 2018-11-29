import React, {Component} from 'react';
import {Table, Button} from 'antd';
import '../App.css';

class Withdrawalpanel extends Component {
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
        {
            title: 'Wallet ',
            dataIndex: 'wallet',
            key: 'wallet',
            width: 150,
            render: (text, record) => (
                <Button
                    type="primary"
                    ghost
                    onClick={(order) => {
                       console.log(order)
                    }}
                    style={{margin: '0 0 0 auto'}}
                >
                    Open wallet
                </Button>

            )
        }
    ];

    render() {
        return (
            <div>
                <div style={{clear: "both"}}>
                    <h1 className="sign">WITHDRAWAL PANEL</h1>
                </div>

                <div className="orderBookWrap">
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

export default Withdrawalpanel;