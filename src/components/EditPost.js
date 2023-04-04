import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../styles/CreatePost.css';
import DashboardMenu from './DashboardMenu';

const EditPost = () => {
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    /// implement dotenv api url !!!
    axios
      .put(
        `http://localhost:3000/post/${id}`,
        {
          _id: id,
          title: title,
          text: text,
          published: post.published,
          author: post.author,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        }
      })
      .then(() => navigate(`/post/${id}`))
      .catch((err) => {
        if (err.response.data.error) {
          setErrors(err.response.data.error);
        } else {
          console.log(err);
        }
      });
  };

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
            published: res.data.post.published,
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
          setTitle(res.data.post.title);
          setText(res.data.post.text);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="CreatePost">
      <DashboardMenu />
      <form onSubmit={handleSubmit}>
        <h1>Edit Post</h1>
        <label htmlFor="tile">Title</label>
        <input
          name="title"
          value={title}
          id="title"
          placeholder="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="text">Text</label>
        <textarea
          name="text"
          value={text}
          id="text"
          placeholder="Your Story"
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Save</button>
        <div className="messages">
          {errors.map((error, index) => {
            return (
              <p className="errorMessage" key={index}>
                {error.msg}
              </p>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default EditPost;
