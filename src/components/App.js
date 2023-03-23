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

const App = () => {
  const [cookies] = useCookies(['jwt_token']);
  const token = cookies.jwt_token;
  if (token) {
    setAuthToken(token);
  }

  return (
    <BrowserRouter basename="/">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetail />} />  
        <Route path="/post/new" element={<CreatePost />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
