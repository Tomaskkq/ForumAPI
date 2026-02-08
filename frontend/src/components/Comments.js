import { useState, useEffect } from "react";
import API from "../api/api";
import CreateComment from "./CreateComment";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.get(`/api/comments/?post=${postId}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [postId]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div>
      <h4>Comments</h4>
      <div>
      <CreateComment
        postId={postId}
        onCommentCreated={addComment}
      />
    </div>
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