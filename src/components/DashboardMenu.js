import '../styles/Dashboard.css';
import { Link } from 'react-router-dom';

const DashboardMenu = () => {
  return (
    <div className="DashboardMenu">
      <ul className="Menu">
        <li>
          <Link to="/post/new">Create Post</Link>
        </li>
        <li>
          <Link to="/Dashboard">Your Posts</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardMenu;
