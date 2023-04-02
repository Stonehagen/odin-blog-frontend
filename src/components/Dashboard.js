import '../styles/Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardPost from './DashboardPost';
import DashboardMenu from './DashboardMenu';

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
      <DashboardMenu />
      <div className="Editor">
        {posts.map((post, index) => {
          return <DashboardPost key={index} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
