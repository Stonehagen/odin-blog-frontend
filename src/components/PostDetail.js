import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../styles/PostDetail.css';

const PostDetail = () => {
  const [post, setPost] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    /// implement dotenv api url !!!
    axios
      .get(`http://localhost:3000/post/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          return res.data.error;
        } else {
          setPost(res.data.post);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="PostDetail">
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <p>{post.timestamp}</p>
    </div>
  );
};

export default PostDetail;
