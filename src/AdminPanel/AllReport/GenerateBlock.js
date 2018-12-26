import React from 'react';
import {DatePicker, Select} from 'antd';
import moment from 'moment';

const {RangePicker} = DatePicker;
const Option = Select.Option;

const GenerateBlock = ({generate, onChangeDate, onChangeType}) => {
   const handleDatePickerChange = arrDates => {
        if (arrDates.length !== 0) {
            onChangeDate({
                dateFrom: moment(arrDates[0]).format('YYYY-MM-DD'),
                dateTo: moment(arrDates[1]).format('YYYY-MM-DD'),
            });
        } else {
            this.setState({
                dateFrom: '',
                dateTo: '',
            });
        }
    };

    return (
        <div className='filter-block generate-block'>
            <div className='filter-item'>
                <Select placeholder='All' style={{width: 180}} onChange={onChangeType}>
                    <Option value=''>All</Option>
                    <Option value="Deposit">Deposit</Option>
                    <Option value="ееук">Deposit</Option>
                </Select>
                <label>*transaction type</label>
            </div>

            <div className='filter-item'>
                <RangePicker onChange={handleDatePickerChange}/>
                <label>*creation date</label>
            </div>


            <button className='admin-btn search-btn green-btn' onClick={generate}>Generate</button>
        </div>
    )
}

export default GenerateBlock;