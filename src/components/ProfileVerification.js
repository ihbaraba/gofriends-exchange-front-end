import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import {Select, Icon} from 'antd';
import axios from 'axios';

import {COUNTRIES, VERIFICATION} from '../constants/APIURLS';
import defaultImg from '../img/missing-image-16x9.svg';
import {toast} from "react-toastify";

const Option = Select.Option;

class ProfileVerification extends Component {
    state = {
        countries: [],
        firstStep: true,
        img: '',
        imgUrl: '',
        userInfo: {
            idType: 'id'
        }
    };

    onDrop = (picture) => {
        this.setState({
            imgUrl: URL.createObjectURL(picture[0]),
            img: picture[0]
        });
    };

    handleSaveInfo = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${VERIFICATION}/${this.props.userId}`, this.state.userInfo);

            toast.success(<div className='toaster-container'><Icon type="check-circle"/> Confirmed</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

            this.handleUploadImage();
        } catch (e) {
            toast.error(<div className='toaster-container'><Icon type="close"/> {e.response.data.userMessage}</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
        };

    nextStep = e => {
        e.preventDefault();

        this.setState({firstStep: false})
    };

    handleChangeInput = ({target: {name, value}}) => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [name]: value
            }
        })
    };

    handleUploadImage = async () => {
        const {img, userInfo: {idType}} = this.state;

        const formData = new FormData();
        formData.append(
            'document',
            img,
            img.name
        );

        await axios({
            method: 'post',
            url: `${VERIFICATION}/${this.props.userId}/upload/${idType}/1`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        this.props.exitModal();
    };

    componentDidMount() {
        axios.get(COUNTRIES)
            .then(res => {
                this.setState({countries: res.data});
            })
    }

    render() {
        const {firstStep, imgUrl, countries} = this.state;

        if (firstStep) {
            return (
                <div className='first-step'>
                    <div style={{clear: "both"}}>
                        <h1 className="sign">Welcome to Gofriends exchange</h1>
                    </div>

                    <div className="formVerificationWrap">
                        To begin trading, you’ll first need to submit your profile for verification
                    </div>

                    <form className="profileVerification" onSubmit={this.nextStep}>
                        <div className='form-item'>
                            <label>First Name</label>
                            <input type="text"
                                   name='firstName'
                                   onChange={this.handleChangeInput}
                                   required
                            />
                        </div>
                        <div className='form-item'>
                            <label>Last Name</label>
                            <input type="text"
                                   name='lastName'
                                   onChange={this.handleChangeInput}
                                   required
                            />
                        </div>
                        <div className='form-item'>
                            <label>City</label>
                            <input type="text"
                                   name='city'
                                   onChange={this.handleChangeInput}
                                   required
                            />
                        </div>
                        <div className='form-item'>
                            <label>Address</label>
                            <input type="text"
                                   name='address'
                                   onChange={this.handleChangeInput}
                                   required
                            />
                        </div>
                        <div className='form-item'>
                            <label>Postal code</label>
                            <input type="text"
                                   name='postalCode'
                                   onChange={this.handleChangeInput}
                                   required
                            />
                        </div>
                        <div className='form-item'>
                            <label>Phone Number</label>
                            <input type="tel"
                                   name='phone'
                                   onChange={this.handleChangeInput}
                                   required
                            />
                        </div>

                        <p className="check">
                            <input type="checkbox" name="terms" required/> I agree to the
                            <NavLink to="/terms" className="forgot">
                                Terms of Use
                            </NavLink>.
                        </p>
                        <button className="profile-v-btn">
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
                <div className='last-step'>
                    <div style={{clear: "both"}}>
                        <h1 className="sign">ID verification</h1>
                    </div>

                    <div className="formVerificationWrap">
                        This verification is designed to confirm your identy and protect you from identy theft
                    </div>

                    <form className="profileVerification">
                        <div className='form-item'>
                            <label>Issuing country</label>
                            <Select
                                dropdownClassName='ver-select'
                                onChange={e => this.setState({userInfo: {...this.state.userInfo, issuingCountry: e}})}>
                                {countries.map(item => (
                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        </div>

                        <div className='form-item'>
                            <label>ID type</label>
                            <Select dropdownClassName='ver-select'
                                    onChange={e => this.setState({userInfo: {...this.state.userInfo, idType: e}})}>
                                <Option value='id'>Passport</Option>
                                <Option value='driverLicense'>driver license</Option>
                            </Select>
                        </div>

                        <div className='upload-title'>
                            Upload passport image page
                        </div>

                        <div className='upload-block'>
                            <img src={imgUrl ? imgUrl : defaultImg} alt=""/>
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

                        <button className="profile-v-btn" onClick={this.handleSaveInfo}>
                            Continue
                        </button>
                    </form>
                </div>
            )
        }
    }
}

export default ProfileVerification;


