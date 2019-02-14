import React, {Component} from 'react';
import axios from 'axios';

import FilterBlock from "../components/FilterBlock";
import CommissionsProfitList from './CommissionsProfitList'
import NavLink from '../../components/NavLink';
import {changeSubPage} from "../../actions/AdminActions";
import {connect} from "react-redux";
import {COMMISSIONS_PROFIT, CURRENCIES} from '../../constants/APIURLS';


class Commissions extends Component {
    state = {
        orders: [],
        currencies: [],
        filter: {
            id: '',
            email: '',
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

    goSettingsPage = () => {
        this.props.changeSubPage({title: 'Changes'})
    };

    getTransactionsProfit = async () => {
        const {filter: {id, email, dateFrom, dateTo, status, sortName, sortType}, pagination: {current, pageSize}} = this.state;
        const urlParams = [
            id ? `&id=${id}` : null,
            email ? `&email=${email}` : null,
            dateFrom ? `&dateFrom=${dateFrom}` : null,
            dateTo ? `&dateTo=${dateTo}` : null,
            status ? `&status=${status}` : null,
            sortName ? `&sort=${sortName}:${sortType}` : null,
        ];

        const url = `${COMMISSIONS_PROFIT}?skip=${current * 10 - 10}&take=${pageSize}${urlParams.join('')}`;
        const res = await axios.get(url);

        this.setState({
            orders: res.data.fee,
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
                this.getTransactionsProfit()
            })
    };


    handleSearch = (params) => {
        console.log(params);
    };

    async componentDidMount() {
        this.getTransactionsProfit();

        const res = await axios.get(CURRENCIES);

        this.setState({
            currencies: res.data
        })
    }

    render() {
        const {orders, pagination, currencies} = this.state;

        return (
            <div className='commissions-page'>
                <div className='admin-btn green-btn go-settings-btn' onClick={this.goSettingsPage}>
                    <NavLink to='/admin/commissions/settings'>
                        <i className="fa fa-sliders" aria-hidden="true"></i>
                        Change
                    </NavLink>
                </div>

                <FilterBlock
                    page='commissions'
                    currencies={currencies}
                    onSearch={this.handleSearch}
                />

                <CommissionsProfitList
                    list={orders}
                    {...pagination}
                    onChange={this.handlePaginationChange}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    changeSubPage: (page) => dispatch(changeSubPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Commissions);