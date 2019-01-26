import React from 'react';
import {Icon} from 'antd';

const PairsList = ({list, onRemove}) => {
    return (
        <div className='pairs-list'>
            <div className="block-title">
                Current pairs
            </div>

            <div className='list-block'>
                {list.map(pair => (
                    <div className='pair' key={pair.id}>
                        {`${pair.baseCurrency.code}/${pair.quoteCurrency.code}`}
                        <Icon type="delete" onClick={() => onRemove(pair.id)}/>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default PairsList;