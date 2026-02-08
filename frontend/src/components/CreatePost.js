import { useState } from "react";
import API from "../api/api";

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/api/posts/", {
      title,
      content,
    })
      .then((res) => {
        setTitle("");
        setContent("");
        onPostCreated(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Post</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePost;