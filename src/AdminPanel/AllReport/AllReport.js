import React, {Component} from 'react';
import axios from 'axios';

import GenerateBlock from './GenerateBlock';
import ReportList from './ReportList';

import {GET_REPORT_BY_DATE} from '../../constants/APIURLS';

class AllReport extends Component {
    state = {
        reportList: [],
        //    filter
        type: '',
        dateFrom: '',
        dateTo: ''
    };

    handleGenerateList = async () => {
        console.log(this.state);

        const {dateFrom, dateTo} = this.state;

        const customUrl = `${GET_REPORT_BY_DATE}?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        const res = await axios.get(customUrl);
        console.log(res);
    }

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