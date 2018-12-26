import React, {Component} from 'react';

import GenerateBlock from './GenerateBlock';
import ReportList from './ReportList';

class AllReport extends Component {
    state = {
        reportList: [],
        //    filter
        type: '',
        dateFrom: '',
        dateTo: ''
    };

    handleGenerateList = () => {
        console.log(this.state);
    };

    handleChangeDateInput = dateArr => {
        this.setState({...dateArr})
    };

    render() {
        return (
            <div className='all-report-page'>
                <GenerateBlock
                    generate={this.handleGenerateList}
                    onChangeDate={this.handleChangeDateInput}
                    onChangeType={type => this.setState({type})}
                />

                <ReportList
                    list={this.state.reportList}
                />
            </div>
        )
    }
}

export default AllReport;