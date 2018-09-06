import React, {Component} from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import {connect} from "react-redux";
import {logOut} from "../actions/UserActions";

class Login extends Component {
    constructor(props) {
        super(props);
    }

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
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Making logOut ...</h1>
                </div>

                <Footer/>
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