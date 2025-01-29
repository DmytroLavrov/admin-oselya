import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Layout } from 'antd';

import Header from '@layouts/Header/Header';
import Login from '@components/Login/Login';
import Topbar from '@components/Topbar/Topbar';
import Sidebar from '@components/Sidebar/Sidebar';
import Products from '@pages/Products/Products';
import Orders from '@pages/Orders/Orders';
import AddProduct from '@pages/AddProduct/AddProduct';

const { Content } = Layout;

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app">
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <Router>
          <Layout style={{ minHeight: '100vh', background: '#fff' }}>
            <Header setToken={setToken} />
            <Layout>
              {isMobile ? <Topbar /> : <Sidebar />}
              <Layout style={{ padding: '0 24px 24px', background: '#fff' }}>
                <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
                  <Routes>
                    <Route
                      path="/add-product"
                      element={<AddProduct token={token} />}
                    />
                    <Route
                      path="/products"
                      element={<Products token={token} />}
                    />
                    <Route path="/orders" element={<Orders token={token} />} />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Router>
      )}
    </div>
  );
};

export default App;
