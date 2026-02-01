import { useState, useEffect } from "react";
import API from "../api/api";
import Comments from "./Comments";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/api/posts/")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Forum Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>By: {post.author}</small>

            <Comments postId={post.id} />
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;