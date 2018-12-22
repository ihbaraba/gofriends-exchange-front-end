import React, {Component} from 'react';
import {Menu} from 'antd';

class Commissions extends Component {

    render() {
        const pairs = [
            {
                id: 1,
                name: 'BTC/LTC'
            },
            {
                id: 2,
                name: 'BTC/LTC'
            },
            {
                id: 3,
                name: 'BTC/LTC'
            },
            {
                id: 4,
                name: 'BTC/LTC'
            },
            {
                id: 5,
                name: 'BTC/LTC'
            },
            {
                id: 6,
                name: 'BTC/LTC'
            },
            {
                id: 7,
                name: 'BTC/LTC'
            },
        ];

        return (
            <div className='commissions-page response-side'>
                <div className='pairs-list'>
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                    >
                        {pairs.map(item => (
                            <Menu.Item key={item.id}>{item.name}</Menu.Item>
                        ))}
                    </Menu>
                </div>

                <div className='commissions-value'>
                    <div className='title-block'>
                        <span>Amount steps</span>
                        <span>Percent drom volume</span>
                    </div>

                    <div className='item'>
                        <div>
                            <label>From</label>
                            <input type="text"/>
                        </div>
                        <hr/>
                        <div>
                            <label>To</label>
                            <input type="text"/>
                        </div>
                        <hr className='arrow-line'/>
                        <div className='fee-input'>
                            <label>Fee</label>
                            <input type="text"/>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Commissions;