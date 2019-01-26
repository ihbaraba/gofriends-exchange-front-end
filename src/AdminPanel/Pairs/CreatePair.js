import React from 'react';
import {Select} from 'antd';

const Option = Select.Option;

const CreatePair = ({coins, onSelect, onCreatePair, basicCoin, childCoin}) => {
    return (
        <div className='create-pair-block'>
            <div className="block-title">
                Add pair
            </div>

            <div className='create-block'>
                <div>
                    <label>Base currency</label>
                    <Select placeholder='All' style={{width: 180}} value={basicCoin} onChange={e => onSelect(e, 'basicCoin')}>
                        <Option value=''>All</Option>
                        {coins.map(item => (
                            <Option value={item.id} key={item.id}>{item.code}</Option>
                        ))}
                    </Select>
                </div>

                <hr/>

                <div>
                    <label>Quote currency</label>
                    <Select placeholder='All' style={{width: 180}} value={childCoin} onChange={e => onSelect(e, 'childCoin')}>
                        <Option value=''>All</Option>
                        {coins.map(item => (
                            <Option value={item.id} key={item.id}>{item.code}</Option>
                        ))}
                    </Select>
                </div>

                <button className='admin-btn green-btn' onClick={onCreatePair}>Add pair</button>
            </div>
        </div>
    )
};

export default CreatePair;