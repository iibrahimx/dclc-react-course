import React, { useState } from "react";
import type { Comment, Reply, User } from "../types/comment";
import ReplyCard from "./ReplyCard";
import ScoreCounter from "./ScoreCounter";
import DeleteModal from "./DeleteModal";
import CommentForm from "./CommentForm";
import replyIcon from "../assets/icon-reply.svg";
import editIcon from "../assets/icon-reply.svg";
import deleteIcon from "../assets/icon-delete.svg";

interface CommentCardProps {
  comment: Comment;
  currentUser: User;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  onReply: (commentId: number, content: string, replyingTo: string) => void;
  onUpdateScore: (id: number, type: "upvote" | "downvote") => void;
  level?: number;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  currentUser,
  onUpdate,
  onDelete,
  onReply,
  onUpdateScore,
  level = 0,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isOwner = comment.user.username === currentUser.username;

  const handleReplySubmit = (content: string) => {
    onReply(comment.id, content, comment.user.username);
    setIsReplying(false);
  };

  const handleUpdateSubmit = (content: string) => {
    onUpdate(comment.id, content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
    setShowDeleteModal(false);
  };

  const handleUpvote = () => onUpdateScore(comment.id, "upvote");
  const handleDownvote = () => onUpdateScore(comment.id, "downvote");

  return (
    <>
      <div
        className={`bg-white rounded-lg p-4 mb-4 ${
          level > 0 ? "ml-0 md:ml-12" : ""
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Score Counter - Desktop */}
          <div className="hidden md:block">
            <ScoreCounter
              score={comment.score}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
              isVertical={true}
            />
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={comment.user.image.png}
                  alt={comment.user.username}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-bold text-grey-800">
                  {comment.user.username}
                </span>
                {isOwner && (
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    you
                  </span>
                )}
                <span className="text-grey-500">{comment.createdAt}</span>
              </div>

              {/* Action Buttons - Desktop */}
              <div className="hidden md:flex items-center gap-4">
                {isOwner ? (
                  <>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="flex items-center gap-2 text-pink-400 hover:text-pink-200 font-medium cursor-pointer"
                    >
                      <img
                        src={deleteIcon}
                        alt="Delete"
                        className="w-3 h-3 cursor-pointer"
                      />
                      Delete
                    </button>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-200 font-medium cursor-pointer"
                    >
                      <img
                        src={editIcon}
                        alt="Edit"
                        className="w-3 h-3 cursor-pointer"
                      />
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsReplying(true)}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-200 font-medium cursor-pointer"
                  >
                    <img
                      src={replyIcon}
                      alt="Reply"
                      className="w-3 h-3 cursor-pointer"
                    />
                    Reply
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            {isEditing ? (
              <CommentForm
                currentUser={currentUser}
                onSubmit={handleUpdateSubmit}
                initialValue={comment.content}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <p className="text-grey-500 mb-4">{comment.content}</p>
            )}

            {/* Footer - Mobile */}
            <div className="flex items-center justify-between md:hidden">
              <ScoreCounter
                score={comment.score}
                onUpvote={handleUpvote}
                onDownvote={handleDownvote}
                isVertical={false}
              />
              <div>
                {isOwner ? (
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="flex items-center gap-2 text-pink-400 hover:text-pink-200 font-medium cursor-pointer"
                    >
                      <img
                        src={deleteIcon}
                        alt="Delete"
                        className="w-3 h-3 cursor-pointer"
                      />
                      Delete
                    </button>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-200 font-medium cursor-pointer"
                    >
                      <img
                        src={editIcon}
                        alt="Edit"
                        className="w-3 h-3 cursor-pointer"
                      />
                      Edit
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsReplying(true)}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-200 font-medium cursor-pointer"
                  >
                    <img
                      src={replyIcon}
                      alt="Reply"
                      className="w-3 h-3 cursor-pointer"
                    />
                    Reply
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reply Form */}
        {isReplying && !isOwner && (
          <div className="mt-4 ml-0 md:ml-12">
            <CommentForm
              currentUser={currentUser}
              onSubmit={handleReplySubmit}
              isReply={true}
              replyingTo={comment.user.username}
              onCancel={() => setIsReplying(false)}
            />
          </div>
        )}
      </div>

      {/* Replies with connecting line */}
      {comment.replies && comment.replies.length > 0 && (
        <div
          className={`relative ${
            level > 0 ? "ml-0 md:ml-12" : "ml-0 md:ml-12"
          }`}
        >
          {/* Vertical line */}
          <div className="absolute left-0 md:-left-6 top-0 bottom-0 w-0.5 bg-grey-100"></div>
          <div className="space-y-4">
            {comment.replies.map((reply) => (
              <ReplyCard
                key={reply.id}
                reply={reply as Reply}
                currentUser={currentUser}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onReply={onReply}
                onUpdateScore={onUpdateScore}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default CommentCard;
