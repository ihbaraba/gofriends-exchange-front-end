import React from 'react';
import {Menu} from 'antd';

const PairsList = ({list, onChangePair}) => {
    return (
        <div className='pairs-list-block'>
            <div className='block-title'>
                Select pair
            </div>

            <div className='list'>
                <Menu
                    defaultSelectedKeys={['0']}
                    mode="inline"
                >
                    {list.map((item, index) => (
                        <Menu.Item
                            key={index}
                            onClick={() => onChangePair(item)}
                        >
                            <span>{item.name}</span>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        </div>
    )
};

export default PairsList;