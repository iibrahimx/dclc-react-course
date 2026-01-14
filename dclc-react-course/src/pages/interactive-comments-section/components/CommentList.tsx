import type { Comment } from "../types/comment";
import CommentCard from "./CommentCard";
import { currentUser } from "../data/data";

type Props = {
  comments: Comment[];
};

const CommentList = ({ comments }: Props) => {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default CommentList;
