import React, {Component} from 'react';

import Statistics from './Statistics';
import LatestOperations from './LatestOperations';

class Dashboard extends Component {
    render() {
        return (
            <div className='dashboard-page'>
                <Statistics/>

                <div className='latest-operations-block'>
                    <LatestOperations
                        types='Latest trades'
                    />

                    <LatestOperations
                        types='Latest withdraws'
                    />
                </div>
            </div>
        )
    }
}

export default Dashboard;