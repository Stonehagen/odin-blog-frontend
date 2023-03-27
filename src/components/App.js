import { useCookies } from 'react-cookie';
import { setAuthToken } from '../methods/setAuthToken';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '../styles/App.css';

import LogIn from './LogIn';
import SignUp from './SignUp';
import CreatePost from './CreatePost';
import Posts from './Posts';
import PostDetail from './PostDetail';
import Home from './Home';
import Header from './Header';
import About from './About';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState();
  const [cookies, removeCookie] = useCookies(['jwt_token']);
  const token =
    cookies.jwt_token === 'undefined' ? undefined : cookies.jwt_token;
  if (token) {
    setAuthToken(token);
  }

  const login = (email, name) => {
    setUser({
      email,
      name,
    });
  }

  const logout = () => {
    setUser();
    setAuthToken();
    removeCookie('jwt_token');
  };

  useEffect(() => {
    /// implement dotenv api url !!!
    if (!user && token) {
      axios
        .get('http://localhost:3000/session', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          if (res.data.error) {
            return res.data.error;
          } else {
            setUser({
              email: res.data.email,
              name: res.data.name,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <BrowserRouter basename="/">
      <Header user={user} logout={logout} />
      <div className="Main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/new" element={<CreatePost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn login={login}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
