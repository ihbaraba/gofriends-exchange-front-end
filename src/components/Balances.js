import React, {Component} from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';

import { Table, Divider, Tag } from 'antd';








class Balances extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        const dataSource = [{
            key: '1',
            name: 'BTC',
            age: 612.00000000,
            action: '10 Downing Street'
        },
            {
                key: '2',
                name: 'ETH',
                age: 612.00000000,
                action: '10 Downing Street'
            },
            {
                key: '3',
                name: 'LTC',
                age: 0.30000000,
                action: '10 Downing Street'
            },

            {
                key: '4',
                name: 'ZEC',
                age: 183.60000000,
                action: '1'
            }];

        const columns = [{
            title: 'Coins',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Price',
            dataIndex: 'age',
            key: 'age',
        },

            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
                          <a href="javascript:;" className="act-btn">Enter {record.name}</a>

                          <a href="javascript:;" className="act-btn">Withdraw</a>
                     </span>

                ),
            }];

        return (

            <div className="wrap">
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Balance panel</h1>

                </div>


               <div className="tab-wrap">

                   <Table dataSource={dataSource} columns={columns} pagination={false} />
               </div>



                <Footer/>


            </div>
        )
    }
}

export default Balances;
