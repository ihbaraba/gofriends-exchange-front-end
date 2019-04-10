import React, {Component} from 'react';
import '../App.css';

class MarginTrading extends Component {
    render() {
        return (
            <div>
                <div className="side">

                    <div className="box notices">
                        <div className="head">
                            <div className="name">Notices</div>
                            <div className="social">
                                <a href=""><i className="fa fa-twitter-square"></i></a>
                            </div>
                        </div>


                        <div className="data" id="noticesBoard">
                            <div className="msg">
                                <div className="info">We understand that there are some concerns about our process to
                                    verify
                                    legacy accounts. Although we are actively encouraging customers to complete the
                                    process within the next two weeks and doing our best to address any issues that may
                                    arise, there will be customers who are unable to complete the process in that
                                    timeframe. These customers will still have the option to complete verification to
                                    restore full account functionality, but meanwhile will not be able to trade or
                                    withdraw funds. At all times, their funds will be safe and accounted for. As a
                                    reminder, please beware of scams - at no point in time will we ask for a deposit to
                                    restore account functionality.
                                </div>
                                <div className="by">Posted by <strong>Gofriends Team</strong> at 2018-05-31 17:34:34
                                </div>
                            </div>
                            <div className="msg">
                                <div className="info">We are now requiring that all legacy Beetok accounts become
                                    verified
                                    through the latest version of our verification portal. If you have a legacy account,
                                    you will not have the ability to use Beetok until your profile verification is
                                    complete. We are asking everyone to take action within the next 14 days. We
                                    appreciate your cooperation in this process.
                                </div>
                                <div className="by">Posted by <strong>Beetok Team</strong> at 2018-05-27 05:46:49
                                </div>
                            </div>
                            <div className="msg">
                                <div className="info">We are permanently shutting down the SJCX wallet on June 29. This
                                    means that you will have until then to transfer any SJCX that you have off the
                                    exchange. Following June 29, 2018 you will have no ability to recover or access any
                                    SJCX that you currently hold on Beetok. Note that the STORJ team is offering to
                                    exchange SJCX for STORJ. For more information please visit <a
                                        href="https://sjcxto.storj.io">https://sjcxto.storj.io</a></div>
                                <div className="by">Posted by <strong>Beetok Team</strong> at 2018-05-25 19:34:48
                                </div>
                            </div>
                            <div className="msg">
                                <div className="info">The BELA legacy coin will no longer be supported by the Bela team
                                    as
                                    of May 31. As a result, we will be delisting all legacy BELA markets on May 17.
                                    Trading in BELA pairs will no longer be supported at that time, and you will have
                                    until May 31 to withdraw your balance.
                                </div>
                                <div className="by">Posted by <strong>Beetok Team</strong> at 2018-05-10 23:49:30
                                </div>
                            </div>
                            <div className="msg">
                                <div className="info">On May 15, we're introducing more compelling, consistent pricing
                                    across the board. Read more <a
                                        href=""><b><u>here</u></b></a>.
                                </div>
                                <div className="by">Posted by <strong>Beetok Team</strong> at 2018-05-01
                                    18:45:56
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default MarginTrading;