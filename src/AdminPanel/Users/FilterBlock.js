import React from 'react';
import {DatePicker, Select} from 'antd';

const {RangePicker} = DatePicker;
const Option = Select.Option;

const FilterBlock = ({search}) => (
    <div className='filter-block'>
        <div className='filter-item search-block'>
            <div className='search-input'>
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" placeholder='Search'/>
            </div>
            <label>*by user id,user name,email </label>
        </div>

        <div className='filter-item'>
            <Select placeholder='All' style={{width: 180}} onChange={e => console.log(e)}>
                <Option value=''>All</Option>
                <Option value="on">On</Option>
                <Option value="off">Off</Option>
            </Select>
            <label>*by email status </label>
        </div>

        <div className='filter-item'>
            <RangePicker onChange={(e) => console.log(e)}/>
            <label>*by creation date </label>
        </div>

        <div className='filter-item'>
            <Select placeholder='All' style={{width: 180}} onChange={e => console.log(e)}>
                <Option value=''>All</Option>
                <Option value="active">Active</Option>
                <Option value="blocked">Blocked</Option>
            </Select>
            <label>*by status </label>
        </div>

        <button className='admin-btn search-btn' onClick={search}>Search</button>
    </div>
)

export default FilterBlock;