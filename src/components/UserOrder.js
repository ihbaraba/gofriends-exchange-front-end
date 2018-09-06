import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getOrdersHistory} from "../utils";
import { USERORDERSHISTORY } from "./../constants/APIURLS.js"
import {Table} from 'antd';

class UserOrder extends React.Component {
    constructor() {
        super();

        this.getInitialPairDataFromServer = this.getInitialPairDataFromServer.bind(this);
        this.calculateSum = this.calculateSum.bind(this);

        this.state = {
            orders: [],
            ordersHistory: [],
        };
}

    calculateSum(bids = []) {

        return bids.map( bid => {
            const price = +bid["price"];
            const amount = +bid["initialAmount"];

            const completedAtDate = new Date(bid["completedAt"]);
            const completedAt = `${completedAtDate.toLocaleDateString()} ${completedAtDate.toLocaleTimeString()}`;
            const createdAtDate = new Date(bid["createdAt"]);
            const createdAt = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;
            return ({
                ...bid,
                completedAt,
                createdAt,
                type: `${bid["type"]} ${bid["pair"]["baseCurrency"]["code"]}`,
                price: `${+price.toFixed(5)} ${bid["pair"]["quoteCurrency"]["code"]}`,
                amount: `${+amount.toFixed(5)} ${bid["pair"]["baseCurrency"]["code"]}`,
                Sum: `${+(bid.initialAmount * bid.price).toFixed(5)} ${bid["pair"]["quoteCurrency"]["code"]}`,
                quoteCurrency: +(bid.initialAmount * bid.price).toFixed(5),
            })
        });
    }

    async getInitialPairDataFromServer({completed = false}) {

        const orders = completed ? "ordersHistory" : "orders";

        await this.setState({ [orders]: [] });
        // console.log("UserOrderHistory completed =", completed);

        const loadedOrders = await getOrdersHistory({
            rout: USERORDERSHISTORY,
            parameters: { completed, withStop: "true", take: 50, sort: "createdAt:asc"},
            token: this.props.user.token,
        });
        // console.log(orders, loadedOrders.body, loadedOrders["body"].length );
        // if
        this.setState({
                [orders]: this.calculateSum(loadedOrders.body)
            }
            // ,()=> {console.log(this.state)}
        );
    }

    async componentDidMount() {
        const { completed } = this.props;
        await this.getInitialPairDataFromServer({completed});
    }

    async componentWillReceiveProps(nextProps) {
        // console.log();
        const { completed } = nextProps;
        await this.getInitialPairDataFromServer({completed});
    }
    render() {
        const { user, token, completed } = this.props;
        const { orders, ordersHistory } = this.state;

        if ( token === "" ) {
            return <div> Need authorization...</div>
        }

        const {username, id} = user;

        const columns = function (pcompleted){
           const completed = JSON.parse(pcompleted);
           return [{
            title: 'date',
            dataIndex: completed ? 'completedAt' : 'createdAt',
            key: 'date',
            width: 150,
        },{
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 150,
        },{
            title: `Price`,
            dataIndex: 'price',
            key: 'price',
            width: 150,
        }, {
            title: `Amount`,
            dataIndex: 'amount',
            key: 'amount',
            width: 150,
        }, {
            title: `Sum`,
            dataIndex: 'Sum',
            key: 'Sum',
            width: 150,
        },
            ...(!completed ? [{
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            render: (text, record) => (
                <span>
                      <a href="javascript:;" className="act-btn">Cancel {record.code}</a>
                </span>

            ),
        }]
        : []),
        ]};

        return (
            <Table
                columns={columns(completed)}
                dataSource={completed ? ordersHistory : orders}
                bordered={false}
                pagination={false}
                scroll={{y: 330}}
                size="small"
                rowClassName="custom__tr"/>
        )
    }
}

UserOrder.propTypes = {
    // dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        user:  state.user,
        token: state.user.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrder)


