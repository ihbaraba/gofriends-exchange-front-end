import React, {Component} from 'react';
import axios from 'axios';

import {WITHDRAW} from '../../constants/APIURLS';

import FilterBlock from '../components/FilterBlock';
import ResultList from './ResultList';

class WithdrawList extends Component {
    state = {
        withdrawList: [],
        filter: {
            id: '',
            currency : '',
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
            id ? `&id=${id}` : null,
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



    componentDidMount = () => {
        this.getWithdraw()
    };


    render() {
        const {withdrawList, pagination} = this.state;

        return (
            <div className='withdraw-list-page'>
                <FilterBlock
                    onSearch={this.handleSearch}
                    page='withdraw'
                />

                <ResultList
                    list={withdrawList}
                    {...pagination}
                    onChange={this.handlePaginationChange}
                />
            </div>
        )
    }
}

export default WithdrawList;