import React from 'react';
import {Tabs} from 'antd';
import WithdrawFee from "./WithdrawFee";
import ExchangeFee from "./ExchangeFee";

const TabPane = Tabs.TabPane;

const CommissionsSettings = () => {

    return (
        <div className="commissions-settings-page">
            <Tabs
                defaultActiveKey="exchange"
                type="card"
            >
                <TabPane tab="Exchange" key="exchange">
                    <ExchangeFee/>
                </TabPane>

                <TabPane tab="Withdraw" key="withdraw">
                    <WithdrawFee/>
                </TabPane>
            </Tabs>
        </div>
    )
};

export default CommissionsSettings;