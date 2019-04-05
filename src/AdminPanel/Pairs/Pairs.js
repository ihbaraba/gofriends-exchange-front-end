import React, {Component} from 'react';
import axios from 'axios';

import PairsList from './PairsList'
import CreatePair from './CreatePair'
import {PAIRS, CURRENCIES, WITHDRAW} from "../../constants/APIURLS";
import {toast} from "react-toastify";
import {Icon} from "antd";

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
        try {
            await axios.post(PAIRS, {
                baseCurrencyId: this.state.basicCoin,
                quoteCurrencyId: this.state.childCoin
            });

            this.getPairs();

            toast.success(<div className='toaster-container'><Icon type="check-circle"/> Confirmed</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

        } catch (e) {
            toast.error(<div className='toaster-container'><Icon type="close"/> {e.response.data.userMessage}</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    changePair = async (id, status) => {
        try {
            await axios.put(`${PAIRS}/${id}`, {
                hide: !status
            });

            this.getPairs();

            toast.success(<div className='toaster-container'><Icon type="check-circle"/> Confirmed</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

        } catch (e) {
            toast.error(<div className='toaster-container'><Icon type="close"/> {e.response.data.userMessage}</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

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
                    onChange={this.changePair}
                />
            </div>
        )
    }
}

export default Pairs;