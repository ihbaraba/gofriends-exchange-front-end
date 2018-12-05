import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Table, Tooltip} from 'antd';
import QRCode from 'qrcode-react';
import {getUserInfo} from "../utils";
import {USERINFO} from "./../constants/APIURLS.js"
import {save_user_info} from "../actions/UserActions";
import WithdrawPanel from "./WithdrawLogic";
import BTC from '../img/coins/BTC.png';
import BTG from '../img/coins/BTG_gold.png';
import BCH from '../img/coins/BTG.png';
import ETH from '../img/coins/ETH.png';
import LTC from '../img/coins/LTC.png';
import ZEC from '../img/coins/ZEC.png';
import '../styles/balances.css';
import '../App.css';

class Balances extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const {user: {token}} = this.props; //read from redux state
        const isAuthorised = (token !== "") && (token !== null); // ? true : false
        // this.setState({isAuthorised, token});
        if (isAuthorised) {
            const userInfo = await getUserInfo({rout: USERINFO, token});
            const {body} = userInfo;
            this.props.save_user_info(body);
        }
    }

    render() {
        const coinsLogo = {
            BTC, BCH, BTG, ETH, LTC, ZEC
        };
        const user = this.props.user;
        // console.log("Balances. User = ", this.props);
        const {balances = []} = user;

        const dataSource = balances.map(item => (
            {
                key: item.currency.name + "" + item.amount,
                name: item.currency.name,
                code: item.currency.code,
                amount: item.amount,
                address: item.address,
                action: ""
            }
        ));

        const columns = [
            {
                title: 'Coin',
                dataIndex: 'name',
                key: 'name',
                width: 150,
                render: (text, record) => (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img style={{width: '13px', height: '13px', margin: '1px 10px 0 0'}} src={coinsLogo[record.code]} alt=""/>
                        <h4>{record.code}</h4>
                    </div>
                )
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: 150,
            },
            {
                title: 'Total balance',
                dataIndex: 'amount',
                key: 'amount',
                width: 150,
            },

            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: 250,
                render: (text, record) => (
                    <div className='balance-action-block'>
                        <Tooltip
                            title={
                                <div>
                                    <h3>Deposit {record.name}</h3>
                                    <div className="line"></div>

                                    <div className="tooltip-block">
                                        <div className="qrImg">
                                            {record.address ?
                                                <QRCode
                                                    value={record.address}
                                                /> : ''}
                                        </div>
                                        <h4>Internal address for deposit {record.name}</h4>
                                    </div>

                                    <p>{record.address}</p>
                                </div>
                            }
                            trigger="click"
                            placement="topRight"
                        >

                            <div className="act-btn">Deposit</div>

                        </Tooltip>

                        <WithdrawPanel record={record}/>

                        <div className="act-btn">Trade</div>
                    </div>
                )
            }];
        return (
            <div className="balances-page">
                <div>
                    <h3>Balances</h3>
                </div>
                <div className='table'>
                    {/*<div className='blur-bg'></div>*/}
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        bordered={false}
                        rowKey={record => record.id}
                        size="small"
                    />
                </div>
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
