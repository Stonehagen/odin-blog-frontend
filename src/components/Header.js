import '../styles/Header.css';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ user, logout }) => {
  const { pathname } = useLocation();
  return (
    <div className="Header">
      <h1>STONEHAGEN</h1>
      <ul className="Menu">
        <li className={pathname.toLowerCase() === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={pathname.toLowerCase() === '/posts' ? 'active' : ''}>
          <Link to="/posts">Posts</Link>
        </li>
        <li className={pathname.toLowerCase() === '/about' ? 'active' : ''}>
          <Link to="/about">About</Link>
        </li>
      </ul>
      {user ? (
        <ul className="SignMenu">
          <li className={pathname.toLowerCase() === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>
              Log Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="SignMenu">
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
