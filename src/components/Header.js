import '../styles/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="Header">
      <h1>STONEHAGEN</h1>
      <ul className='Menu'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">All Posts</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <ul className='SignMenu'>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
