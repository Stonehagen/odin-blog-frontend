import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'dotenv/config';

import DashboardPost from './DashboardPost';
import DashboardMenu from './DashboardMenu';

const Dashboard = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    axios
      .get(`${process.env.BACKENDSERVER}/post/all`, {
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
