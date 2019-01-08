import React, {Component} from 'react';
import axios from 'axios';

import PairsList from './PairsList'
import CreatePair from './CreatePair'
import {PAIRS} from "../../constants/APIURLS";

class Pairs extends Component {
    state = {
        pairsList: []
    };

    async componentDidMount() {
        const {data} = await axios.get(PAIRS);
        this.setState({
            pairsList: data
        })
    }

    render() {
        const {pairsList} = this.state;

        return (
            <div className='pairs-page'>
                <CreatePair/>

                <PairsList
                    list={pairsList}
                />
            </div>
        )
    }
}

export default Pairs;