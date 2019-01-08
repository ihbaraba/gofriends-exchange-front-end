import React, {Component} from 'react';

import NewsList from './NewsList';
import {connect} from "react-redux";
import {changeSubPage} from "../../actions/AdminActions";

class News extends Component {
    componentDidMount() {

    }

    onCreateNew = () => {
        this.props.changeSubPage({title: 'New'});
        this.props.history.push('/admin/create_new')
    };

    render() {

        return(
            <div className='news-page'>
               <div className='create-news-block'>
                   <button className='admin-btn green-btn' onClick={this.onCreateNew}>
                       <a>
                           Add new
                       </a>
                   </button>
               </div>

                <NewsList />
            </div>
        )
    }
}



const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    changeSubPage: (page) => dispatch(changeSubPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(News);