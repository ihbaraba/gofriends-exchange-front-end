import React, {Component} from 'react';
import {Modal, Select} from 'antd';

import AdminsList from './AdminsList';

const Option = Select.Option;

class Admins extends Component {
    state = {
        admins: [],
        visible: false
    };

    componentWillMount() {
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        const {visible} = this.state;
        const modalStyles = {
            background: '#313131'
        };

        return (
            <div className='admins-page'>
                <div className='create-block'>
                    <button className='admin-btn green-btn' onClick={this.showModal}>Add new</button>
                </div>

                <AdminsList/>

                <Modal
                    title="New admin"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    bodyStyle={modalStyles}
                    footer={null}
                    className='admins-modal'
                >
                    <div className='form-item'>
                        <label htmlFor="Roule ">Roule</label>
                        <Select defaultValue="admin" style={{ width: 180 }}>
                            <Option value="admin">Admin</Option>
                        </Select>
                    </div>

                    <div style={{display: 'flex', margin: '30px 0 0 0'}}>
                        <div className='form-item'>
                            <label htmlFor=" ">Email </label>
                            <input type="text"/>
                        </div>
                        <div className='form-item'>
                            <label htmlFor=" ">Password</label>
                            <input type="text"/>
                        </div>
                    </div>

                    <button className='admin-btn' onClick={this.handleOk}>Save</button>
                </Modal>
            </div>
        )
    }
}

export default Admins;