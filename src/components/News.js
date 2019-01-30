import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import { Pagination } from 'antd';

import {NEWS} from '../constants/APIURLS';

import '../styles/news.css';

class News extends Component {
    state = {
        news: [],
        latestNews: {},
        pagination: {
            total: 0,
            skip: 0,
            take: 3
        }
    };

    getAllNews = async () => {
        const {pagination: {skip, take}} = this.state;

        const res = await axios.get(`${NEWS}?skip=${skip}&take=${take}`);

        this.setState({
            news: res.data.news,
            pagination: {
                skip,
                take,
                total: res.data.count
            }
        })
    };

    handleSelectedNews = (news) => {
        this.setState({
            latestNews: news
        })
    };

    handleChangePagination = (page) => {
        this.setState({
            pagination: {
                ...this.state.pagination,
                skip: 3*page-3
            }
        }, () => this.getAllNews())
    };

    async componentDidMount() {
       await this.getAllNews();

        this.handleSelectedNews(this.state.news[0])
    }

    render() {
        const {news, latestNews, pagination} = this.state;

        return (
            <div className="client-news-page" id="noticesBoard">
                <div className="latest-news">
                    <div className="block-title">
                        Latest news
                    </div>

                    <div className='news'>
                        <div className="news-title">
                            {latestNews.title}
                        </div>

                        <div className="description" dangerouslySetInnerHTML={{__html: latestNews.description}}>
                        </div>

                        <div className='date'>
                            {moment(latestNews.createdAt).format('YYYY/MM/DD')}
                        </div>
                    </div>
                </div>

                <div className="news-list">
                    <div className="block-title">
                        All news
                    </div>

                    {news.map(item => (
                        <div className='news-list-item' key={item.id} onClick={() => this.handleSelectedNews(item)}>
                            <div className='title'>{item.title}</div>

                            <div className='description' dangerouslySetInnerHTML={{__html: item.description}}>
                            </div>

                            <div className="date">
                                {moment(item.createdAt).format('YYYY/MM/DD')}
                            </div>
                        </div>
                    ))}

                    <Pagination
                        defaultCurrent={1}
                        total={+pagination.total}
                        defaultPageSize={3}
                        onChange={this.handleChangePagination}
                    />
                </div>

            </div>

        )
    }

}

export default News;