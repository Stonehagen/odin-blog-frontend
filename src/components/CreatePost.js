import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'dotenv/config';
import '../styles/CreatePost.css';

import DashboardMenu from './DashboardMenu';

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.BACKENDSERVER}/post/new`,
        {
          title,
          text,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.data.error) {
          setErrors(res.data.error);
        } else {
          navigate(`/dashboard`);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return (
    <div className="CreatePost">
      <DashboardMenu />
      <form onSubmit={handleSubmit}>
        <h1>Create New Post</h1>
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
        <button type="submit">Create</button>
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

export default CreatePost;
