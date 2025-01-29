import React from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './Topbar.scss';

const { Header } = Layout;

const Topbar = () => {
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
    <div style={{ background: '#fff', padding: 0 }}>
      <Menu mode="horizontal" items={menuItems} />
    </div>
  );
};

export default Topbar;
