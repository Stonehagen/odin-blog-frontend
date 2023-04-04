import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../styles/PostDetail.css';

const PostDetail = () => {
  const [post, setPost] = useState([]);

  const { id } = useParams();

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
          const newTimestamp = new Date(res.data.post.timestamp);
          setPost({
            id: res.data.post._id,
            title: res.data.post.title,
            text: res.data.post.text,
            time: `${newTimestamp.getHours()} : ${newTimestamp
              .getMinutes()
              .toString()
              .padStart(2, '0')}`,
            date: `${newTimestamp.getDate().toString().padStart(2, '0')}/${(
              newTimestamp.getMonth() + 1
            )
              .toString()
              .padStart(2, '0')}/${(newTimestamp.getYear() + 1900)
              .toString()
              .padStart(4, '0')}`,
          });
        }
        return axios.get(`http://localhost:3000/comment/post/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      })
      .then((res) => {
        if (res.data.error) {
          return res.data.error;
        } else {
          console.log(res.data.comments)
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="PostDetail">
      <img alt="" src={`../img/${post.id}.jpg`} />
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <p className='PostDate'>
        {post.date} - {post.time}
      </p>
    </div>
  );
};

export default PostDetail;
