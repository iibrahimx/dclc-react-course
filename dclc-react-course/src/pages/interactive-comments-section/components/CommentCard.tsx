import type { Comment, User } from "../types/comment";
import ReplyCard from "./ReplyCard";
import ScoreCounter from "./ScoreCounter";

type Props = {
  comment: Comment;
  currentUser: User;
};

const CommentCard = ({ comment, currentUser }: Props) => {
  const isOwner = comment.user.username === currentUser.username;

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
      <p className="text-gray-600 mb-4">{comment.content}</p>

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        <ScoreCounter score={comment.score} />

        {isOwner ? (
          <div className="flex gap-4">
            <button className="text-red-500 font-medium hover:opacity-70 cursor-pointer">
              Reply
            </button>
            <button className="text-purple-600 font-medium hover:opacity-70 cursor-pointer">
              Edit
            </button>
          </div>
        ) : (
          <button className="text-purple-600 font-medium hover:opacity-70 cursor-pointer">
            Reply
          </button>
        )}
      </div>
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
