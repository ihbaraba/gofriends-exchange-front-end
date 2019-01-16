import React, {Component} from 'react';
import axios from "axios/index";
import {Icon} from 'antd';

import {COMMISSIONS, PAIRS} from "../../../constants/APIURLS";
import PairsList from "./PairsList";
import PairFee from "./PairFee";

class CommissionsSettings extends Component {
    state = {
        coinPairs: [],
        pair: {},
        pairParams: []
    };

    async componentDidMount() {
        const {data} = await axios.get(PAIRS);

        let coinPairs = await data.map(pair => {
            return ({
                id: pair.id,
                name: `${pair.baseCurrency.code}/${pair.quoteCurrency.code}`
            })
        });

        this.getPairFee(coinPairs[0].id);


        this.setState({
            coinPairs,
            pair: coinPairs[0],
        })
    }

    getPairFee = async (id) => {
        const feeParams = await axios.get(`${COMMISSIONS}/${id}`);

        this.setState({
            pairParams: feeParams.data
        })

    }

    handleSelectingPair = (pair) => {
        this.getPairFee(pair.id);
        this.setState({
            pair
        })
    };

    handleChangeInput = (index, e) => {
        const input = e.target;

        console.log(input.name);
        let newParams = this.state.pairParams;

        newParams[index] = {
            ...newParams[index],
            [input.name]: input.value
        };

        this.setState({
            pairParams: newParams
        }, () => console.log(this.state))
    };

    handleSaveCommissions = async () => {
        try {
            await axios.put(`${COMMISSIONS}/${this.state.pair.id}`, {feeSteps: this.state.pairParams})
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {coinPairs, pair, pairParams} = this.state;

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
                    params={pairParams}
                    changeInput={this.handleChangeInput}
                    onSubmit={this.handleSaveCommissions}
                />
            </div>
        )
    }
}

export default CommissionsSettings;