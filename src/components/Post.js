import '../styles/Post.css';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <div className="Post">
      <h2>{post.title}</h2>
      <p>{post.text.substring(0, 300)}... </p>
      <Link to={`/post/${post._id}`}>Read More</Link>
    </div>
  );
};

export default Post;
