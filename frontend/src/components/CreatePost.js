import { useState } from "react";
import API from "../api/api";

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    API.post("/api/posts/", { title, content })
      .then((res) => {
        setTitle("");
        setContent("");

        onPostCreated(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to create post.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Post</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <br />

      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePost;