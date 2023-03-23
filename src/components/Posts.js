import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from './Post';
import Hero from '../img/hero.jpg';

import '../styles/Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    /// implement dotenv api url !!!
    axios
      .get('http://localhost:3000/post', {
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
      <div className='PostsList'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
