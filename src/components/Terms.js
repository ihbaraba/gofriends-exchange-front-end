import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

class Terms extends Component{

    render(){
        return(
            <div>
                <Header/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">TERMS OF USE</h1>
                </div>

                <div className="p-wrap">
                    <h3>Coming soon</h3>

                </div>

            </div>
        )
    }
}

export default Terms;