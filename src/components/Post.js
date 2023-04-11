import '../styles/Post.css';
import { Link, useNavigate } from 'react-router-dom';
import { loadImage } from '../methods/loadImage';

const Post = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="Post">
      <div className="PostImage">
        <img alt="" src={loadImage(post._id)} />
      </div>
      <div
        className="PostText"
        onClick={() => navigate(`/post/${post._id}`)}
      >
        <h2>{post.title}</h2>
        <p>{post.text.substring(0, 200)}... </p>
        <Link to={`/post/${post._id}`}>Read More</Link>
      </div>
    </div>
  );
};

export default Post;
