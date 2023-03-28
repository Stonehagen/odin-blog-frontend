import '../styles/Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardPost from './DashboardPost';

const Dashboard = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    /// implement dotenv api url !!!
    axios
      .get('http://localhost:3000/post/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          return res.data.error;
        } else {
          setPosts(res.data.posts);
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="Dashboard">
      <div className="DashboardMenu">
        <ul className="Menu">
          <li>
            <Link to="/post/new">Create Post</Link>
          </li>
          <li>
            <Link to="/Dashboard/posts">All Posts</Link>
          </li>
        </ul>
      </div>
      <div className="Editor">
        {posts.map((post, index) => {
          return <DashboardPost key={index} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
