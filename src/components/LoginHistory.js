import React, {Component} from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import '../App.css';

class LoginHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">MY LOGIN HISTORY</h1>
                </div>
                <table className="orderBook">
                    <tbody>
                    <tr>
                        <th>Date</th>
                        <th>IP Address</th>
                        <th>Used Two-Factor Authentication</th>
                    </tr>
                    <tr>
                        <td>2018-06-14 10:05:36</td>
                        <td>93.73.15.146</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>2018-06-14 07:19:58</td>
                        <td>93.73.15.146</td>
                        <td>Yes</td>
                    </tr>

                    <tr>
                        <td>2018-06-05 08:58:26</td>
                        <td>93.73.15.146</td>
                        <td>No</td>
                    </tr>


                    </tbody>
                </table>
            </div>
        )
    }
}

export default LoginHistory;

