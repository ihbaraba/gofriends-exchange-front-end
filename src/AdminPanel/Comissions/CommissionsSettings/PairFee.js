import React from 'react';

const PairFee = ({pair}) => {
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
                <div className='fee-params'>
                    <div className='form-item'>
                        <label>From</label>
                        <input type="number"/>
                    </div>
                    <hr/>
                    <div className='form-item'>
                        <label>To</label>
                        <input type="number"/>
                    </div>
                    <div className='right-arrow'></div>
                    <div className='form-item'>
                        <label>Fee</label>
                        <input type="number"/>
                    </div>
                </div>

                <button className='admin-btn green-btn'>Save</button>
            </div>
        </div>
    )
}

export default PairFee;