import type { Comment } from "../types/comment";
import ScoreCounter from "./ScoreCounter";

type Props = {
  comment: Comment;
};

const CommentCard = ({ comment }: Props) => {
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
        <span className="text-sm text-gray-400">{comment.createdAt}</span>
      </div>

      {/* CONTENT */}
      <p className="text-gray-600 mb-4">{comment.content}</p>

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        <ScoreCounter score={comment.score} />

        <button className="text-purple-600 font-medium hover:opacity-70 cursor-pointer">
          Reply
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
