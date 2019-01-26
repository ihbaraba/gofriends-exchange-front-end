import React, {Component} from 'react';
import axios from 'axios';

import {WITHDRAW, APPROVE, CURRENCIES} from '../../constants/APIURLS';

import FilterBlock from '../components/FilterBlock';
import ResultList from './ResultList';

class WithdrawList extends Component {
    state = {
        withdrawList: [],
        currencies: [],
        filter: {
            id: '',
            currency: '',
            dateFrom: '',
            dateTo: '',
            status: '',
            sortName: '',
            sortType: ''
        },

        pagination: {
            total: 0,
            current: 1,
            pageSize: 10,
        }
    };

    getWithdraw = async () => {
        const {filter: {id, currency, dateFrom, dateTo, status, sortName, sortType}, pagination: {current, pageSize}} = this.state;
        const urlParams = [
            id ? `&userId=${id}` : null,
            currency ? `&currency=${currency}` : null,
            dateFrom ? `&dateFrom=${dateFrom}` : null,
            dateTo ? `&dateTo=${dateTo}` : null,
            status ? `&status=${status}` : null,
            sortName ? `&sort=${sortName}:${sortType}` : null,
        ];

        const res = await axios.get(`${WITHDRAW}?skip=${current * 10 - 10}&take=${pageSize}${urlParams.join('')}`);

        this.setState({
            withdrawList: res.data.withdraw,
            pagination: {
                current,
                pageSize,
                total: res.data.count
            }
        })
    };

    handleSearch = params => {
        this.setState({
                filter: {
                    ...this.state.filter,
                    ...params
                }
            },
            () => {
                this.getWithdraw()
            });
    };

    handlePaginationChange = (pagination, filters, sorter) => {
        const sortType = sorter.order === 'descend' ? 'desc' : sorter.order === 'ascend' ? 'asc' : '';
        this.setState({
                pagination,
                filter: {
                    ...this.state.filter,
                    sortName: sorter.columnKey,
                    sortType
                }
            },
            () => {
                this.getWithdraw()
            })
    };

    handleApprove = async (id) => {
        await axios.put(`${APPROVE}/${id}`)

    };

    async componentDidMount() {
        this.getWithdraw();
        const res = await axios.get(CURRENCIES);

        this.setState({
            currencies: res.data
        })
    };


    render() {
        const {withdrawList, pagination, currencies} = this.state;

        return (
            <div className='withdraw-list-page'>
                <FilterBlock
                    onSearch={this.handleSearch}
                    currencies={currencies}
                    page='withdraw'
                />

                <ResultList
                    list={withdrawList}
                    {...pagination}
                    onChange={this.handlePaginationChange}
                    onApprove={this.handleApprove}
                />
            </div>
        )
    }
}

export default WithdrawList;