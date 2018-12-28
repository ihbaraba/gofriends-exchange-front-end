import React from 'react';
import {Select} from 'antd';

const Option = Select.Option;

const CreatePair = () => {
    return (
        <div className='create-pair-block'>
            <div className="block-title">
                Add pair
            </div>

            <div className='create-block'>
                <div>
                    <label>Base currency</label>
                    <Select placeholder='All' style={{width: 180}} onChange={e => this.setState({pairs: e})}>
                        <Option value=''>All</Option>
                        <Option value="dch">BCH</Option>
                        <Option value="ltc">BCl</Option>
                    </Select>
                </div>

                <hr/>

                <div>
                    <label>Quote currency</label>
                    <Select placeholder='All' style={{width: 180}} onChange={e => this.setState({pairs: e})}>
                        <Option value=''>All</Option>
                        <Option value="dch">BCH</Option>
                        <Option value="ltc">BCl</Option>
                    </Select>
                </div>

                <button className='admin-btn green-btn'>Add pair</button>
            </div>
        </div>
    )
};

export default CreatePair;