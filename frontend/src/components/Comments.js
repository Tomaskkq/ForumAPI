import { useState, useEffect } from "react";
import API from "../api/api";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.get(`/api/comments/?post=${postId}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [postId]);

  return (
    <div>
      <h4>Comments</h4>
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((c) => (
          <div key={c.id}>
            <p>{c.content}</p>
            <small>By: {c.author}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;