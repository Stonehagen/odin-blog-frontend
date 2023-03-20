import { useState } from 'react';
import { useCookies } from 'react-cookie';
import '../styles/LogIn.css';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const [cookies, setCookie] = useCookies(['jwt_token']);

  const saveJWTinCookie = (token, expires) => {
    const bearerToken = `Bearer ${token}`;
    setCookie('jwt_token', bearerToken, {
      maxAge: 60*24*60*60*1000,
      path: '/',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /// implement dotenv api url !!!
    fetch('http://localhost:3000/user/log-in', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setErrors(json.error);
        } else {
          console.log(json);
          saveJWTinCookie(json.token, json.expireIn);
        }
      })
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
