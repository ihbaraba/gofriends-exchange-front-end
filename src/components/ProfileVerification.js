import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import ImageUploader from 'react-images-upload';

import defaultImg from '../img/missing-image-16x9.svg';

class ProfileVerification extends Component {
    state = {
        firstStep: true,
        img: ''
    };

    onDrop = (picture) => {
        this.setState({
            img: URL.createObjectURL(picture[0])
        });
    };

    render() {
        const {firstStep, img} = this.state;

        if (firstStep) {
            return (
                <div className='first-step'>
                    <div style={{clear: "both"}}>
                        <h1 className="sign">Welcome to Gofriends exchange</h1>
                    </div>

                    <div className="formVerificationWrap">
                        To begin trading, you’ll first need to submit your profile for verification
                    </div>

                    <form className="profileVerification">
                        <div className='form-item'>
                            <label>First Name</label>
                            <input type="text"/>
                        </div>
                        <div className='form-item'>
                            <label>Last Name</label>
                            <input type="text"/>
                        </div>
                        <div className='form-item'>
                            <label>City</label>
                            <input type="text"/>
                        </div>
                        <div className='form-item'>
                            <label>Address</label>
                            <input type="text"/>
                        </div>
                        <div className='form-item'>
                            <label>Postal code</label>
                            <input type="text"/>
                        </div>
                        <div className='form-item'>
                            <label>Phone Number</label>
                            <input type="tel"/>
                        </div>

                        <p className="check">
                            <input type="checkbox" name="terms" required/> I agree to the
                            <NavLink to="/terms" className="forgot">
                                Terms of Use
                            </NavLink>.
                        </p>
                        <button className="profile-v-btn" onClick={this.setState({firstStep: false})}>
                            Next step
                        </button>

                        <div className="learn">
                            <a href="">Learn how your privacy is protected</a>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <div className='first-step'>
                    <div style={{clear: "both"}}>
                        <h1 className="sign">ID verification</h1>
                    </div>

                    <div className="formVerificationWrap">
                        This verification is designed to confirm your identy and protect you from identy theft
                    </div>

                    <form className="profileVerification">
                        <div className='form-item'>
                            <label>Issuing country</label>
                            <input type="text"/>
                        </div>
                        <div className='form-item'>
                            <label>ID type</label>
                            <input type="text"/>
                        </div>

                        <div className='upload-title'>
                            Upload passport image page
                        </div>

                        <div className='upload-block'>
                            <img src={img ? img : defaultImg} alt=""/>
                            <ImageUploader
                                withIcon={false}
                                buttonText='Choose file'
                                SingleImage={true}
                                className='chose-file'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                            />
                        </div>

                        <button className="profile-v-btn">
                            Continue
                        </button>
                    </form>
                </div>
            )
        }
    }
}

export default ProfileVerification;


