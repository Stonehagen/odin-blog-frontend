import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'dotenv/config';
import '../styles/PostDetail.css';

const PostDetail = ({ user }) => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [errors, setErrors] = useState([]);
  const [owner, setOwner] = useState(false);

  const { id } = useParams();

  const getTime = (timestamp) => {
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
    return { time, date };
  };

  const deleteComment = (commentId) => {
    axios
      .delete(
        `${process.env.BACKENDSERVER}/comment/${commentId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.data.errors) {
          return res.data.errors;
        } else {
          setNewComment(commentId);
        }
      })
      .catch((err) => console.log(err));
  };

  const addComment = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.BACKENDSERVER}/comment/new`,
        {
          text: commentText,
          author: commentName ? commentName : 'Anonymous',
          post: id,
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
          setErrors(res.data.error);
        } else {
          setNewComment(res.data.comment);
          setCommentName('');
          setCommentText('');
        }
      })
      .catch((err) => {
        if (err.response.data.errors) {
          console.log(err.response.data.errors);
          setErrors(err.response.data.errors);
        }
      });
  };

  useEffect(() => {
    if (user) {
      if (user.id === post.author) {
        setOwner(true);
      }
    }
    axios
      .get(`${process.env.BACKENDSERVER}/post/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          return res.data.error;
        } else {
          const { time, date } = getTime(res.data.post.timestamp);
          setPost({
            id: res.data.post._id,
            title: res.data.post.title,
            text: res.data.post.text,
            author: res.data.post.author,
            time,
            date,
          });
        }
        return axios.get(`${process.env.BACKENDSERVER}/comment/post/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      })
      .then((res) => {
        if (res.data.error) {
          setErrors(res.data.error);
          return res.data.error;
        } else {
          setComments(res.data.comments);
        }
      })
      .catch((err) => console.log(err));
  }, [newComment]);

  return (
    <div className="PostDetail">
      <img alt="" src={`../img/${post.id}.jpg`} />
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <p className="PostDate">
        {post.date} - {post.time}
      </p>
      <div className="Comments">
        <h2>{`Comments (${comments.length})`}</h2>
        {comments.map((comment, index) => {
          const { time, date } = getTime(comment.timestamp);
          const newComment = {
            text: comment.text,
            author: comment.author,
            time,
            date,
          };
          return (
            <div className="Comment" key={index}>
              <p className="text">{newComment.text}</p>
              <p className="credentials">{newComment.author}</p>
              <p className="date">
                {`(${newComment.date} - ${newComment.time})`}
              </p>
              {owner ? (
                <button onClick={() => deleteComment(comment._id)}>
                  Delete
                </button>
              ) : null}
            </div>
          );
        })}
        <form onSubmit={addComment}>
          <h4 className="newComment">New Comment</h4>
          <label htmlFor="comment">Comment</label>
          <textarea
            name="comment"
            value={commentText}
            id="comment"
            placeholder="your comment ..."
            type="text"
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="commentGroup">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              value={commentName}
              id="name"
              placeholder="your name ..."
              type="text"
              onChange={(e) => setCommentName(e.target.value)}
            />
          </div>
          <button type="submit">Add Comment</button>
        </form>
        <div className="messages">
          {errors.map((error, index) => {
            return (
              <p className="errorMessage" key={index}>
                {error.msg}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
