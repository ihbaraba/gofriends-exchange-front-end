import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {changePair} from '../actions/ExchangeActions'

import {getCoinsList} from "./../utils"
import {Tabs} from "antd";
import 'antd/lib/tabs/style/css';


const TabPane = Tabs.TabPane;


class CoinsList extends React.Component {
    constructor() {
        super();
        this.list = this.list.bind(this);
        this.tabsCallback = this.tabsCallback.bind(this);
        // this.currenciesTabs = this.currenciesTabs.bind(this);
}
    async componentDidMount() {
        const data = await getCoinsList("http://gofriends.ru/api/v1/pairs/");
        // console.log(data);
        const pairs = data.map( item => ({id: item.id, first: item.baseCurrency.code, second: item.quoteCurrency.code}));
        // console.log(pairs);
        const coins = [... new Set( data.map( item => item.baseCurrency.code ))];
        // console.log("Coins", coins );
        this.setState({data, coins, pairs});
    }

    list = data => data.map(
      item => (<div key={`CoinsList_${item.baseCurrency.code}_${item.quoteCurrency.code}`}>{item.id} {item.baseCurrency.name} / {item.quoteCurrency.code}</div>)
    );

    tabsCallback(key) {
        // console.log(key.target.id, this.state.pairs);
        const pairs = this.state.pairs;
        const newCurrent = pairs.find( item => item.id === +key.target.id  );
        this.props.setCurentCoinsPair2State(newCurrent);
    }

    currenciesTabs = items => {
        const pairs = this.state.pairs;
        // console.log(items, pairs);

        // return ( items.any )

        return (items.map(
        (item, idx) => <TabPane tab={item} key={idx}>
             {[...pairs.filter( pair => pair.first === item )]
            .map((item, idx) => {
                // console.log(item);
                return (<div key={idx} onClick={this.tabsCallback} className="pairBar" id={item.id}>{item.first} / {item.second}</div>)})}

        </TabPane>
    ))
    };

    render() {
        // console.log(this.state);
        // const { dispatch, changePair } = this.props
        // changePair({test: 'test'});
        // dispatch({test: 'test'});

        if (this.state == null) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <div className="card-container, currencysPairs">
                    <Tabs type="card" >
                        { this.state.coins && this.currenciesTabs(this.state.coins) }
                    </Tabs>
                </div>
                {/*<div classNme="coinsList">*/}
                    {/*<p>Coins List</p>*/}
                    {/*{this.list(this.state.data)}*/}
                {/*</div>*/}
            </div>
        )
    }
}

CoinsList.propTypes = {
    // dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(changePair, dispatch),
        // dispatch: (action)=>{action(); console.log("test dispatch")},
        changePair: () => {
            changePair();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinsList)


