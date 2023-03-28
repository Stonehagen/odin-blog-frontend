import '../styles/Header.css';
import { Link } from 'react-router-dom';

const Header = ({ user, logout }) => {
  return (
    <div className="Header">
      <h1>STONEHAGEN</h1>
      <ul className="Menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      {user ? (
        <ul className="SignMenu">
          <li>
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
