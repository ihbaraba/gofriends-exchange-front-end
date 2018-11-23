import React, {Fragment} from 'react';
import {connect} from 'react-redux'
import Balances from './Balances';

class CoinsList extends React.Component {
    constructor() {
        super();
        this.FullBalance = this.FullBalance.bind(this);
    }

    // list = data => data.map(
    //   item => (<div key={`CoinsList_${item.baseCurrency.code}_${item.quoteCurrency.code}`}>{item.id} {item.baseCurrency.name} / {item.quoteCurrency.code}</div>)
    // );

    FullBalance = (user) => {
        // console.log(user);
        const {username, balances = [], id} = user;
        return (<div className="card-container, currencysPairs" style={{width: "70vh", margin: "auto"}}>
            <div className="card-container-head">
                <p className="h2">
                    Name:&emsp;<strong>{`${username}`}</strong>&emsp; &emsp; &emsp; &emsp;  E-mail:&emsp;
                    <strong>{`${username}`}</strong>&emsp; &emsp; &emsp; &emsp;  id:{id}
                </p>
                <h1 style={{margin: "2rem"}}>BALANCE</h1>
                {balances.map(item => <h2 style={{margin: "2rem auto"}} key={item.currency.name + "" + item.amount}>
                    {`  ${item.currency.name}: ${(+item.amount).toFixed(5)} `}  </h2>
                )}
            </div>
        </div>)
    }

    render() {
        const {user, token, short} = this.props;

        if (token === "") {
            return <div>Balance unable. Need authorization...</div>
        }

        const {username, balances = [], id} = user;
        // console.log("UserInfo props =", balances, user, token);

        const balance = balances.reduce((str, item) => str + `  ${item.currency.code}: ${(+item.amount).toFixed(5)}  `, ``);

        const content = short
            ? <div style={{width: '100%'}} className="card-container currencysPairs">
                <div className="card-container-head">
                    <p className="h2">
                        {`${balance}`}   &emsp; &emsp; <strong>{`${username}`}</strong> id:{id}
                    </p>
                </div>
            </div>
            : <div>
                {/*{this.FullBalance(user)}*/}
                <Balances user={user}/>
            </div>;
        return (
            <Fragment>
                {content}
            </Fragment>
        )
    }
}

CoinsList.propTypes = {
    // dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        user: state.user,
        token: state.user.token
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinsList)


