import '../styles/Post.css';

const Post = ({ post }) => {

  return (
    <div className="Post">
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <p>{post.timestamp}</p>
    </div>
  );
};

export default Post;
