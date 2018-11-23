import React, {Component} from 'react';
import Header2 from './Header2';
import '../App.css';

class Knowledge extends Component {
    render() {
        return (
            <div>
                <Header2/>
                <div style={{clear: "both"}}>
                    <h1 className="sign">Knowledge Base</h1>
                </div>

                <section className="knowledge-page">
                    <div className="knowledge-wrapp">
                        <h3 className="knowledge-subtitle">Help and Support articles</h3>
                        <div className="knowledge-block">
                            <div className="knowledge-block-left">
                                <div>
                                    <ul className="knowledge-question">
                                        <p className="knowledge-title-question">Getting Started<span>(2)</span></p>
                                        <li><a href="">Basics to get you started</a></li>
                                        <li><a href="">How do I trade?</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <ul className="knowledge-question">
                                        <p className="knowledge-title-question">Two-Factor Authentication
                                            (2FA)<span>(5)</span></p>
                                        <li><a href="">What is Two-Factor Authentication (2FA) and why do I need it?</a>
                                        </li>
                                        <li><a href="">How do I setup Two-Factor Authentication (2FA)?</a></li>
                                        <li><a href="">My Two-Factor codes aren’t working ("Incorrect Code" errors)</a>
                                        </li>
                                        <li><a href="">How do I restore my authenticator app from a 16 digit key
                                            backup?</a></li>
                                        <li><a href="">I lost access to my 2FA device. How can I now access my
                                            account?</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <ul className="knowledge-question">
                                        <p className="knowledge-title-question">Withdrawals<span>(6)</span></p>
                                        <li><a href="">How do I withdraw my coins?</a></li>
                                        <li><a href="">Where is my withdrawal?</a></li>
                                        <li><a href="">Why haven’t I received a Withdrawal Confirmation email?</a></li>
                                        <li><a href="">My withdrawal confirmation link failed</a></li>
                                        <li><a href="">My withdrawal is Awaiting Approval</a></li>
                                        <li></li>
                                        <p className="knowledge-accordion">See all 6 articles</p>
                                        <div className="accordeon-content"><a href="">Basics to get you started</a>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div className="knowledge-block-right">
                                <div>
                                    <ul className="knowledge-question">
                                        <p className="knowledge-title-question">Frequently Asked
                                            Questions<span>(13)</span></p>
                                        <li><a href="">Can I change the email address associated with my GoFriends
                                            account?</a></li>
                                        <li><a href="">Does GoFriends have an API?</a></li>
                                        <li><a href="">Are there fees for using GoFriends?</a></li>
                                        <li><a href="">How can I get a coin listed on GoFriends?</a></li>
                                        <li><a href="">What if I have coins on loan when a fork happens?</a></li>
                                        <p className="knowledge-accordion">See all 13 articles
                                            <div className="accordeon-content"><a href="">Basics to get you started</a>
                                            </div>
                                        </p>
                                    </ul>
                                </div>
                                <div>
                                    <ul className="knowledge-question">
                                        <p className="knowledge-title-question">Deposits<span>(4)</span></p>
                                        <li><a href="">How do I deposit my coins?</a></li>
                                        <li><a href="">Where is my deposit?</a></li>
                                        <li><a href="">Minimum deposit amount</a></li>
                                        <li><a href="">Individual coin rules and exceptions</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <ul className="knowledge-question">
                                        <p className="knowledge-title-question">Getting Support<span>(2)</span></p>
                                        <li><a href="">How do I open a support ticket? What information should I
                                            include?</a></li>
                                        <li><a href="">What happens after I submit a support ticket? How can I track the
                                            status?</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Knowledge;
