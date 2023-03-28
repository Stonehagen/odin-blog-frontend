import axios from 'axios';
import { useState } from 'react';

import '../styles/CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    /// implement dotenv api url !!!
    axios
      .post(
        'http://localhost:3000/post/new',
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
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="CreatePost">
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
        <input
          name="text"
          value={text}
          id="text"
          placeholder="text"
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
