import { useState } from 'react';
import '../styles/SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    /// implement dotenv api url !!!
    fetch('http://localhost:3000/user/sign-up', {
      method: 'POST',
      body: JSON.stringify({
        name,
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
          setErrors([]);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create</button>
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

export default SignUp;
