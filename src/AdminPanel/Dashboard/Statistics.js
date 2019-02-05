import React from 'react';

import user from '../../img/admin-panel/us.svg';
import btc from '../../img/admin-panel/BTC_Logo.svg';
import eth from '../../img/coins/ETH.png';
import profit from '../../img/admin-panel/profit.svg';

const Statistics = ({users, wallets}) => {
    let profit = 0;
    wallets.forEach(item => {
        profit += +item.profit
    });

    return (
        <div className='statistics-block'>
            <div className='statistics-information'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={user} alt=""/>
                    <span className='title'>Count users </span>
                </div>

                <div className="value">
                    {users}
                </div>
            </div>

            <div className='statistics-information'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={user} alt=""/>
                    <span className='title'>Online users </span>
                </div>

                <div className="value">
                    2
                </div>
            </div>

            <div className='statistics-information'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={btc} alt=""/>
                    <span className='title'>Total Market Amount BTC</span>
                </div>

                <div className="value">
                    {wallets.length > 0 ? wallets[0].deposit : 0}
                </div>
            </div>

            <div className='statistics-information'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={eth} alt=""/>
                    <span className='title'>Total Market Amount BCH</span>
                </div>

                <div className="value">
                    {wallets.length > 0 ? wallets[1].deposit : 0}
                </div>
            </div>

            <div className='statistics-information'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={profit} alt=""/>
                    <span className='title'>Your profit</span>
                </div>

                <div className="value">
                    {profit}
                </div>
            </div>
        </div>
    )
}

export default Statistics;