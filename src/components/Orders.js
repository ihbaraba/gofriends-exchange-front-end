import React, {Component} from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';

class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">YOUR OPEN ORDERS</h1>
                </div>
            </div>
        )
    }
}

export default Orders;
