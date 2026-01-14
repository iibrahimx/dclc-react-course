import { useState } from "react";
import type { Comment, User } from "../types/comment";
import ReplyCard from "./ReplyCard";
import ScoreCounter from "./ScoreCounter";
import DeleteModal from "./DeleteModal";

type Props = {
  comment: Comment;
  currentUser: User;
};

const CommentCard = ({ comment, currentUser }: Props) => {
  const isOwner = comment.user.username === currentUser.username;

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-3">
        <img
          src={comment.user.image.png}
          alt={comment.user.username}
          className="w-8 h-8 rounded-full"
        />

        <span className="font-meedium text-gray-800">
          {comment.user.username}
        </span>

        {isOwner && (
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">
            you
          </span>
        )}

        <span className="text-sm text-gray-400">{comment.createdAt}</span>
      </div>

      {/* CONTENT */}
      {/* <p className="text-gray-600 mb-4">{comment.content}</p> */}
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full border rounded p-3 resize-none focus:outline-purple-600"
          rows={3}
        />
      ) : (
        <p className="text-gray-600">{comment.content}</p>
      )}

      {/* FOOTER & BUTTON BLOCKS */}
      <div className="flex items-center justify-between mt-4">
        <ScoreCounter score={comment.score} />

        {isOwner && isEditing ? (
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setEditedContent(comment.content);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-200 rounded font-medium hover:opacity-80 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // temporary (state lift comes next)
                comment.content = editedContent;
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded font-medium hover:opacity-80 cursor-pointer"
            >
              Save
            </button>
          </div>
        ) : isOwner ? (
          /* This replaces <OwnerButtons /> */
          <div className="flex gap-4">
            <button
              onClick={() => setShowDelete(true)}
              className="text-red-500 font-medium hover:opacity-70 cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="text-purple-600 font-medium hover:opacity-70 cursor-pointer"
            >
              Edit
            </button>
          </div>
        ) : (
          /* This replaces <ReplyButton /> */
          <button className="text-purple-600 font-medium hover:opacity-70 cursor-pointer">
            Reply
          </button>
        )}
      </div>

      {showDelete && (
        <DeleteModal
          onCancel={() => setShowDelete(false)}
          onConfirm={() => {
            // real delete comes in state lifting step
            setShowDelete(false);
          }}
        />
      )}

      {/* REPLIES */}
      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} currentUser={currentUser} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
