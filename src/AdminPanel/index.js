import React, {Component} from 'react';
import {connect} from "react-redux";

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
    }

    render() {
        const {children, user, admin} = this.props;

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
        )
    }
}


const mapStateToProps = state => ({
    user: state.user,
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    changePage: (page) => dispatch(changePage(page)),
    lastPage: (page) => dispatch(lastPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);

