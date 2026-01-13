import type { Comment } from "../types/comment";
import CommentCard from "./CommentCard";

type Props = {
  comments: Comment[];
};

const CommentList = ({ comments }: Props) => {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
