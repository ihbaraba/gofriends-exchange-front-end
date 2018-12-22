import React, {Component} from 'react';
import axios from 'axios';

import FilterBlock from '../components/FilterBlock';
import UsersList from './UsersList';

import {GET_USERS} from '../../constants/APIURLS';


class Users extends Component {
    state = {
        users: [],
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

    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const {filter: {id, email, dateFrom, dateTo, status, sortName, sortType}, pagination: {current, pageSize}} = this.state;
        const urlParams = [
            id ? `&id=${id}` : null,
            email ? `&email=${email}` : null,
            dateFrom ? `&dateFrom=${dateFrom}` : null,
            dateTo ? `&dateTo=${dateTo}` : null,
            status ? `&status=${status}` : null,
            sortName ? `&sort=${sortName}:${sortType}` : null,
        ];

        const url = `${GET_USERS}?skip=${current * 10 - 10}&take=${pageSize}${urlParams.join('')}`;

        const {data: {users, count}} = await axios.get(url);

        this.setState({
            users,
            pagination: {
                ...this.state.pagination,
                total: +count
            }
        });
    };

    handleSearch = params => {
        this.setState({
                filter: {
                    ...this.state.filter,
                    ...params
                }
            },
            () => {
                this.getUsers()

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
                this.getUsers()

            })
    };


    render() {
        const {users, pagination} = this.state;

        return (
            <div className="user-page">
                <FilterBlock
                    onSearch={this.handleSearch}
                    page='users'
                />

                <UsersList
                    list={users}
                    {...pagination}
                    onChange={this.handlePaginationChange}
                />
            </div>
        )
    }
}


export default Users;