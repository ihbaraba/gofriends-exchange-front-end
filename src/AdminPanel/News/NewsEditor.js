import React, {Component} from 'react';
import axios from 'axios';

import CKEditor from 'ckeditor4-react';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NEWS} from "../../constants/APIURLS";

// import Link from '@ckeditor/ckeditor5-link/src/link';

class NewsEditor extends Component {
    state = {
        newsTitle: '',
        news: ''
    };

    id = this.props.match.params.id;

    async componentDidMount() {
        if (this.id) {
            const res = await axios.get(`${NEWS}/${this.id}`);

            this.setState({
                news: res.data.description,
                newsTitle: res.data.title
            })
        }
    }

    handleSaveNews = async (editorBody) => {
        try {
            if (this.id) {
                await axios.put(`${NEWS}/${this.id}`, {
                    title: this.state.newsTitle,
                    description: editorBody
                });
            } else {
                await axios.post(NEWS, {
                    title: this.state.newsTitle,
                    description: editorBody
                });
            }

            this.props.history.push('/admin/news')
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const {news, newsTitle} = this.state;
        let editorBody = '';

        return (
            <div className='news-editor-page'>
                <div className='new-title'>
                    <div className='title'>
                        <label>Title</label>
                        <input
                            type="text"
                            value={newsTitle}
                            onChange={(e) => this.setState({newsTitle: e.target.value})}
                        />
                    </div>

                    <button
                        className='admin-btn green-btn'
                        onClick={() => this.handleSaveNews(editorBody)}
                    >
                        {this.id ? 'Save' : 'Create'}
                    </button>
                </div>

                <CKEditor
                    data={news}
                    onChange={({editor}) => {
                        const data = editor.getData();
                        editorBody = data;
                    }}
                    config={{
                        toolbar: [['Heading', '|', 'Bold', 'Italic', 'Alignment', 'Link', 'BlockQuote', 'Undo', 'Redo']]
                    }}
                />
            </div>
        )
    }
}

export default NewsEditor;