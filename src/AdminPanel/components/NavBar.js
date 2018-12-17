import React from 'react';
import {Menu, Icon} from 'antd';

import logo from '../../img/logo_go.svg';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const NavBar = () => {
    return (
        <div className='nav-bar'>
            <img src={logo} alt="logo"/>

            <Menu
                defaultSelectedKeys={['11']}
                // defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                // inlineCollapsed={true}
            >
                <Menu.Item key="11">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                </Menu.Item>
                <Menu.Item key="21">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                </Menu.Item>
                <Menu.Item key="31">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                </Menu.Item>

                <SubMenu key="sub1" title={<span><Icon type="yuque"/><span>Navigation One</span></span>}>
                    <MenuItemGroup key="g1" title="Item 1">
                        <Menu.Item key="1">Option 1</Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup key="g2" title="Item 2">
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
        </div>
    )
}

export default NavBar;