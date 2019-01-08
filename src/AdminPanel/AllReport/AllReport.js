import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

import GenerateBlock from './GenerateBlock';
import ReportList from './ReportList';

import {GET_REPORT_BY_DATE} from '../../constants/APIURLS';

class AllReport extends Component {
    state = {
        reportList: [],
        //    filter

        filter: {
            dateFrom: '',
            dateTo: '',
            type: '',
            sortName: '',
            sortType: ''
        },
        pagination: {
            total: 0,
            current: 1,
            pageSize: 10,
        }
    };


    handleGenerateList = async () => {
        const {filter: {type, dateFrom, dateTo, sortName, sortType}, pagination: {current, pageSize}} = this.state;

        const urlParams = [
            `&dateFrom=${dateFrom ? dateFrom : moment(new Date()).format('YYYY-MM-DD')}`,
            `&dateTo=${dateTo ? dateTo : moment(new Date()).format('YYYY-MM-DD')}`,
            type ? `&type=${type}` : null,
            sortName ? `&sort=${sortName}:${sortType}` : null,
        ];

        const customUrl = `${GET_REPORT_BY_DATE}?skip=${current * 10 - 10}&take=${pageSize}${urlParams.join('')}`;
        const res = await axios.get(customUrl);

        this.setState({
            reportList: res.data.transactions,
            pagination: {
                ...this.state.pagination,
                total: +res.data.count
            }
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
                this.handleGenerateList()
            })
    };


    handleChangeDateInput = dateArr => {
        this.setState({
            filter: {
                ...this.state.filter,
                ...dateArr
            }
        })
    };

    componentDidMount() {
        this.handleGenerateList();
    }

    render() {
        const {filter, pagination} = this.state;
        return (
            <div className='all-report-page'>
                <GenerateBlock
                    generate={this.handleGenerateList}
                    onChangeDate={this.handleChangeDateInput}
                    onChangeType={type => this.setState({filter: {...filter, type}})}
                />

                <ReportList
                    list={this.state.reportList}
                    onChange={this.handlePaginationChange}
                    pagination={pagination}
                />
            </div>
        )
    }
}

export default AllReport;