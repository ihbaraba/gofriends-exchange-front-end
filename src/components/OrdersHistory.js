import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {Table} from 'antd';
import {getOrdersHistory} from "./../utils"
import { ORDERSHISTORY, ORDERS} from "./../constants/APIURLS.js"
import {save_user_info} from "../actions/UserActions";


class OredersHistory extends Component {

    constructor() {
        super();

        this.getInitialPairDataFromServer = this.getInitialPairDataFromServer.bind(this);
        this.calculateSum = this.calculateSum.bind(this);

        this.state = {
            socket: "undefined",
            orders: [],
        };
    }

    calculateSum(bids) {

        const calculated = bids.map( bid => {
            const price = +bid["price"];
            const amount = +bid["initialAmount"];

            return ({
                ...bid,
                price: +price.toFixed(5),
                amount: +amount.toFixed(5),
                Sum: +(bid.initialAmount * bid.price).toFixed(5),
                quoteCurrency: +(bid.initialAmount * bid.price).toFixed(5),
        })
        });
        return calculated
    }

    async getInitialPairDataFromServer(id) {

        await this.setState({orders});

        const orders = await getOrdersHistory({
            rout: ORDERSHISTORY,
            parameters: {pairId: id, completed: "true", withStop: "true", take: 30, sort: "completedAt:asc"},
            token: this.props.user.token,
        });

        // console.log(orders.body);

        this.setState({
                orders: this.calculateSum(orders.body)
            }
        );
    }

    async componentDidMount() {
        const {currentPair: {id = 1}} = this.props;
        await this.getInitialPairDataFromServer(id);
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.currentPair.id !== this.props.currentPair.id) {
            const {currentPair: {id = 1}} = nextProps;
            await this.getInitialPairDataFromServer(id);
        }
    }

    render() {
        const {orders} = this.state;

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: 150,
        },{
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 150,
        },{
            title: `Price(${this.props.currentPair.first})`,
            dataIndex: 'price',
            key: 'price',
            width: 150,
        }, {
            title: `Amount(${this.props.currentPair.second})`,
            dataIndex: 'amount',
            key: 'amount',
            width: 150,
        }, {
            title: `Sum(${this.props.currentPair.first})`,
            dataIndex: 'Sum',
            key: 'Sum',
            width: 150,
        }];

        return (
            <div className="marketDepth">
                <div className="marketDepthTables">
                    <div className="marketDepthColumns">
                        <h5>TRADE HISTORY</h5>
                        <Table columns={columns} dataSource={orders} bordered={false} pagination={false} scroll={{y: 240}}
                               size="small" rowClassName="custom__tr"/>
                    </div>

                </div>
            </div>
        )
    }
}

OredersHistory.defaultProps = {
    currentPair: {
        id: 1,
        first: "BTC",
        second: "ETH",
    }
};

OredersHistory.propTypes = {
    currentPair: PropTypes.object.isRequired,
};

OredersHistory.propTypes = {
    // dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user:  state.user,
        // orders: state.user.orders
    }
}

const mapDispatchToProps = dispatch => ({
    save_user_info: (info) => dispatch(save_user_info(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OredersHistory)