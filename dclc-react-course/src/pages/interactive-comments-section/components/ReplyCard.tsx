import type { Reply } from "../types/comment";
import ScoreCounter from "./ScoreCounter";

type Props = {
  reply: Reply;
};

const ReplyCard = ({ reply }: Props) => {
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
        <span className="text-sm text-gray-400">{reply.createdAt}</span>
      </div>

      {/* CONTENT */}
      <p className="text-gray-600 mb-4">
        <span className="text-purple-600 font-medium mr-1">
          @{reply.replyingTo}
        </span>
        {reply.content}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        <ScoreCounter score={reply.score} />

        <button className="text-purple-600 font-medium hover:opacity-70">
          Reply
        </button>
      </div>
    </div>
  );
};

export default ReplyCard;
