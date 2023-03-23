import '../styles/Post.css';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <div className="Post">
      <div className="PostImage">
        <img alt="" src={`../img/${post._id}.jpg`} />
      </div>
      <div className="PostText">
        <h2>{post.title}</h2>
        <p>{post.text.substring(0, 200)}... </p>
        <Link to={`/post/${post._id}`}>Read More</Link>
      </div>
    </div>
  );
};

export default Post;
