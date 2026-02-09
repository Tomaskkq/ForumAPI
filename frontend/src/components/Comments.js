import { useState, useEffect } from "react";
import API from "../api/api";
import CreateComment from "./CreateComment";

function Comments({ postId, username }) {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    API.get(`/api/posts/${postId}/comments/`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [postId]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const deleteComment = (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    API.delete(`/api/comments/${commentId}/`)
      .then(() => {
        setComments(comments.filter((c) => c.id !== commentId));
      })
      .catch((err) => console.error(err));
  };

  const startEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const saveEdit = (commentId) => {
    API.patch(`/api/comments/${commentId}/`, { content: editContent })
      .then((res) => {
        setComments(comments.map((c) => (c.id === commentId ? res.data : c)));
        setEditingCommentId(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h4>Comments</h4>
      <CreateComment postId={postId} onCommentCreated={addComment} />

      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((c) => (
          <div key={c.id}>
            {editingCommentId === c.id ? (
              <>
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button
                  onClick={() => saveEdit(c.id)}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingCommentId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p>{c.content}</p>
                <small>By: {c.author}</small>
                {c.author === username && (
                  <div>
                    <button
                      onClick={() => startEdit(c)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteComment(c.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;