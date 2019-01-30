import React from 'react';
import {Icon, Select} from 'antd';

const Option = Select.Option;

const PairFee = ({pair, params = [], changeInput, changeSelect, onSubmit, onAddNewStep, onRemoveStep}) => {
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
                    <div className='fee-params' key={index}>
                        <div className='form-item'>
                            <label>Type</label>
                            <Select onChange={(e) => changeSelect(index, e)} style={{width: '150px', margin: '0 50px 0 0'}}>
                                <Option value='exchange'>Exchange</Option>
                                <Option value='withdraw'>Withdraw</Option>
                                <Option value='deposit'>Deposit</Option>
                            </Select>
                        </div>
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

                        {params.length > 1 ?
                            <Icon
                                type="delete"
                                onClick={() => onRemoveStep(index, pair.id)}
                            /> : ''}
                    </div>
                ))}

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    {params.length < 5 ?
                        <button
                            className='admin-btn green-btn'
                            onClick={onAddNewStep}>
                            Add rule
                        </button> : ''
                    }
                    <button className='admin-btn green-btn' onClick={onSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
};

export default PairFee;