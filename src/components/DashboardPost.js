import '../styles/DashboardPost.css';
import { Link } from 'react-router-dom';

const DashboardPost = ({ post }) => {
  const formatTime = (timestamp) => {
    const newTimestamp = new Date(timestamp);
    const time = `${newTimestamp.getHours()} : ${newTimestamp
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    const date = `${newTimestamp.getDate().toString().padStart(2, '0')}/${(
      newTimestamp.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${(newTimestamp.getYear() + 1900)
      .toString()
      .padStart(4, '0')}`;

    return `${date} - ${time}`;
  };

  return (
    <div className="DashboardPost">
      <h4>{post.title}</h4>
      <p>{formatTime(post.timestamp)}</p>
      <ul>
        {post.published ? (
          <li>
          <Link className="activate">Unpublish</Link>
          </li>
        ) : (
          <li>
          <Link className="deactivate">Publish</Link>
          </li>
        )}
        <li>
          <Link to={`/post/${post._id}/edit`}>Edit</Link>
        </li>
        <li>
          <Link to={`/post/${post._id}`}>Open</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardPost;
