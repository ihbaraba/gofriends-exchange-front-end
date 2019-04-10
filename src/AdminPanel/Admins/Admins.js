import React, {Component} from 'react';
import {Modal, Select, Table} from 'antd';
import axios from 'axios';

import {GET_ADMINS, GET_USERS, PAIRS} from '../../constants/APIURLS';

import AdminsList from './AdminsList';
import {Icon} from "antd";
import {toast} from "react-toastify";

const Option = Select.Option;


class Admins extends Component {
    state = {
        admins: [],
        superAdmin: [],
        visible: false,

        update: false,
        email: '',
        password: '',
        id: ''
    };

    getUsers = async () => {
        const res = await axios.get(GET_ADMINS);
        let admins = [],
            superAdmin = [];

        res.data.forEach(item => {
            if (item.role === 'ADMIN') {
                superAdmin.push(item)
            } else {
                admins.push(item)
            }
        });

        this.setState({
            admins: admins,
            superAdmin: superAdmin
        })
    };

    componentWillMount() {
        this.getUsers();
    }

    showModal = (admin) => {
        console.log(admin);

        if (admin) {
            this.setState({
                visible: true,
                email: admin.email,
                password: admin.password,
                id: admin.id,
                update: true
            });
        } else {
            this.setState({
                visible: true,
                update: false
            });
        }
    };

    handleOk = async (e) => {
        e.preventDefault();

        const {email, password, update, id} = this.state;

        try {


            if (update) {
                await axios.put(`${GET_USERS}/${id}/admin`, {
                    email,
                    password,
                });
            } else {
                await axios.post(GET_USERS, {
                    email,
                    password,
                    role: 'MANAGER',
                    countryId: 13,
                    username: 'manager'
                });
            }

            this.getUsers();

            toast.success(<div className='toaster-container'><Icon type="check-circle"/> Confirmed</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

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

        this.setState({
            visible: false,
            email: '',
            password: ''
        });
    };

    handleRemoveUser = async (id) => {
        try {
            await axios.delete(`${GET_USERS}/${id}/admin`);

            this.getUsers();

            toast.success(<div className='toaster-container'><Icon type="check-circle"/> Confirmed</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

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

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            email: '',
            password: ''
        });
    };

    render() {
        const {visible, admins, superAdmin, email, password, update} = this.state;


        const columns = [
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                width: 150,
                render: () => (
                    <span>Superadmin</span>
                )
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                width: 200,
            },
            {
                title: 'Password',
                dataIndex: 'pass',
                key: 'pass',
                width: 200,
                render: () => (
                    <span>*************</span>
                )
            },
            {
                title: '',
                dataIndex: 'actions',
                key: 'actions',
                width: 250,
                render: (e, item) => (
                    <div className='action-btn'>
                        <button className='admin-btn' onClick={() => this.showModal(item)}>
                            Edit
                        </button>
                    </div>
                )
            }
        ];

        return (
            <div className='admins-page'>
                <div className='super-admin'>
                    <Table
                        columns={columns}
                        dataSource={superAdmin}
                        rowKey={record => record.id}
                        className='admin-table'
                        pagination={false}
                    />
                </div>

                <div className='create-block'>
                    <button className='admin-btn green-btn' onClick={() => this.showModal()}>Add new</button>
                </div>

                <AdminsList
                    list={admins}
                    onRemove={this.handleRemoveUser}
                    onEditAdmin={this.showModal}
                />

                <Modal
                    title={update ? 'Edit admin' : "New admin"}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    className='admins-modal'
                >
                    <form onSubmit={this.handleOk}>
                        {/*<div className='form-item'>*/}
                        {/*<label htmlFor="Roule ">Roule</label>*/}
                        {/*<Select dropdownClassName='admin-select' defaultValue="manager" style={{width: 180}}>*/}
                        {/*<Option value="manager">Admin</Option>*/}
                        {/*</Select>*/}
                        {/*</div>*/}
                        <div style={{display: 'flex'}}>
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