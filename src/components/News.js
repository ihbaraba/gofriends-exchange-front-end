import React, {Component} from 'react';
import axios from 'axios';

import {NEWS} from '../constants/APIURLS';

class News extends Component {
    state = {
        news: [],
        pagination: {
            total: 0,
            skip: 0,
            take: 10
        }
    };

    getAllNews = async () => {
        const {pagination: {skip, take}} = this.state;

        const res = await axios.get(`${NEWS}`);

        this.setState({
            news: res.data.news,
            pagination: {
                skip,
                take,
                total: res.data.count
            }
        })
    };
    
    componentDidMount() {
        this.getAllNews()
    }
    
    render() {
        return (
            <div className="data" id="noticesBoard">
                <div className="latest-news">
                    tt
                </div>

                <div className="news-list">
                    list
                </div>

            </div>

        )
    }

}

export default News;