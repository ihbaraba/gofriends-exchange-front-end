import React, {Component} from 'react';
import {DatePicker, Select} from 'antd';
import moment from 'moment';

const {RangePicker} = DatePicker;
const Option = Select.Option;

class FilterBlock extends Component {
    state = {
        id: '',
        email: '',
        dateFrom: '',
        dateTo: '',
        status: '',
        pairs: ''
    };

    handleDatePickerChange = arrDates => {
        console.log(arrDates);
        if (arrDates.length !== 0) {
            this.setState({
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

    render() {
        const {id, email} = this.state;
        const {onSearch, page} = this.props;

        return (
            <div className='filter-block'>
                <div className='filter-item search-block'>
                    <div className='search-input'>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <input
                            type="number"
                            placeholder='Search'
                            value={id}
                            onChange={e => this.setState({id: e.target.value})}
                        />
                    </div>
                    <label>*by user id</label>
                </div>

                {page === 'users' ?
                    <div className='filter-item search-block'>
                        <div className='search-input'>
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input
                                type="text"
                                placeholder='Search'
                                value={email}
                                onChange={e => this.setState({email: e.target.value})}
                            />
                        </div>
                        <label>*by email</label>
                    </div>
                    : ''}

                {page === 'trade' ?
                    <div className='filter-item'>
                        <Select placeholder='All' style={{width: 180}} onChange={e => this.setState({pairs: e})}>
                            <Option value=''>All</Option>
                            <Option value="dch">BCH/LTC</Option>
                            <Option value="ltc">BCH/LTC</Option>
                        </Select>
                        <label>*by pair </label>
                    </div>
                    : ''}

                {page === 'withdraw' ?
                    <div className='filter-item'>
                        <Select placeholder='All' style={{width: 180}} onChange={e => this.setState({pairs: e})}>
                            <Option value=''>All</Option>
                            <Option value="dch">BCH</Option>
                            <Option value="ltc">BCl</Option>
                        </Select>
                        <label>*by currency</label>
                    </div>
                    : ''}

                <div className='filter-item'>
                    <RangePicker onChange={this.handleDatePickerChange}/>
                    <label>*by date </label>
                </div>

                <div className='filter-item'>
                    <Select placeholder='All' style={{width: 180}} onChange={e => this.setState({status: e})}>
                        <Option value=''>All</Option>
                        <Option value="active">Active</Option>
                        <Option value="blocked">Blocked</Option>
                    </Select>
                    <label>*by status </label>
                </div>

                <button className='admin-btn search-btn green-btn' onClick={() => onSearch(this.state)}>Search</button>
            </div>
        )
    }
}

export default FilterBlock;