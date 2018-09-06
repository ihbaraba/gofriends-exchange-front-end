import React, {Component} from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';

class OpenOrders extends Component{

    render(){
        return(
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Your open Orders</h1>
                </div>

                <div className="ordwrap"><h2>You have no open orders.</h2></div>
                <Footer/>
            </div>
        )
    }
}

export default OpenOrders;
