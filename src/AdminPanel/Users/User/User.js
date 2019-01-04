import React, {Component} from 'react';

import ShortUserInformation from './ShortUserInformation';

class User extends Component {
    render() {
        return(
            <div className="user-page">
                <div className='top-block'>
                    <ShortUserInformation/>

                    <div className='blocked-user-block'>
                        <div className='title'>Block user</div>

                        <div>
                            <div>
                                <label>Reason </label>
                                <input type="text"/>
                            </div>
                            <button className='admin-btn'>Block user</button>
                        </div>
                    </div>
                </div>

                <div className='response-side'>

                </div>
            </div>
        )
    }
}

export default User;