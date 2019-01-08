import React, {Component} from 'react';
import PairsList from "./PairsList";

class CommissionsSettings extends Component {
    state = {
        pairs: ['DTC/TGB','DTC/TGB','DTC/TGB','DTC/TGB','DTC/TGB','DTC/TGB']
    }
    render() {
        const {pairs} = this.state;

        return(
            <div className="commissions-settings-page">
                <PairsList
                    list={pairs}
                />
            </div>
        )
    }
}

export default CommissionsSettings;