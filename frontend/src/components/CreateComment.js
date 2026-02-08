import { useState } from "react";
import API from "../api/api";

function CreateComment({ postId, onCommentCreated }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post(`/api/posts/${postId}/comments/`, { content })
      .then((res) => {
        setContent("");
        onCommentCreated(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">Comment</button>
    </form>
  );
}

export default CreateComment;