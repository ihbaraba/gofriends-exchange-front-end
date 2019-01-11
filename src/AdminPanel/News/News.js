import React, {Component} from 'react';
import axios from 'axios';

import NewsList from './NewsList';
import {connect} from "react-redux";
import {changeSubPage} from "../../actions/AdminActions";
import {NEWS} from "../../constants/APIURLS";

class News extends Component {
    state = {
        news: []
    };

    getAllNews = async () => {
        const res = await axios.get(NEWS);

        this.setState({
            news: res.data
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

    async componentDidMount() {
        this.getAllNews()
    }

    render() {
        const {news} = this.state;

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
                    list={news}
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