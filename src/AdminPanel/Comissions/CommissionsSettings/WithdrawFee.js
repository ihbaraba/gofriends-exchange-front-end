import React, {Component, Fragment} from 'react';
import {Icon, Menu} from 'antd';
import axios from "axios/index";
import {COMMISSIONS, CURRENCIES} from "../../../constants/APIURLS";
import {toast} from 'react-toastify';

class WithdrawFee extends Component {
    state = {
       currencies: []
    };

    async componentDidMount() {
        const {data} = await axios.get(CURRENCIES);

        this.setState({
            currencies: data
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
        const {currencies} = this.state;

        return (
            <Fragment>
                <div className='pairs-list-block'>
                    <div className='block-title'>
                        Select pair
                    </div>

                    <div className='list'>
                        <Menu
                            defaultSelectedKeys={['0']}
                            mode="inline"
                        >
                            {currencies.map((item, index) => (
                                <Menu.Item
                                    key={index}
                                    onClick={() => this.handleSelectingPair(item)}
                                >
                                    <span>{item.name}</span>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </div>
                </div>


                <div className='pair-fee-block'>
                    {/*<div className='title-block'>*/}
                        {/*{pair.name}*/}
                    {/*</div>*/}

                    <div className='table-title'>
                        <span>Amount steps</span>
                        <span>Percent from volume</span>
                    </div>

                    {/*<div>*/}
                        {/*{currencies.fee.map((pair, index) => (*/}
                            {/*<div className='fee-params' key={index}>*/}
                                {/*<div className='form-item'>*/}
                                    {/*<label>From</label>*/}
                                    {/*<input*/}
                                        {/*type="number"*/}
                                        {/*name='fromSteps'*/}
                                        {/*value={pair.fromSteps}*/}
                                        {/*onChange={(e) => this.handleChangeInput(index, e)}*/}
                                    {/*/>*/}
                                {/*</div>*/}
                                {/*<hr/>*/}
                                {/*<div className='form-item'>*/}
                                    {/*<label>To</label>*/}
                                    {/*<input*/}
                                        {/*type="number"*/}
                                        {/*name='toSteps'*/}
                                        {/*value={pair.toSteps}*/}
                                        {/*onChange={(e) => this.handleChangeInput(index, e)}*/}
                                    {/*/>*/}
                                {/*</div>*/}
                                {/*<div className='right-arrow'></div>*/}
                                {/*<div className='form-item'>*/}
                                    {/*<label>Fee</label>*/}
                                    {/*<input*/}
                                        {/*type="number"*/}
                                        {/*name='fee'*/}
                                        {/*value={pair.fee}*/}
                                        {/*onChange={(e) => this.handleChangeInput(index, e)}*/}
                                    {/*/>*/}
                                    {/*<span className='rate'>%</span>*/}
                                {/*</div>*/}

                                {/*{pairParams.length > 1 ?*/}
                                    {/*<Icon*/}
                                        {/*type="delete"*/}
                                        {/*onClick={() => this.handleRemoveStep(index, pair.id)}*/}
                                    {/*/> : ''}*/}
                            {/*</div>*/}
                        {/*))}*/}

                        {/*<div style={{display: 'flex', justifyContent: 'flex-end'}}>*/}
                            {/*{pairParams.length < 5 ?*/}
                                {/*<button*/}
                                    {/*className='admin-btn green-btn'*/}
                                    {/*onClick={this.handleAddNewStep}>*/}
                                    {/*Add rule*/}
                                {/*</button> : ''*/}
                            {/*}*/}
                            {/*<button className='admin-btn green-btn' onClick={this.handleSaveCommissions}>*/}
                                {/*Save*/}
                            {/*</button>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </Fragment>
        )
    }

};

export default WithdrawFee;