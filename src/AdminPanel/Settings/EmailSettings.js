import React from 'react';
import {Table, Switch} from 'antd';

const EmailSettings = ({params, onChange, openEmail}) => {
    const columns = [
        {
            title: 'Trigger',
            dataIndex: 'subject',
            key: 'subject',
            width: 250,
        },
        {
            title: 'Title',
            dataIndex: 'subject',
            key: 'title',
            width: 150,
        },
        {
            title: 'Last changes',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: 150,
        },
        {
            title: '',
            dataIndex: 'enabled',
            key: 'enabled',
            width: 200,
            render: (enabled, item) => {
                return (<div>
                    <span className='switch-label'>Disable</span>
                    <Switch
                        className='switch'
                        checked={enabled}
                        onChange={(e) => onChange(e, item.trigger)}
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
            render: (e, item) => (<button className='admin-btn green-btn' onClick={() => openEmail(item)}>
                    Edit
            </button>)
        },
    ];

    return (
        <div className='email-settings'>
            <h1 style={{margin: '0 0 40px 0'}}>Email configurations</h1>

            <Table
                pagination={false}
                columns={columns}
                dataSource={params}
                rowKey={record => record.id}
                className='admin-table'
            />
        </div>
    )
};

export default EmailSettings;