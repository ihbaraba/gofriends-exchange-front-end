import React, {Component} from 'react';
import {connect} from "react-redux";

import NavBar from './components/NavBar';
import Header from './components/Header';

import '../styles/adminPanel.css';
import 'antd/dist/antd.css';


class Index extends Component {
    state = {
        currentPage: 'Dashboard'
    };



   async componentDidMount() {
        document.getElementById('root').classList.add('admin-version');
    }

    componentWillUnmount() {
        document.getElementById('root').classList.remove('admin-version')
    }

    changePage = page => {
        this.setState({
            currentPage: page
        })
    };

    render() {
        const {children, user} = this.props;
        const {currentPage} = this.state;

        return (
            <div className='admin-panel'>
                <NavBar
                    changePage={this.changePage}
                />

                <Header
                    page={currentPage}
                    user={user}
                />

                <div className='admin-content'>
                    {children}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Index);

