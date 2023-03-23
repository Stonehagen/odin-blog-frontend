import { useState } from 'react';
import '../styles/HighlightPost.css';
import { Link } from 'react-router-dom';

const HighlightPost = ({ post }) => {
  const [thisPost, setThisPost] = useState({
    id: post._id,
    title: post.title,
    text: post.text.substring(0, 150),
    timestamp: new Date(post.timestamp).toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  });

  return (
    <div className="HighlightPost">
      <img alt="" src={`../img/${thisPost.id}.jpg`} />
        <h3>{thisPost.title}</h3>
      <div>
        <p>{thisPost.text}...</p>
        <Link to={`/post/${thisPost._id}`}>Read More</Link>
      </div>
    </div>
  );
};

export default HighlightPost;
