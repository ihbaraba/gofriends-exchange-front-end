import React from 'react';
import {connect} from 'react-redux'
import Header2 from './Header2';
import UserOrder from "./UserOrder";

class CoinsList extends React.Component {
    render() {
        const {user, token} = this.props;

        if (token === "") {
            return <div> Need authorization...</div>
        }

        const {username, email, id} = user;
        return (
            <div>
                <Header2/>
                <div className="card-container, currencysPairs" style={{width: "70vw", margin: "auto"}}>
                    <div className="card-container-head">
                        <p className="h2">
                            Name:&emsp;<strong>{`${username}`}</strong>&emsp; &emsp; &emsp; &emsp;  E-mail:&emsp;
                            <strong>{`${email}`}</strong>&emsp; &emsp; &emsp; &emsp;  id:{id}
                        </p>
                        <h1 style={{margin: "2rem"}}>Your open orders</h1>
                        <UserOrder completed="false"/>

                        <h1 style={{margin: "2rem"}}>Your orders history</h1>
                        <UserOrder completed="true"/>

                    </div>
                </div>
            </div>
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


