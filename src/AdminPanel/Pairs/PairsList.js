import React from 'react';

const PairsList = ({list, onChange}) => {
    return (
        <div className='pairs-list'>
            <div className="block-title">
                Current pairs
            </div>

            <div className='list-block'>
                {list.map(pair => (
                    <div className='pair' key={pair.id} style={{opacity: pair.hidden ? '.5' : '1'}}>
                        {`${pair.baseCurrency.code}/${pair.quoteCurrency.code}`}

                        <div className='action-btn' onClick={() => onChange(pair.id, pair.hidden)}>
                            {pair.hidden ?
                                <i className="fa fa-eye-slash" aria-hidden="true"></i>
                                :
                                <i className="fa fa-eye" aria-hidden="true"></i>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default PairsList;