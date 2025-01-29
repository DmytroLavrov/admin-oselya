import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import Logo from './logo.svg';

import './Header.scss';

const Header = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__nav">
          <div className="logo">
            <img src={Logo} alt="logo-admin" />
          </div>
          <Button
            onClick={handleLogout}
            type="primary"
            icon={<LogoutOutlined />}
            className="header__btn"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
