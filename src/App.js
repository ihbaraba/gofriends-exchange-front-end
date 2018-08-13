import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
// import { Provider } from 'react-redux'
// import configureStore from './store/configureStore'
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import Registration from './components/Registration';
import ExchangePage from './components/ExchangePage';
import MarginTrading from './components/MarginTrading';
import Lending from './components/Lending';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import ResetPassword from './components/ResetPassword';
import TwoFactorAuth from './components/TwoFactorAuth';
import Login2 from './components/Login2';
import ContactUs from './components/ContactUs';
import Policy from './components/Policy';
import Terms from './components/Terms';
import Activate from './components/Activate';
import ChangePassword from './components/ChangePassword';
import Balances from './components/Balances';
import Orders from './components/Orders';
import LoginHistory from './components/LoginHistory';
// import {changePair} from "./actions/ExchangeActions";
import {simpleAction} from "./actions/simpleAction";
// import {bindActionCreators} from "redux/index";

// const store = configureStore();

class App extends Component {
    render() {
            {/*<Provider store={store}>*/}
        return (
            <Router>
                <div className="App">
                    <Switch>
                        {/*<Route exact path="/" component={WelcomePage}/>*/}
                        <Route exact path="/" component={ExchangePage}/>
                        <Route path="/exchange" component={ExchangePage}/>
                        <Route path="/margintrading" component={MarginTrading}/>
                        <Route path="/lending" component={Lending}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Registration}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/resetPassword" component={ResetPassword}/>
                        <Route path="/2fa" component={TwoFactorAuth}/>
                        <Route path="/login2" component={Login2}/>
                        <Route path="/contact" component={ContactUs}/>
                        <Route path="/privacy" component={Policy}/>
                        <Route path="/terms" component={Terms}/>
                        <Route path="/activate" component={Activate}/>
                        <Route path="/changepassword" component={ChangePassword}/>
                        <Route path="/balances" component={Balances}/>
                        <Route path="/orders" component={Orders}/>
                        <Route path="/loginhistory" component={LoginHistory}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
            // </Provider>
    }
}
//
// const mapStateToProps = state => ({
//         ...state
//     });
//
// const mapDispatchToProps = dispatch => ({
//     simpleAction: () => dispatch(simpleAction())
//         // actions: bindActionCreators(changePair, dispatch),
//         // dispatch: (action) => {
//         //     console.log("test dispatch")
//             // action();
//         // },
//         // changePair: () => {
//         //     changePair();
//         // }
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
