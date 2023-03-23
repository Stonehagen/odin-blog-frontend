import '../styles/Home.css';
import HighlightPost from './HighlightPost';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    /// implement dotenv api url !!!
    axios
      .get(`http://localhost:3000/post/latest/10`, {
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
  }, []);

  return (
    <div className="Home">
      {posts.slice(0,3).map((post, index) => {
        return <HighlightPost key={index} post={post} />
      })}
    </div>
  );
};

export default Home;
