import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import NavLink from './NavLink';
import {Tabs, Table} from 'antd';
import {MARKETS_START_PAGE, SOCKET_SOURCE} from '../constants/APIURLS';
import '../styles/welcome.css';

const TabPane = Tabs.TabPane;


class WelcomePage extends Component {
    state = {
        btcMarket: [],
        bchMarket: [],
        usdMarket: []
    };

    socket = io(SOCKET_SOURCE);

    getPairsInformation = async () => {
        const res = await axios.get(MARKETS_START_PAGE);

        let btcMarket = [],
            bchMarket = [],
            usdMarket = [];

        await res.data.forEach(item => {
            if (item.baseCode === 'BTC' || item.quoteCode === 'BTC') {
                btcMarket.push(item)
            } else if (item.baseCode === 'BCH' || item.quoteCode === 'BCH') {
                bchMarket.push(item)
            } else if (item.baseCode === 'BTCD' || item.quoteCode === 'ETHD' || item.quoteCode === 'USTD') {
                usdMarket.push(item)
            }
        });

        this.setState({
            btcMarket,
            bchMarket,
            usdMarket
        })
    };


    componentDidMount() {
      this.getPairsInformation();
    };

    componentWillUnmount() {
        this.socket.close();
    }


    render() {
        const {btcMarket, bchMarket, usdMarket} = this.state;

        this.socket.on("markets_daily_updated_undefined", () => {
            this.getPairsInformation()
        });

        const columns = [
            {
                title: 'Pair',
                dataIndex: 'type',
                key: 'type',
                width: 150,
                render: (item, obj) => (
                    <span>{obj.baseCode}/{obj.quoteCode}</span>
                )
            },
            {
                title: `Coin`,
                dataIndex: 'coin',
                key: 'coin',
                width: 150,
            },
            {
                title: `Last price`,
                dataIndex: 'priceBase',
                key: 'priceBase',
                width: 150,
            },
            {
                title: `24 change`,
                dataIndex: 'priceChange',
                key: 'priceChange',
                width: 150,
            },
            {
                title: '24 high',
                dataIndex: 'priceMax',
                key: 'priceMax',
                width: 150,
            },
            {
                title: '24 Low',
                dataIndex: 'priceMin',
                key: 'priceMin',
                width: 150,
            },
            {
                title: '24 Volume',
                dataIndex: 'volume',
                key: 'volume',
                width: 150,
            },
        ];

        const mobileColumns = [
            {
                title: 'Pair',
                dataIndex: 'type',
                key: 'type',
                width: 150,
            },
            {
                title: `Last price`,
                dataIndex: 'amount',
                key: 'amount',
                width: 150,
            },
            {
                title: `24 change`,
                dataIndex: 'Sum',
                key: 'Sum',
                width: 150,
            }
        ];

        return (
            <div className='welcome-page'>
                <div className='title-block'>
                    <div className='h1'>Beetok crypto exchange</div>

                    <div className='h3'>One of the most active exchanges in the world</div>

                    <NavLink to="/signup" className="go-to-login">Sign up</NavLink>
                </div>

                <div className='statistics-block'>
                    <Tabs defaultActiveKey="1" type="card">
                        <TabPane tab="BTC Markets" key="1">
                            <div className='table-stat'>
                                <Table
                                    columns={window.screen.width < '600' ? mobileColumns : columns}
                                    dataSource={btcMarket}
                                    bordered={false}
                                    pagination={false}
                                    rowKey={record => record.id}
                                    scroll={{y: 500, x: 300}}
                                    size="small"
                                    rowClassName="custom__tr"/>
                            </div>
                        </TabPane>

                        <TabPane tab="BCH Markets" key="2">
                            <div className='table-stat'>
                                <Table
                                    columns={window.screen.width < '600' ? mobileColumns : columns}
                                    dataSource={bchMarket}
                                    bordered={false}
                                    pagination={false}
                                    rowKey={record => record.id}
                                    scroll={{y: 500, x: 300}}
                                    size="small"
                                    rowClassName="custom__tr"/>

                            </div>
                        </TabPane>

                        <TabPane tab="USD Markets" key="3">
                            <div className='table-stat'>
                                <Table
                                    columns={window.screen.width < '600' ? mobileColumns : columns}
                                    dataSource={usdMarket}
                                    bordered={false}
                                    pagination={false}
                                    rowKey={record => record.id}
                                    scroll={{y: 500, x: 300}}
                                    size="small"
                                    rowClassName="custom__tr"/>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default WelcomePage;