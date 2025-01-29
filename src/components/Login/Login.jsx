import { useState } from 'react';

import { toast } from 'react-toastify';

import axios from 'axios';
import { backendUrl } from '../../App';

import './Login.scss';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(backendUrl + '/auth/admin', {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Admin Panel</h1>

        <form onSubmit={onSubmitHandler} className="login__form">
          <div className="login__form-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="login__form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="button-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
