import React, {Fragment} from 'react';
import {connect} from 'react-redux'
import {getOrdersHistory, sendOrder} from "../utils";
import {USERORDERSHISTORY, ORDERS} from "./../constants/APIURLS.js"
import {Table, Icon, Tooltip, Button} from 'antd';
import moment from "moment/moment";
import {toast} from "react-toastify";

// import {ORDERS} from "../constants/APIURLS";

class UserOrder extends React.Component {
    constructor() {
        super();

        this.getInitialPairDataFromServer = this.getInitialPairDataFromServer.bind(this);
        this.calculateSum = this.calculateSum.bind(this);
        this.firePostToServer = this.firePostToServer.bind(this);

        this.orders = [];
        this.state = {
            orders: [],
            ordersHistory: [],
        };
    }

    calculateSum(bids = []) {
        const filteredOutCencelled = bids.filter(item => item.status !== "cancelled");
        return filteredOutCencelled.map(bid => {
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
                genuine: bid,
            })
        });
    }

    async getInitialPairDataFromServer({completed = false}) {

        const orders = completed ? "ordersHistory" : "orders";

        // await this.setState({ [orders]: [] });
        // console.log("UserOrderHistory completed =", completed);

        const loadedOrders = await getOrdersHistory({
            rout: USERORDERSHISTORY,
            parameters: {completed, withStop: "true", take: 50, sort: "createdAt:desc"},
            token: this.props.user.token,
        });

        const calculated = this.calculateSum(loadedOrders.body);
        this.orders = calculated;
        this.setState({
                ...this.state,
                [orders]: calculated
            }
        );
    }

    async firePostToServer(bidProps) {
        /**
         *activating cancel button
         **/
        const {token, orderId, status} = bidProps;
        const responce = await sendOrder({
            rout: `${ORDERS}/${orderId}`,
            token,
            status,
        })
            .then(() => {
                toast.success(<div className='toaster-container'><Icon type="check-circle"/> Confirmed</div>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                this.getInitialPairDataFromServer({completed: false, cancelled: false});
            })
            .catch(e => {
                toast.error(<div className='toaster-container'><Icon type="close"/> {e.response.data.userMessage}
                </div>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            });
    };

    async componentDidMount() {
        const {completed} = this.props;
        await this.getInitialPairDataFromServer({completed});
    }

    async componentWillReceiveProps(nextProps) {
        // console.log();
        const {completed} = nextProps;
        await this.getInitialPairDataFromServer({completed});
    }

    render() {
        const {token, completed, mobile, newDateFormat, exchange} = this.props;
        // const {orders = [], ordersHistory = []} = this.state;

        const onBidButtonClick = ({status, order}) => {
            this.firePostToServer({
                token: this.props.token,
                orderId: +order.id,
                status,
            });
        };


        if (token === "") {
            return <div> Need authorization...</div>
        }

        // const {username, id} = user;

        const columns = function (pcompleted) {
            const completed = JSON.parse(pcompleted);

            return [
                {
                    title: 'Date',
                    dataIndex: completed ? 'completedAt' : 'createdAt',
                    key: 'date',
                    width: 150,
                    render: (item) => {
                        if (newDateFormat) {
                            return (
                                <span>
                                {moment(item, 'DD.MM.YYYY HH:mm:ss').format('DD.MM')}
                                    <br/>
                                    {moment(item, 'DD.MM.YYYY HH:mm:ss').format('HH:mm')}
                            </span>
                            )
                        } else if (exchange) {
                            return (
                                <span>
                                {moment(item, 'DD.MM.YYYY HH:mm:ss').format('DD.MM')}
                            </span>
                            )
                        } else {
                            return (
                                <span>{item}</span>
                            )
                        }
                    }
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    width: 150,
                },
                {
                    title: `Price`,
                    dataIndex: 'price',
                    key: 'price',
                    width: 150,
                },
                ...(exchange ? [] : [{
                    title: `Amount`,
                    dataIndex: 'amount',
                    key: 'amount',
                    width: 150,
                }]),
                ...(exchange ? [] : [{
                    title: `Sum`,
                    dataIndex: 'Sum',
                    key: 'Sum',
                    width: 150,
                }]),
                ...(!completed ? [{
                        title: `Info`,
                        dataIndex: 'info',
                        key: 'info',
                        width: 80,
                        render: (text, record) => {
                            const stopLimit = record.limit || record.stop;
                            // console.log(stopLimit, record);
                            return (stopLimit
                                    ? <span>
                                            <Tooltip placement="bottomRight" title={
                                                record.genuine.type === "sell"
                                                    ? `If the highest bid drops to or below ${record.genuine.stop}, an order to buy ${record.genuine.amount} at a price of ${record.genuine.price} will be placed`
                                                    : `If the lowest ask rises to or above ${record.genuine.stop}, an order to buy ${record.genuine.amount} at a price of ${record.genuine.price} will be placed`
                                            }>
                                              <a href="" className="act-btn">
                                                  <Icon type="info-circle" theme="outlined"/>
                                              </a>
                                            </Tooltip>
                                        </span>
                                    : null
                            )
                        },
                    }]
                    : []),
                ...(!completed ? [{
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        width: 150,
                        render: (text, record) => (
                            <Button
                                type="primary"
                                ghost
                                onClick={(order) => {
                                    onBidButtonClick({status: "cancelled", order: record})
                                }}
                                style={{margin: '0 auto'}}
                                className='act-btn'
                            >
                                Cancel
                            </Button>
                        ),
                    }]
                    : []),
            ]
        };
        const dataSource = this.orders;
        // console.log("completed =", completed, "dataSource=", completed ? this.state.ordersHistory : this.state.orders, this.state);
        // console.log("dataSource =", dataSource, );
        return (
            <Fragment>
                {mobile ?
                    <div className='mobile-version'>

                        {dataSource.map(item => (
                            <div key={item.id} className='order-card'>
                                <div className='header-card'>
                                    <span>{item.createdAt}</span>
                                    <span>{item.type}</span>
                                </div>
                                <div className='body-card'>
                                    <div className="order-information">
                                        <div className="information-item">
                                            <span className='label'>Price:</span>
                                            <span className='value'>{item.price}</span>
                                        </div>
                                        <div className="information-item">
                                            <span className='label'>Amount:</span>
                                            <span className='value'>{item.amount}</span>
                                        </div>
                                        <div className="information-item">
                                            <span className='label'>Sum:</span>
                                            <span className='value'>{item.Sum}</span>
                                        </div>
                                    </div>

                                    <div className="order-action">
                                        {item.limit || item.stop ?
                                            <div className='info-btn'>
                                                Info
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            </div> : ''
                                        }

                                        <div
                                            className='cancel-btn'
                                            onClick={() => {
                                                onBidButtonClick({status: "cancelled", order: item})
                                            }}

                                        >
                                            Cancel
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <Table
                        columns={columns(completed)}
                        dataSource={dataSource}
                        bordered={false}
                        pagination={false}
                        rowKey={record => record.id}
                        scroll={{y: 630}}
                        size="small"
                        rowClassName="custom__tr"/>}
            </Fragment>
        )
    }
}

UserOrder.propTypes = {
    // dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        user: state.user,
        token: state.user.token
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrder)


