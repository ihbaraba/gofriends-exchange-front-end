import React, {Component} from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import defaultImg from '../../../img/missing-image-16x9.svg';

class KYC extends Component {
    state = {
        isOpenImage: false
    };

    imgUrl = document.location.hostname === "localhost"
        ? 'https://dev.gofriends.pro/'
        : `https://${document.location.hostname}/`;

    render() {
        const {user, kyc, verify} = this.props;
        const {isOpenImage} = this.state;

        return (
            <div className="kyc-block">
                <div className="details-block">
                    <div className="title-block">
                        Details
                    </div>

                    <div className='border-right'>
                        <div className="form-item">
                            <label htmlFor="">Phone </label>
                            <input
                                type="text"
                                value={kyc.phone}
                                disabled
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="">First name</label>
                            <input
                                type="text"
                                value={kyc.firstName}
                                disabled
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="">Last name</label>
                            <input
                                type="text"
                                value={kyc.lastName}
                                disabled
                            />
                        </div>

                        {/*<div className="form-item">*/}
                        {/*<label htmlFor="">DOB</label>*/}
                        {/*<input*/}
                        {/*type="text"*/}
                        {/*value={user.phone}*/}
                        {/*disabled*/}
                        {/*/>*/}
                        {/*</div>*/}

                        <div className="form-item">
                            <label htmlFor="">Country</label>
                            <input
                                type="text"
                                value={user.phone}
                                disabled
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="">City</label>
                            <input
                                type="text"
                                value={kyc.city}
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <div className="id-info">
                    <div className="title-block">
                        ID info
                    </div>

                    <div className="form-item">
                        <label htmlFor="">ID</label>
                        <input
                            type="text"
                            value={kyc.documents.length > 0 ? kyc.documents[0].id : ''}
                            disabled
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="">ID type</label>
                        <input
                            type="text"
                            value={kyc.documents.length > 0 ? kyc.documents[0].type : ''}
                            disabled
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="">ID Expiry</label>
                        <input
                            type="text"
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="">ID Number</label>
                        <input
                            type="text"
                        />
                    </div>

                </div>

                <div className="id-proofs">
                    <div className="title-block">
                        ID proofs
                    </div>

                    <div className="form-item" onClick={() => this.setState({isOpenImage: true})}>
                        <label htmlFor="">ID proof</label>
                        <img
                            src={kyc.documents.length > 0 ? `${this.imgUrl}uploads/${kyc.documents[0].filename}` : defaultImg}
                            alt=""/>
                    </div>

                    {/*<div className="form-item">*/}
                    {/*<label htmlFor="">ID proof (Back)</label>*/}
                    {/*<img src={defaultImg} alt=""/>*/}
                    {/*</div>*/}

                    {isOpenImage && (
                        <Lightbox
                            mainSrc={kyc.documents.length > 0 ? `${this.imgUrl}uploads/${kyc.documents[0].filename}` : defaultImg}
                            onCloseRequest={() => this.setState({ isOpenImage: false })}
                        />
                    )}
                </div>

                <div className="verification">
                    <div className="title-block">
                        Verification
                    </div>

                    <div className='border-left'>
                        <div className="form-item">
                            <label htmlFor="">Status</label>
                            <input
                                type="text"
                                value={user.verifyStatus}
                                disabled
                                style={{color: user.verifyStatus === 'verified' ? '#00CE7D' : '#fff'}}
                            />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            {user.verifyStatus === 'verified' ?
                                <button className='admin-btn red-btn'
                                        onClick={() => verify(user.id, false)}>Reject</button>
                                :
                                <button className='admin-btn green-btn'
                                        onClick={() => verify(user.id, true)}>Verify</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default KYC;