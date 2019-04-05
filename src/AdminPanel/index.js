import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

import NavBar from './components/NavBar';
import Header from './components/Header';

import '../styles/adminPanel.css';
import 'antd/dist/antd.css';
import {changePage, lastPage} from "../actions/AdminActions";


class Index extends Component {

    async componentDidMount() {
        document.getElementById('root').classList.add('admin-version');
    }

    componentWillUnmount() {
        document.getElementById('root').classList.remove('admin-version')
    }

    changePage = page => {
        this.props.changePage(page)
    };

    goBackPage = () => {
        this.props.lastPage()
    };

    render() {
        const {children, user, admin} = this.props;
        const authorized = user.token ? true : false;

        if(authorized) {
        return (
            <div className='admin-panel'>
                <NavBar
                    changePage={this.changePage}
                />

                <Header
                    page={admin}
                    user={user}
                    back={this.goBackPage}
                />

                <div className='admin-content'>
                    {children}
                </div>
            </div>
        )} else {
            return(
                <Redirect to='/login'/>
            )
        }
    }
}


const mapStateToProps = state => ({
    user: state.user,
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    changePage: (page) => dispatch(changePage(page)),
    lastPage: () => dispatch(lastPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);

