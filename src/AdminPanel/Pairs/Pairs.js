import React, {Component} from 'react';
import axios from 'axios';

import PairsList from './PairsList'
import CreatePair from './CreatePair'
import {PAIRS, CURRENCIES} from "../../constants/APIURLS";

class Pairs extends Component {
    state = {
        pairsList: [],
        coinsList: [],
        basicCoin: '',
        childCoin: ''
    };

    handleChangeSelect = (id, coinType) => {
        this.setState({
            [coinType]: id
        })
    };

    getPairs = async () => {
        const res = await axios.get(PAIRS);

        this.setState({
            pairsList: res.data,
            basicCoin: '',
            childCoin: ''
        })
    };

    createPair = async () => {
        await axios.post(PAIRS, {
            baseCurrencyId: this.state.basicCoin,
            quoteCurrencyId: this.state.childCoin
        });

        this.getPairs();
    };

    removePair = async (id) => {
        await axios.delete(`${PAIRS}/${id}`);

        this.getPairs();
    };

    async componentDidMount() {
        const [pairs, coins] = await Promise.all([axios.get(PAIRS), axios.get(CURRENCIES)]);

        this.setState({
            pairsList: pairs.data,
            coinsList: coins.data
        })
    }

    render() {
        const {pairsList, coinsList, basicCoin, childCoin} = this.state;

        return (
            <div className='pairs-page'>
                <CreatePair
                    coins={coinsList}
                    basicCoin={basicCoin}
                    childCoin={childCoin}
                    onSelect={this.handleChangeSelect}
                    onCreatePair={this.createPair}
                />

                <PairsList
                    list={pairsList}
                    onRemove={this.removePair}
                />
            </div>
        )
    }
}

export default Pairs;