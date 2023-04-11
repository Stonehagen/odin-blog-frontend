import '../styles/HighlightPost.css';
import { Link } from 'react-router-dom';
import { loadImage } from '../methods/loadImage';
import { useNavigate } from 'react-router-dom';

const HighlightPost = ({ post }) => {
  const navigate = useNavigate();

  const thisPost = {
    id: post._id,
    title: post.title,
    text: post.text.substring(0, 150),
    timestamp: new Date(post.timestamp).toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  };

  return (
    <div className="HighlightPost">
      <img alt="" src={loadImage(thisPost.id)} />
      <div
        className="HighlightPostText"
        onClick={() => navigate(`/post/${thisPost.id}`)}
      >
        <h3>{thisPost.title}</h3>
        <p>{thisPost.text}...</p>
        <Link to={`/post/${thisPost.id}`}>Read More</Link>
      </div>
    </div>
  );
};

export default HighlightPost;
