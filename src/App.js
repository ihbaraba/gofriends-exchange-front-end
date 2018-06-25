import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
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

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={WelcomePage}/>
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
    }
}

export default App;
