import type { Comment } from "../types/comment";

type Props = {
  comment: Comment;
};

const CommentCard = ({ comment }: Props) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p>{comment.content}</p>
      <span>By: {comment.user.username}</span>
    </div>
  );
};

export default CommentCard;
