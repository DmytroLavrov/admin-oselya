import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './Sidebar.scss';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '1',
      icon: <AppstoreAddOutlined />,
      label: <Link to="/add-product">Add Product</Link>,
    },
    {
      key: '2',
      icon: <AppstoreOutlined />,
      label: <Link to="/products">Products</Link>,
    },
    {
      key: '3',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/orders">Orders</Link>,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={200}
      style={{
        background: '#fff',
        borderRight: '1px solid rgba(5, 5, 5, 0.06)',
      }}
    >
      <Menu
        mode="inline"
        // defaultSelectedKeys={['1']}
        items={menuItems}
        style={{ borderRight: 'none' }}
      />
    </Sider>
  );
};

export default Sidebar;
