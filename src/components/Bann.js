import React, {Component} from 'react';
import '../App.css';


class Bann extends Component {
    render() {
        return (
            <div>
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
                            <td>2018-07-02 12:04:54</td>
                            <td>2018-07-02 12:04:54</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Bann;