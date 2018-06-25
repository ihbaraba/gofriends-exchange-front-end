import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

class Policy extends Component{

    render(){
        return(
            <div>
                <Header/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">PRIVACY POLICY</h1>
                </div>
            </div>
        )
    }
}

export default Policy;