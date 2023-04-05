import '../styles/Home.css';
import HighlightPost from './HighlightPost';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../img/hero.jpg';

 
const Home = () => {
  const [posts, setPosts] = useState([]);

  console.log(`${process.env.REACT_APP_BACKENDSERVER}/post/latest/10`)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/post/latest/10`, {
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
      <div className="Hero">
        <h1>TRAVEL BLOG</h1>
        <img src={Hero} alt="Ireland Landscape" />
      </div>
      <div className="HighlightContainer">
        {posts.slice(0, 3).map((post, index) => {
          return <HighlightPost key={index} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Home;
