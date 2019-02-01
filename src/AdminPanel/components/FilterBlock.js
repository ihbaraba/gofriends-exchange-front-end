import React, {Component, Fragment} from 'react';
import {DatePicker, Select} from 'antd';
import moment from 'moment';
import T from 'prop-types';

const {RangePicker} = DatePicker;
const Option = Select.Option;


class FilterBlock extends Component {
    state = {
        id: '',
        email: '',
        dateFrom: '',
        dateTo: '',
        status: '',
        pair: ''
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

    byUserId = () => (
        <div className='filter-item search-block'>
            <div className='search-input'>
                <i className="fa fa-search" aria-hidden="true"></i>
                <input
                    type="number"
                    placeholder='Search'
                    value={this.state.id}
                    onChange={e => this.setState({id: e.target.value})}
                />
            </div>
            <label>*by user id</label>
        </div>
    );

    byEmail = () => (
        <div className='filter-item search-block'>
            <div className='search-input'>
                <i className="fa fa-search" aria-hidden="true"></i>
                <input
                    type="text"
                    placeholder='Search'
                    value={this.state.email}
                    onChange={e => this.setState({email: e.target.value})}
                />
            </div>
            <label>*by email</label>
        </div>
    );

    byDate = () => (
        <div className='filter-item'>
            <RangePicker onChange={this.handleDatePickerChange}/>
            <label>*by date</label>
        </div>
    );

    byCurrency = () => (
        <div className='filter-item'>
            <Select dropdownClassName='admin-select' placeholder='All' style={{width: 180}} onChange={e => this.setState({pair: e})}>
                <Option value=''>All</Option>
                {this.props.currencies.map(coin => (
                    <Option value={coin.id} key={coin.id}>{coin.code}</Option>
                ))}
            </Select>
            <label>*by currency</label>
        </div>
    );

    byStatus = (params) => (
        <div className='filter-item'>
            <Select dropdownClassName='admin-select' placeholder='All' style={{width: 180}} onChange={e => this.setState({status: e})}>
                <Option value=''>All</Option>
                {params.map(item => (
                    <Option value={item} key={item}>{item}</Option>
                ))}
            </Select>
            <label>*by status</label>
        </div>
    );

    byType = () => (
        <div className='filter-item'>
            <Select dropdownClassName='admin-select' placeholder='All' style={{width: 180}} onChange={e => this.setState({status: e})}>
                <Option value=''>All</Option>
                <Option value="buy">Buy</Option>
                <Option value="sell">Sell</Option>
            </Select>
            <label>*Type</label>
        </div>
    );

    byPair = () => (
        <div className='filter-item'>
            <Select dropdownClassName='admin-select' placeholder='All' style={{width: 180}} onChange={e => this.setState({pair: e})}>
                <Option value=''>All</Option>
                {this.props.pairs.map(item => {
                    return (
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                    )
                })}
            </Select>
            <label>*by pair </label>
        </div>
    );

    renderForm = () => {
        const {page} = this.props;

        switch (page) {
            case 'commissions':
                return (
                    <Fragment>
                        {this.byUserId()}

                        {this.byCurrency()}

                        {this.byDate()}

                        {this.byType()}
                    </Fragment>
                );
                break;

            case 'users':
                return (
                    <Fragment>
                        {this.byUserId()}

                        {this.byEmail()}

                        {this.byDate()}

                        {this.byStatus(['active'])}
                    </Fragment>
                );
                break;

            case 'withdraw':
                return (
                    <Fragment>
                        {this.byUserId()}

                        {this.byCurrency()}

                        {this.byDate()}

                        {this.byStatus(['opened', 'confirmed', 'completed'])}
                    </Fragment>
                );
                break;

            case 'trade':
                return (
                    <Fragment>
                        {this.byUserId()}

                        {this.byPair()}

                        {this.byDate()}

                        {this.byStatus(['active', 'completed', 'canceled'])}
                    </Fragment>
                );
                break;

            default:
                break;
        }
    };

    render() {
        const {onSearch} = this.props;

        return (
            <div className='filter-block'>
                {this.renderForm()}

                <button className='admin-btn search-btn green-btn' onClick={() => onSearch(this.state)}>Search</button>
            </div>
        )
    }
}

FilterBlock.protoTypes = {
    page: T.string
};

export default FilterBlock;