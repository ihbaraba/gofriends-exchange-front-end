import React, {Component} from 'react';
import axios from 'axios';

import FilterBlock from './FilterBlock';
import UsersList from './UsersList';

import {GET_USERS} from '../../constants/APIURLS';


class Users extends Component {
    state = {
        users: [],
        filter: {}
    };

    async componentDidMount() {
        const {data} = await axios.get(GET_USERS);
        this.setState({users: data});
    }

    render() {
        const {users} = this.state;
        return (
            <div className="user-page">
                <FilterBlock/>

                <UsersList
                    list={users}
                />
            </div>
        )
    }
}


export default Users;