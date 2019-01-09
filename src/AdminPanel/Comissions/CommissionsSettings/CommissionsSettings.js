import React, {Component} from 'react';
import axios from "axios/index";
import {Icon} from 'antd';

import {PAIRS} from "../../../constants/APIURLS";
import PairsList from "./PairsList";
import PairFee from "./PairFee";

class CommissionsSettings extends Component {
    state = {
        coinPairs: [],
        pair: {}
    };

    async componentDidMount() {
        const {data} = await axios.get(PAIRS);

        let coinPairs = data.map(pair => {
            return ({
                id: pair.id,
                name: `${pair.baseCurrency.code}/${pair.quoteCurrency.code}`
            })
        });
        this.setState({
            coinPairs,
            pair: coinPairs[0]
        })
    }

    handleSelectingPair = (pair) => {
        this.setState({
            pair
        })
    };

    render() {
        const {coinPairs, pair} = this.state;

        return (
            <div className="commissions-settings-page">
                <PairsList
                    list={coinPairs}
                    onChangePair={this.handleSelectingPair}
                />

                <div className='arrow-block'>
                    <Icon type="arrow-right"/>
                    <Icon type="arrow-right"/>
                    <Icon type="arrow-right"/>
                </div>

                <PairFee
                    pair={pair}
                />
            </div>
        )
    }
}

export default CommissionsSettings;