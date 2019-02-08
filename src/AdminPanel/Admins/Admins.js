import React, {Component} from 'react';
import {Modal, Select} from 'antd';
import axios from 'axios';

import {GET_ADMINS, GET_USERS} from '../../constants/APIURLS';

import AdminsList from './AdminsList';

const Option = Select.Option;

class Admins extends Component {
    state = {
        admins: [],
        visible: false,
        email: '',
        password: ''
    };

    getUsers = async () => {
        const res = await axios.get(GET_ADMINS);

        this.setState({
            admins: res.data
        })
    };

    componentWillMount() {
        this.getUsers();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        e.preventDefault();

        const {email, password} = this.state;
        axios.post(GET_USERS, {
            email,
            password,
            role: 'ADMIN'
        });

        this.setState({
            visible: false,
        });
    };

    handleRemoveUser = async (id) => {
        await axios.delete(`${GET_USERS}`);

        this.getUsers();
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const {visible, admins, email, password} = this.state;

        return (
            <div className='admins-page'>
                <div className='create-block'>
                    <button className='admin-btn green-btn' onClick={this.showModal}>Add new</button>
                </div>

                <AdminsList
                    list={admins}
                    onRemove={this.handleRemoveUser}
                />

                <Modal
                    title="New admin"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    className='admins-modal'
                >
                    <form onSubmit={this.handleOk}>
                        <div className='form-item'>
                            <label htmlFor="Roule ">Roule</label>
                            <Select dropdownClassName='admin-select' defaultValue="admin" style={{width: 180}}>
                                <Option value="admin">Admin</Option>
                            </Select>
                        </div>

                        <div style={{display: 'flex', margin: '30px 0 0 0'}}>
                            <div className='form-item'>
                                <label htmlFor=" ">Email </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={({target}) => this.setState({email: target.value})}
                                />
                            </div>
                            <div className='form-item'>
                                <label htmlFor=" ">Password</label>
                                <input
                                    type="text"
                                    value={password}
                                    onChange={({target}) => this.setState({password: target.value})}
                                />
                            </div>
                        </div>

                        <button className='admin-btn'>Save</button>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default Admins;