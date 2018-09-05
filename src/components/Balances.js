import React, {Component} from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';

import { Table } from 'antd';

class Balances extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const user = this.props.user;
        const {balances = []} = user;
        // console.log("Balances. User = ", user);

        const dataSource = balances.map( item => (
            { key: item.currency.name+""+item.amount,
                    name: item.currency.name,
                    code: item.currency.code,
                    amount: item.amount,
                    address: item.address,
                    action: ""}
            ));

        const columns = [{
            title: 'Coins',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        }, {
            title: 'Deposit address',
            dataIndex: 'address',
            key: 'address',
        },

            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
                          {/*<a href="javascript:;" className="act-btn">Deposit {record.code}</a>*/}
                          <a href="javascript:;" className="act-btn">Withdraw {record.code}</a>
                     </span>

                ),
            }];
        return (
            <div className="wrap">
                <Header2/>
                <div className="card-container, currencysPairs" style={{width:"70vh", margin: "auto" }}>
                    <div className="card-container-head" >
                        <h1 style={{ margin: "2rem" }}>BALANCE</h1>
                        <Table dataSource={dataSource} columns={columns} pagination={false} rowClassName="custom__tr"/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Balances;
