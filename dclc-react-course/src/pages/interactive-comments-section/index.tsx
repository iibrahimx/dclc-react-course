import { useState } from "react";
import { initialComments } from "./data/data";
import type { Comment } from "./types/comment";
import CommentList from "./components/CommentList";

const InteractiveComments = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default InteractiveComments;
