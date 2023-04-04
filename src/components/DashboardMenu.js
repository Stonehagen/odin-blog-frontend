import '../styles/Dashboard.css';
import { Link, useLocation } from 'react-router-dom';

const DashboardMenu = () => {
  const { pathname } = useLocation();
  return (
    <div className="DashboardMenu">
      <ul className="Menu">
        <li className={pathname.toLowerCase() === '/post/new' ? 'active' : ''}>
          <Link to="/post/new">Create Post</Link>
        </li>
        <li className={pathname.toLowerCase() === '/dashboard' ? 'active' : ''}>
          <Link to="/Dashboard">Your Posts</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardMenu;
