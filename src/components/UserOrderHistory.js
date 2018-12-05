import React from 'react';
import {connect} from 'react-redux'
import UserOrder from "./UserOrder";

class CoinsList extends React.Component {
    render() {
        const {token} = this.props;

        if (token === "") {
            return <div> Need authorization...</div>
        }

        return (
            <div className="card-container">
                <div className="card-container-head">
                    <h3>My trade history</h3>
                </div>

                <div className="table">
                    <UserOrder completed="true"/>
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


