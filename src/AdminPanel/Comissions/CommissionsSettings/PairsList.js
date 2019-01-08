import React from 'react';

const PairsList = ({list}) => {
    return(
        <div className='pairs-list-block'>
            <div className='block-title'>
                Select pair
            </div>

            <div className='list'>
                {list.map(item => (
                    <div className='list-item'>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default PairsList;