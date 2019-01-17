import React from 'react';

const PairFee = ({pair, params = [], changeInput, onSubmit}) => {
    return (
        <div className='pair-fee-block'>
            <div className='title-block'>
                {pair.name}
            </div>

            <div className='table-title'>
                <span>Amount steps</span>
                <span>Percent from volume</span>
            </div>

            <div>
                {params.map((pair, index) => (
                    <div className='fee-params' key={pair.id}>
                        <div className='form-item'>
                            <label>From</label>
                            <input
                                type="number"
                                name='fromSteps'
                                value={pair.fromSteps}
                                onChange={(e) => changeInput(index, e)}
                            />
                        </div>
                        <hr/>
                        <div className='form-item'>
                            <label>To</label>
                            <input
                                type="number"
                                name='toSteps'
                                value={pair.toSteps}
                                onChange={(e) => changeInput(index, e)}
                            />
                        </div>
                        <div className='right-arrow'></div>
                        <div className='form-item'>
                            <label>Fee</label>
                            <input
                                type="number"
                                name='fee'
                                value={pair.fee}
                                onChange={(e) => changeInput(index, e)}
                            />
                            <span className='rate'>%</span>
                        </div>
                    </div>
                ))}

                <button className='admin-btn green-btn' onClick={onSubmit}>
                    Save
                </button>
            </div>
        </div>
    )
};

export default PairFee;