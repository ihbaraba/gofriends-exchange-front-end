import React, {Component} from 'react';
import {Tabs} from 'antd';

import ShortUserInformation from './ShortUserInformation';

const TabPane = Tabs.TabPane;


class User extends Component {
    render() {
        return (
            <div className="user-page">
                <div className='top-block'>
                    <ShortUserInformation/>

                    <div className='blocked-user-block'>
                        <div className='title'>Block user</div>

                        <div className='input-side'>
                            <div>
                                <label>Reason </label>
                                <input type="text"/>
                            </div>
                            <button className='admin-btn'>Block user</button>
                        </div>
                    </div>
                </div>

                <div className='all-information'>
                    <Tabs
                        defaultActiveKey="kyc"
                        type="card"
                        // onChange={onChangeTab}
                    >
                        <TabPane tab="KYC" key="kyc">
                            йуауц
                        </TabPane>

                        <TabPane tab="Wallets" key="wallets">
                            йауцаца
                        </TabPane>

                        <TabPane tab="Buy trade history" key="buy">
                            йауцаца
                        </TabPane>

                        <TabPane tab="Sell trade history" key="sell">
                            йауцаца
                        </TabPane>

                        <TabPane tab="Withdraws list" key="withdraws">
                            йауцаца
                        </TabPane>
                    </Tabs>

                </div>
            </div>
        )
    }
}

export default User;