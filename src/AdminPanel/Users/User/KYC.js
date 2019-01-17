import React from 'react';
import defaultImg from '../../../img/missing-image-16x9.svg';

const KYC = ({user}) => {

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
                            value={user.phone}
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="">First name</label>
                        <input
                            type="text"
                            value={user.name}
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="">Last name</label>
                        <input
                            type="text"
                            value={user.name}
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="">DOB</label>
                        <input
                            type="text"
                            value={user.phone}
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="">Country</label>
                        <input
                            type="text"
                            value={user.phone}
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="">City</label>
                        <input
                            type="text"
                            value={user.phone}
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
                        value={user.phone}
                    />
                </div>

                <div className="form-item">
                    <label htmlFor="">ID type</label>
                    <input
                        type="text"
                        value={user.phone}
                    />
                </div>

                <div className="form-item">
                    <label htmlFor="">ID Expiry</label>
                    <input
                        type="text"
                        value={user.phone}
                    />
                </div>

                <div className="form-item">
                    <label htmlFor="">ID Number</label>
                    <input
                        type="text"
                        value={user.phone}
                    />
                </div>

            </div>

            <div className="id-proofs">
                <div className="title-block">
                    ID proofs
                </div>

                <div className="form-item">
                    <label htmlFor="">ID proof (front)</label>
                    <img src={defaultImg} alt=""/>
                </div>

                <div className="form-item">
                    <label htmlFor="">ID proof (Back)</label>
                    <img src={defaultImg} alt=""/>
                </div>

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
                            value={user.phone}
                        />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <button className='admin-btn green-btn'>Verify</button>
                        <button className='admin-btn red-btn'>Reject</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default KYC;