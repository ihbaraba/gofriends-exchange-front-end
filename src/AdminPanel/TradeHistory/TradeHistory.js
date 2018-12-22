import React, {Component} from 'react';
import FilterBlock from '../components/FilterBlock';
import HistoryList from "./HistoryList";

class TradeHistory extends Component {

    render() {
        return (
            <div className="trade-history">
                <FilterBlock
                    onSearch={e => console.log(e)}
                    page='trade'
                />

                <HistoryList />
            </div>
        )
    }
}

export default TradeHistory;