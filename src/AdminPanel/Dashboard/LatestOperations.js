import React from 'react';
import {Table} from 'antd';

import NavLink from '../../components/NavLink';

import tradeIcon from '../../img/admin-nav-bar-icons/trade_hisr_white.svg';
import withIcon from '../../img/admin-nav-bar-icons/withdrawal_white.svg';


const LatestOperations = ({types, coinPairs, list, goTo}) => {
    const type = types === 'Latest trades' ? true : false
    const columns = type ?
        [
            {
                title: 'User ID',
                dataIndex: 'userId',
                key: 'userId',
                width: 130,
            },
            {
                title: 'Order ID',
                dataIndex: 'id',
                key: 'id',
                width: 130,
            },
            {
                title: 'Pair',
                dataIndex: 'pairId',
                key: 'pairId',
                width: 200,
                render: (item) => {
                    let currentPair = '';

                    coinPairs.forEach(pair => {
                        if (+item === +pair.id) {
                            currentPair = pair;
                        }
                    });

                    return (<span>{currentPair.name}</span>)
                }
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                width: 150,
                render: (price) => (
                    <span>{price.toFixed(4)}</span>
                )
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                width: 150,
                render: (amount) => (
                    <span>{amount.toFixed(4)}</span>
                )
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                width: 150,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                width: 150,
                render: (item) => {
                    // if(item === 'Active') {
                    return (<span style={{color: '#00CE7D'}}>Active</span>)
                    // }
                }
            }
        ]
        :
        [
            {
                title: 'User ID',
                dataIndex: 'userId',
                key: 'userId',
                width: 100,
            },
            {
                title: 'Currency',
                dataIndex: 'currency',
                key: 'currency',
                width: 200,
            },
            // {
            //     title: 'Tax ID',
            //     dataIndex: 'tax_id',
            //     key: 'tax_id',
            //     width: 150,
            // },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                width: 150,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                width: 150,
                render: (item) => {
                    // if(item === 'Active') {
                    return (<span style={{color: '#00CE7D'}}>{item}</span>)
                    // }
                }
            }
        ];


    return (
        <div className='latest-operation'>
            <div className='header-block'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={type ? tradeIcon : withIcon} alt=""/>
                    <h3>{types}</h3>
                </div>

                <button className='admin-btn' onClick={() => goTo(type)}>
                    <NavLink to={type ? '/admin/trade_history' : '/admin/withdraw_list'}>
                        {type ? 'Trade history' : 'Withdraw list'}
                    </NavLink>
                </button>
            </div>

            <Table
                columns={columns}
                dataSource={list}
                rowKey={record => record.id}
                // onChange={onChange}
                className='admin-table'
                pagination={false}
            />
        </div>
    )
}

export default LatestOperations;