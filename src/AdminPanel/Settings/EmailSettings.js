import React from 'react';
import {Table, Switch} from 'antd';

const EmailSettings = () => {
    const columns = [
        {
            title: 'Trigger',
            dataIndex: 'trigger',
            key: 'trigger',
            width: 250,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 150,
        },
        {
            title: 'Last changes',
            dataIndex: 'changeDate',
            key: 'changeDate',
            width: 150,
        },
        {
            title: '',
            dataIndex: 'switch',
            key: 'switch',
            width: 200,
            render: (params) => {
                return (<div>
                    <span className='switch-label'>Disable</span>
                    <Switch
                        className='switch'
                        checked={params.value}
                        // onChange={(e) => onChange(e, params.id)}
                    />
                    <span className='switch-label'>Enable</span>
                </div>)
            }
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            width: 150,
            render: (item) => (<button className='admin-btn green-btn'>Edit</button>)
        },
    ];

    return (
        <div className='email-settings'>
            <h1 style={{margin: '0 0 40px 0'}}>Email configurations</h1>

            <Table
                columns={columns}
                // dataSource={list}
                rowKey={record => record.id}
                className='admin-table'
            />
        </div>
    )
};

export default EmailSettings;