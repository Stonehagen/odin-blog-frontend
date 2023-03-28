import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    /// implement dotenv api url !!!
    axios
      .post(
        'http://localhost:3000/user/sign-up',
        {
          name,
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
          console.log(res.data.error);
        } else {
          setErrors([]);
        }
      })
      .then(() => navigate('/login'))
      .catch((err) => {
        if (err.response.data.error) {
          setErrors(err.response.data.error);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="SignUp">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          value={name}
          id="name"
          placeholder="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
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
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          name="passwordConfirm"
          value={passwordCheck}
          id="passwordConfirm"
          placeholder="confirm password"
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <div className="messages">
          {errors.map((error, index) => {
            return (
              <p className="errorMessage" key={index}>
                - ! {error.msg}
              </p>
            );
          })}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default SignUp;
