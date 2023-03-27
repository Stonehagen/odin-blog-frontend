import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { setAuthToken } from '../methods/setAuthToken';
import '../styles/LogIn.css';

const LogIn = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const [setCookie] = useCookies(['jwt_token']);

  const navigate = useNavigate();

  const saveJWTinCookie = (token) => {
    setCookie('jwt_token', token, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      path: '/',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /// implement dotenv api url !!!
    axios
      .post(
        'http://localhost:3000/user/log-in',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.data.error) {
          setErrors(res.data.error);
        } else {
          saveJWTinCookie(res.data.token);
          setAuthToken(res.data.token);
          login(res.data.user.email, res.data.user.name);
        }
      })
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  return (
    <div className="LogIn">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          value={email}
          id="email"
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          value={password}
          id="password"
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        <div className="messages">
          {errors.map((error, index) => {
            return (
              <p className="errorMessage" key={index}>
                {error.msg}
              </p>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default LogIn;
