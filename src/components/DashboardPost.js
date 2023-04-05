import '../styles/DashboardPost.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  const changePublish = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKENDSERVER}/post/${post._id}`,
        {
          _id: post._id,
          title: post.title,
          text: post.text,
          published: !post.published,
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
          console.log(res.data.error)
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="DashboardPost">
      <h4>{post.title}</h4>
      <div className="DashboardPostSub">
        <p>{formatTime(post.timestamp)}</p>
        <ul>
          {post.published ? (
            <li>
              <Link className="activate" onClick={changePublish}>Unpublish</Link>
            </li>
          ) : (
            <li>
              <Link className="deactivate" onClick={changePublish}>Publish</Link>
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
    </div>
  );
};

export default DashboardPost;
