import React, {Component} from 'react';

import NewsList from './NewsList';
import NavLink from "../../components/NavLink";

class News extends Component {
    componentDidMount() {

    }

    render() {

        return(
            <div className='news-page'>
               <div className='create-news-block'>
                   <button className='admin-btn'>
                       <NavLink to='/admin/create_new'>
                           Add new
                       </NavLink>
                   </button>
               </div>

                <NewsList />
            </div>
        )
    }
}

export default News;