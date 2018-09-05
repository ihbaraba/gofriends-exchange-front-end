import React, {Component} from 'react';
import Header from './Header';
import NavLink from './NavLink';
import Footer from './Footer';
import '../App.css';
import Header2 from "./Header2";


class Bann extends Component {


    render() {
        return (
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Account ban panel</h1>
                </div>
                <div className="orderBookWrap">
                    <table className="orderBook">
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Date of registration</th>
                            <th>Date of ban</th>
                        </tr>
                        <tr>
                            <td>M12.3</td>
                            <td>2018-07-02  12:04:54</td>
                            <td>2018-07-02  12:04:54</td>
                        </tr>

                        </tbody>
                    </table>
                </div>

                <Footer/>

            </div>
        )
    }
}

export default Bann;