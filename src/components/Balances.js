import React, {Component} from 'react';
import { connect } from 'react-redux'
import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';

import { Table, Tooltip } from 'antd';
import {getUserInfo} from "../utils";
import {USERINFO} from "./../constants/APIURLS.js"
import {save_user_info, save_user_orders} from "../actions/UserActions";

import 'antd/lib/tooltip/style/css';

class Balances extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const { user: {token} } = this.props; //read from redux state
        const isAuthorised = (token !== "") && (token !== null); // ? true : false
        // this.setState({isAuthorised, token});
        if (isAuthorised) {
            const userInfo = await getUserInfo({rout: USERINFO, token});
            console.log("userInfo", userInfo.body);
            const {body} = userInfo;
            this.props.save_user_info(body);
        }
    }

    render() {
        const user = this.props.user;
        console.log("Balances. User = ", this.props);
        const {balances = []} = user;

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
                    <Tooltip title={record.code}>
    <span>
                          {/*<a href="javascript:;" className="act-btn">Deposit {record.code}</a>*/}
        <a href="javascript:;" className="act-btn">Withdraw {record.code}</a>
                     </span>
                    </Tooltip>

                ),
            }];
        return (
            <div className="wrap">
                <Header2/>
                <div className="card-container, currencysPairs" style={{width:"70vw", margin: "auto" }}>
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
function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => ({
    save_user_info: (info) => dispatch(save_user_info(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Balances)
