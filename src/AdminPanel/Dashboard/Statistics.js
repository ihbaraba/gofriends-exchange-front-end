import React from 'react';

import user from '../../img/admin-panel/us.svg';

const Statistics = () => {
    return (
        <div className='statistics-block'>
            {[1, 1, 1, 1, 1].map(() => (
                <div className='statistics-information'>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={user} alt=""/>
                        <span className='title'>Online users </span>
                    </div>

                    <div className="value">
                        5628
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Statistics;