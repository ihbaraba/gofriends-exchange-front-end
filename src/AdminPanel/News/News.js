import React, {Component} from 'react';
import axios from 'axios';

import NewsList from './NewsList';
import {connect} from "react-redux";
import {changeSubPage} from "../../actions/AdminActions";
import {NEWS} from "../../constants/APIURLS";

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
                total: res.data.count
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
        console.log(id);

        try {
            await axios.delete(`${NEWS}/${id}`);

            this.getAllNews();
        } catch (error) {
            console.log(error);
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
                        <a>
                            Add new
                        </a>
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


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    changeSubPage: (page) => dispatch(changeSubPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(News);