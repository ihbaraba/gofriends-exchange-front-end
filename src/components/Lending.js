import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';


class Lending extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div className="main"></div>
                <div className="side">

                    <div className="box markets" id="marketsContainer">
                        <div className="head">
                            <div className="name">My Balances</div>
                        </div>


                        <div className="marketContainer" id="balancesTableContainer">
                            <div id="balancesTable_wrapper" className="dataTables_wrapper no-footer">
                                <div id="balancesTable_filter" className="dataTables_filter">
                                    <label>Search:
                                        <input
                                            type="search"
                                            class="" placeholder=""
                                        />
                                    </label>
                                </div>
                                <table id="balancesTable" className="dataTable no-footer" role="grid">
                                    <thead >
                                    <tr role="row">

                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="active odd" role="row">
                                        <td className="coin">BTC</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr  role="row" className="even">
                                        <td className="coin">BTS</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr  role="row" className="odd">
                                        <td className="coin">CLAM</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr  role="row" className="even">
                                        <td className="coin">DOGE</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr  role="row" className="odd">
                                        <td className="coin">DASH</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr  role="row" className="even">
                                        <td className="coin">LTC</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr  role="row" className="odd">
                                        <td className="coin">MAID</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr  role="row" className="even">
                                        <td className="coin">STR</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr  role="row" className="odd">
                                        <td className="coin">XMR</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr  role="row" className="even">
                                        <td className="coin">XRP</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr  role="row" className="odd">
                                        <td className="coin">ETH</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr  role="row" className="even">
                                        <td className="coin">FCT</td>
                                        <td className="sorting_1">-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>

                    <div className="box notices">
                        <div className="head">
                            <div className="name">Notices</div>
                            <div className="social">
                                <a href="#"><i className="fa fa-twitter-square"></i></a>
                            </div>
                        </div>


                        <div className="data" id="noticesBoard">
                            <div className="msg">
                                <div className="info">The BELA legacy coin will no longer be supported by the Bela team
                                    as of May 31. As a result, we will be delisting all legacy BELA markets on May 17.
                                    Trading in BELA pairs will no longer be supported at that time, and you will have
                                    until May 31 to withdraw your balance.
                                </div>
                                <div className="by">Posted by <strong>GoFriends Team</strong> at 2018-05-10 23:49:30
                                </div>
                            </div>
                            <div className="msg">
                                <div className="info">On May 15, we're introducing more compelling, consistent pricing
                                    across the board. Read more <a
                                        href="#"><b><u>here</u></b></a>.
                                </div>
                                <div className="by">Posted by <strong>GoFriends Team</strong> at 2018-05-01
                                    18:45:56
                                </div>
                            </div>
                            <div className="msg">
                                <div className="info">We have received some questions on the upcoming Monero hard fork
                                    at
                                    block 1564965. We plan to pause XMR deposits and withdrawals starting at 5pm EST on
                                    April 29, and re-enable once the network stabilizes. We do not plan to support XMV
                                    at this time, but you can choose to move your XMR to an exchange that supports
                                    multiple Monero forks. Stay tuned for more information on how we plan to approach
                                    listings, forks, swaps, and airdrops on GoFriends going forward.
                                </div>
                                <div className="by">Posted by <strong>GoFriends Team</strong> at 2018-04-27
                                    17:06:40
                                </div>
                            </div>
                            <div className="msg">
                                <div className="info">The GoFriends Journey
                                </div>
                                <div className="by">Posted by <strong>GoFriends Team</strong> at 2018-04-06
                                    02:40:00
                                </div>
                            </div>
                            <div className="msg">
                                <div className="info">We've been made aware of false reports coming from the creator of
                                    an
                                    impostor GoFriends app that the GoFriends platform has been compromised. Please note,
                                    the GoFriends platform has NOT been compromised and there is NOT a GoFriends app. This
                                    phishing scheme was aimed at various exchanges and the impostor has now chosen to
                                    publicly post sensitive user information of the victims - a highly unethical act.
                                </div>
                                <div className="by">Posted by <strong>GoFriends Team</strong> at 2018-03-03 01:15:04
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Lending;