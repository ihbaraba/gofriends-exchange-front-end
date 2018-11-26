import React, {Component} from 'react';
import {connect} from "react-redux";
import {logOut} from "../actions/UserActions";

class Login extends Component {
    componentDidMount() {
        // console.log("Login component mounted. Firing logOut ");
        /*
        * Making logOut as soon component created
        * - clear token in localStore
        **/
        this.props.logOut();
        this.props.history.push(`/login`);
    }

    render() {
        return (
            <div>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Making logOut ...</h1>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);