import { useState } from "react";
import type { Reply, User } from "../types/comment";
import ScoreCounter from "./ScoreCounter";

type Props = {
  reply: Reply;
  currentUser: User;
};

const ReplyCard = ({ reply, currentUser }: Props) => {
  const isOwner = reply.user.username === currentUser.username;

  // Add state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(reply.content);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm ml-8 border-l-2 border-gray-200">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-3">
        <img
          src={reply.user.image.png}
          alt={reply.user.username}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium text-gray-800">{reply.user.username}</span>

        {isOwner && (
          <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">
            you
          </span>
        )}

        <span className="text-sm text-gray-400">{reply.createdAt}</span>
      </div>

      {/* CONTENT */}
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full border rounded p-3 mb-4 resize-none focus:outline-purple-600"
          rows={3}
        />
      ) : (
        <p className="text-gray-600 mb-4">
          <span className="text-purple-600 font-medium mr-1">
            @{reply.replyingTo}
          </span>
          {reply.content}
        </p>
      )}

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        <ScoreCounter score={reply.score} />

        {isOwner && isEditing ? (
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setEditedContent(reply.content);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-200 rounded font-medium hover:opacity-80 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // temporary (state lift comes next)
                reply.content = editedContent;
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded font-medium hover:opacity-80 cursor-pointer"
            >
              Save
            </button>
          </div>
        ) : isOwner ? (
          <div className="flex gap-4">
            <button className="text-red-500 font-medium hover:opacity-70 cursor-pointer">
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
          <button className="text-purple-600 font-medium hover:opacity-70 cursor-pointer">
            Reply
          </button>
        )}
      </div>
    </div>
  );
};

export default ReplyCard;
