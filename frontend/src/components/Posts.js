import { useState, useEffect } from "react";
import API from "../api/api";
import Comments from "./Comments";
import CreatePost from "./CreatePost";

function Posts({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/api/posts/")
      .then((res) => setPosts(res.data.reverse()))
      .catch((err) => console.error(err));
  }, []);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const deletePost = (postId) => {
      if (!window.confirm("Delete this post?")) return;

      API.delete(`/api/posts/${postId}/`)
        .then(() => {
          setPosts(posts.filter((p) => p.id !== postId));
        })
        .catch((err) => console.error(err));
    };

    const [editingPostId, setEditingPostId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    const startEdit = (post) => {
      setEditingPostId(post.id);
      setEditTitle(post.title);
      setEditContent(post.content);
    };

    const saveEdit = (postId) => {
      API.patch(`/api/posts/${postId}/`, {
        title: editTitle,
        content: editContent,
      })
        .then((res) => {
          setPosts(posts.map((p) => (p.id === postId ? res.data : p)));
          setEditingPostId(null);
        })
        .catch((err) => console.error(err));
    };

  return (
    <div>
    <CreatePost onPostCreated={addPost} />

      <hr />
      <h2>Forum Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            {editingPostId === post.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />

                <button onClick={() => saveEdit(post.id)}>Save</button>
                <button onClick={() => setEditingPostId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>By: {post.author}</small>
                {post.author === username && (
                  <>
                    <button onClick={() => startEdit(post)}>Edit</button>
                    <button onClick={() => deletePost(post.id)}>Delete</button>
                  </>
                )}
              </>
        )}
        <Comments postId={post.id} username={username} />
      </div>
    ))
    )}
    </div>
  );
}

export default Posts;