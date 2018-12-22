import React, {Component} from 'react';

import FilterBlock from '../components/FilterBlock';
import ResultList from './ResultList';

class WithdrawList extends Component {
    render() {
        return (
            <div className='withdraw-list-page'>
                <FilterBlock
                    page='withdraw'
                />

                <ResultList />
            </div>
        )
    }
}

export default WithdrawList;