import React from 'react';

const PairsList = ({list}) => {
    console.log(list)
    return (
        <div className='pairs-list'>
            <div className="block-title">
                Current pairs
            </div>

            <div className='list-block'>
                {list.map(pair => (
                    <div className='pair'>
                        {`${pair.baseCurrency.code}/${pair.quoteCurrency.code}`}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default PairsList;