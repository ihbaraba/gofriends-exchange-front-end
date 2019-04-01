import React, {Component} from 'react';
import axios from "axios/index";
import {Icon} from 'antd';
import {toast} from 'react-toastify';

import {COMMISSIONS, PAIRS} from "../../../constants/APIURLS";
import PairsList from "./PairsList";
import PairFee from "./PairFee";

class CommissionsSettings extends Component {
    state = {
        coinPairs: [],
        pair: {},
        pairParams: [
            {
                type: '',
                fromSteps: 0,
                toSteps: 0,
                fee: 0
            }
        ]
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
        const feeParams = await axios.get(`${COMMISSIONS}`);

        this.setState({
            pairParams: feeParams.data.length > 0 ? feeParams.data : [{
                type: '',
                fromSteps: 0,
                toSteps: 0,
                fee: 0
            }]
        })

    };

    handleSelectingPair = (pair) => {
        this.getPairFee(pair.id);
        this.setState({
            pair
        })
    };

    handleChangeInput = (index, e) => {
        const input = e.target;

        let newParams = this.state.pairParams;

        newParams[index] = {
            ...newParams[index],
            [input.name]: +input.value
        };

        this.setState({
            pairParams: newParams
        })
    };

    handleChangeSelect = (index, value) => {
        let newParams = this.state.pairParams;

        newParams[index] = {
            ...newParams[index],
            type: value
        };

        this.setState({
            pairParams: newParams
        })
    };

    handleSaveCommissions = async () => {
        try {
            await axios.put(`${COMMISSIONS}`, {
                pairId: this.state.pair.id,
                steps: this.state.pairParams
            });

            toast.success(<div className='toaster-container'><Icon type="check-circle" /> Confirmed</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

        } catch (e) {
            toast.error(<div className='toaster-container'><Icon type="close" /> {e.response.data.userMessage}</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    };

    handleAddNewStep = () => {
        this.setState({
            pairParams: [
                ...this.state.pairParams,
                {
                    type: '',
                    fromSteps: 0,
                    toSteps: 0,
                    fee: 0
                }
            ]
        })
    };

    handleRemoveStep = async (index, id) => {
        if (id) {
            await axios.delete(`${COMMISSIONS}/${id}`)
        }

        let newArr = this.state.pairParams;
        newArr.splice(index, 1);
        this.setState({
            pairParams: newArr
        })
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
                    changeSelect={this.handleChangeSelect}
                    onSubmit={this.handleSaveCommissions}
                    onAddNewStep={this.handleAddNewStep}
                    onRemoveStep={this.handleRemoveStep}
                />
            </div>
        )
    }
}

export default CommissionsSettings;