import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import LogOut from './components/LogOut';
import Registration from './components/Registration';
import ExchangePage from './components/ExchangePage';
import MarginTrading from './components/MarginTrading';
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
import UserOrdersHistory from './components/UserOrderHistory';
import LoginHistory from './components/LoginHistory';
import OpenOrders from './components/OpenOrders';
import Bann from './components/Bann';
import OrderPanel from './components/OrderPanel';
import DepositHistory from './components/DepositHistory';
import Withdrawalpanel from './components/Withdrawalpanel';
import Transactions from './components/Transactions';
import Confirm from './components/Confirm';
import BalancesPanel from './components/BalancesPanel';
import Knowledge from './components/Knowledge';
import ProfileVerification from './components/ProfileVerification';

import Footer from './components/Footer';
import Header from './components/Header';


import YourOpenOrders from "./components/YourOpenOrders";


class App extends Component {
    render() {
        return (
            <div className="w-wrapper">
                <Router>
                    <div className="w-wrapper">
                        <div className="w-header">
                            <Header/>
                        </div>

                        <div className="w-content first-background">
                            <div className='size-container'>
                                <Switch>
                                    <Route exact path="/" component={WelcomePage}/>
                                    <Route exact path="/" component={Registration}/>
                                    <Route path="/exchange" component={ExchangePage}/>
                                    <Route path="/margintrading" component={MarginTrading}/>
                                    <Route path="/login" component={Login}/>
                                    <Route path="/logout" component={LogOut}/>
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
                                    <Route path="/orders" component={UserOrdersHistory}/>
                                    <Route path="/loginhistory" component={LoginHistory}/>

                                    <Route path="/OpenOrders" component={OpenOrders}/>
                                    <Route path="/Bann" component={Bann}/>
                                    <Route path="/OrderPanel" component={OrderPanel}/>
                                    <Route path="/DepositHistory" component={DepositHistory}/>
                                    <Route path="/withdrawalpanel" component={Withdrawalpanel}/>
                                    <Route path="/Transactions" component={Transactions}/>
                                    <Route path="/Confirm" component={Confirm}/>
                                    <Route path="/BalancesPanel" component={BalancesPanel}/>
                                    <Route path="/YourOpenOrders" component={YourOpenOrders}/>
                                    <Route path="/Knowledge" component={Knowledge}/>
                                    <Route path="/ProfileVerification" component={ProfileVerification}/>

                                    <Route path="*" component={NotFound}/>
                                </Switch>
                            </div>
                        </div>

                        <div className="w-footer">
                            <Footer/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
