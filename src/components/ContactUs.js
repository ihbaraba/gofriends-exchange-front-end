import React, {Component} from 'react';
import '../App.css';

class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: '',
            name: '',
            organisation: '',
            email: '',
            message: ''
        }
    }

    handlerChangeInput = e => {
        let name = e.target.name,
            value = e.target.value;

        this.setState({[name]: value})
    };

    handleSubmit = (event) => {
        event.preventDefault();

        console.log(this.state)

    };

    render() {
        return (
            <div>
                <div>
                    <h3 style={{textAlign: 'center'}}>CONTACT US</h3>
                </div>
                <div className="featureBanner twoCol contact">
                    <div className="contentWrapper formWrapper column1">
                        <h3 style={{textAlign: 'center'}}>Let us know what you need.</h3>
                        <form onSubmit={this.handleSubmit}>
                            <fieldset className="aboveCaptcha">
                                <div>
                                    <label>Subject:</label>
                                    <select
                                        style={{color: "#000"}}
                                        name='subject'
                                        value={this.state.subject}
                                        onChange={this.handlerChangeInput}
                                        required
                                    >
                                        <option value="">Select a topic...</option>
                                        <option value="Business Development Inquiry">Business Development Inquiry</option>
                                        <option value="Media Inquiry">Media Inquiry</option>
                                        <option value="Careers">Careers</option>
                                        <option value="Technical Support">Technical Support</option>
                                    </select>
                                </div>

                                <div>
                                    <label>Name:</label>
                                    <input
                                        className="userPassInput"
                                        type='text'
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handlerChangeInput}
                                        required/>
                                </div>
                                <div>
                                    <label>Organization:</label>
                                    <input
                                        className="userPassInput"
                                        type="text"
                                        name="organisation"
                                        value={this.state.organisation}
                                        onChange={this.handlerChangeInput}
                                        required/>
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <input
                                        className="userPassInput"
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handlerChangeInput}
                                        required/>
                                </div>
                                <div>
                                    <label>Message:</label>
                                    <textarea
                                        rows="10"
                                        name='message'
                                        value={this.state.message}
                                        onChange={this.handlerChangeInput}
                                        required
                                    >
                                </textarea>
                                </div>


                                <div className="buttonRow">
                                    <p>This inbox is not monitored for support requests.
                                        For technical assistance, Contact Support.</p>
                                    <button className="btn" type="submit">
                                        Send
                                    </button>
                                </div>
                            </fieldset>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default ContactUs;
