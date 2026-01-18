import React from "react";
import type { Comment, User } from "../types/comment";
import CommentCard from "./CommentCard";

interface CommentListProps {
  comments: Comment[];
  currentUser: User;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  onReply: (commentId: number, content: string, replyingTo: string) => void;
  onUpdateScore: (id: number, type: "upvote" | "downvote") => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  currentUser,
  onUpdate,
  onDelete,
  onReply,
  onUpdateScore,
}) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onReply={onReply}
          onUpdateScore={onUpdateScore}
          level={0}
        />
      ))}
    </div>
  );
};

export default CommentList;

// import type { Comment, User } from "../types/comment";
// import CommentCard from "./CommentCard";

// type Props = {
//   comments: Comment[];
//   currentUser: User;
//   onUpdate: (id: number, content: string) => void;
//   onDelete: (id: number) => void;
// };

// const CommentList = ({ comments, currentUser, onUpdate, onDelete }: Props) => {
//   return (
//     <div className="space-y-6">
//       {comments.map((comment) => (
//         <CommentCard
//           key={comment.id}
//           comment={comment}
//           currentUser={currentUser}
//           onUpdate={onUpdate}
//           onDelete={onDelete}
//         />
//       ))}
//     </div>
//   );
// };

// export default CommentList;
