import React from 'react';

import user from '../../img/admin-panel/us.svg';
import btc from '../../img/admin-panel/BTC_Logo.svg';
import eth from '../../img/coins/ETH.png';
import pr from '../../img/admin-panel/profit.svg';

const Statistics = ({info}) => {
    return (
        <div className='statistics-block'>
            <div className='statistics-information'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={user} alt=""/>
                    <span className='title'>Count users </span>
                </div>

                <div className="value">
                    {info.users}
                </div>
            </div>

            <div className='statistics-information'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={user} alt=""/>
                    <span className='title'>Online users </span>
                </div>

                <div className="value">
                    {info.usersOnline}
                </div>
            </div>

            <div className='statistics-information'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={btc} alt=""/>
                    <span className='title'>Total Market Amount BTC</span>
                </div>

                <div className="value">
                    {info.exchangeAmountBTC}
                </div>
            </div>

            {/*<div className='statistics-information'>*/}
                {/*<div style={{display: 'flex', alignItems: 'center'}}>*/}
                    {/*<img src={eth} alt=""/>*/}
                    {/*<span className='title'>Total Market Amount BCH</span>*/}
                {/*</div>*/}

                {/*<div className="value">*/}
                    {/*{wallets.length > 0 ? wallets[1].deposit : 0}*/}
                {/*</div>*/}
            {/*</div>*/}

            <div className='statistics-information'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={pr} alt=""/>
                    <span className='title'>Your profit</span>
                </div>

                <div className="value">
                    {info.exchangeFeeAmountBTC}
                </div>
            </div>
        </div>
    )
}

export default Statistics;