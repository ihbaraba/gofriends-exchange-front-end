import React, {Component} from 'react';
import axios from 'axios';
import {Icon} from 'antd';

import NewsList from './NewsList';
import {connect} from "react-redux";
import {changeSubPage} from "../../actions/AdminActions";
import {NEWS} from "../../constants/APIURLS";
import {toast} from "react-toastify";

class News extends Component {
    state = {
        news: [],
        pagination: {
            total: 0,
            current: 1,
            pageSize: 10,
        }
    };

    getAllNews = async () => {
        const {pagination: {current, pageSize}} = this.state;
        const res = await axios.get(`${NEWS}?skip=${current * 10 - 10}&take=${pageSize}`);

        this.setState({
            news: res.data,
            pagination: {
                ...this.state.pagination,
                total: +res.data.count
            }
        })
    };

    onCreateNew = () => {
        this.props.changeSubPage({title: 'New'});
        this.props.history.push('/admin/create_new')
    };

    handleEditNews = async (news) => {
        this.props.changeSubPage({title: news.title});
        this.props.history.push(`/admin/news/${news.id}`)
    };

    handleDeleteNews = async (id) => {
        try {
            await axios.delete(`${NEWS}/${id}`);

            toast.success(<div className='toaster-container'><Icon type="check-circle"/> Confirmed</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

            this.getAllNews();
        } catch (e) {
            toast.error(<div className='toaster-container'><Icon type="close"/> {e.response.data.userMessage}</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    handlePaginationChange = (pagination) => {
        this.setState({
                pagination,
            },
            () => {
                this.getAllNews()
            })
    };


    async componentDidMount() {
        this.getAllNews()
    }

    render() {
        const {news, pagination} = this.state;

        return (
            <div className='news-page'>
                <div className='create-news-block'>
                    <button className='admin-btn green-btn' onClick={this.onCreateNew}>
                            Add new
                    </button>
                </div>

                <NewsList
                    list={news.news}
                    {...pagination}
                    onChangePagination={this.handlePaginationChange}
                    deleteNews={this.handleDeleteNews}
                    editNews={this.handleEditNews}
                />
            </div>
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    changeSubPage: (page) => dispatch(changeSubPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(News);