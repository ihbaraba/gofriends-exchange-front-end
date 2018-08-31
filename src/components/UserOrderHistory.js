import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header2 from './Header2';
import Footer from './Footer';
import {getOrdersHistory} from "../utils";
import { USERORDERSHISTORY } from "./../constants/APIURLS.js"
import {Table} from 'antd';

class CoinsList extends React.Component {
    constructor() {
        super();

        this.getInitialPairDataFromServer = this.getInitialPairDataFromServer.bind(this);
        this.calculateSum = this.calculateSum.bind(this);

        this.state = {
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

    async getInitialPairDataFromServer() {

        await this.setState({orders: []});

        const orders = await getOrdersHistory({
            rout: USERORDERSHISTORY,
            parameters: { completed: "false", withStop: "true", take: 50, sort: "createdAt:asc"},
            token: this.props.user.token,
        });
console.log(orders.body);
        this.setState({
                orders: this.calculateSum(orders.body)
            }
        );
    }

    async componentDidMount() {
        await this.getInitialPairDataFromServer();
    }

    async componentWillReceiveProps() {
            await this.getInitialPairDataFromServer();
    }
    render() {
        const { user, token } = this.props;
        const { orders } = this.state;

        if ( token === "" ) {
            return <div> Need authorization...</div>
        }

        const {username, id} = user;
        console.log("UserOrderHistory orders =", orders);
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
        }];
        return (
            <div>
                <Header2/>

                <div className="card-container, currencysPairs" style={{width:"70vh", margin: "auto" }}>
                    <div className="card-container-head" >
                        <p className="h2">
                            Name:&emsp;<strong>{`${username}`}</strong>&emsp; &emsp; &emsp; &emsp;  E-mail:&emsp;<strong>{`${username}`}</strong>&emsp; &emsp; &emsp; &emsp;  id:{id}
                        </p>
                        <h1 style={{ margin: "2rem" }}>Your open orders</h1>
                        {/*{ orders.map( item => <h2 style={{ margin: "2rem auto" }} key={item.currency.name+""+item.amount}>*/}
                            {/*{`  ${item.currency.name}: ${(+item.amount).toFixed(5)} `}  </h2>*/}
                        {/*)}*/}

                        <Table columns={columns} dataSource={orders} bordered={false} pagination={false} scroll={{y: 240}}
                               size="small" rowClassName="custom__tr"/>

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

CoinsList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CoinsList)


