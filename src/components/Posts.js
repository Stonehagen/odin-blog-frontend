import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from './Post';
import '../styles/Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/post`, {
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
    <div className="Posts">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
    </div>
  );
};

export default Posts;
