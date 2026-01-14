import React from "react";
import { useComments } from "../../hooks/useComments";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";

const InteractiveComments: React.FC = () => {
  const {
    comments,
    currentUser,
    addComment,
    updateContent,
    deleteItem,
    addReply,
    updateScore,
  } = useComments();

  return (
    <div className="min-h-screen bg-grey-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-grey-800 mb-8">
          Interactive Comments Section
        </h1>

        <CommentList
          comments={comments}
          currentUser={currentUser}
          onUpdate={updateContent}
          onDelete={deleteItem}
          onReply={addReply}
          onUpdateScore={updateScore}
        />

        {/* Add Comment Form */}
        <CommentForm
          currentUser={currentUser}
          onSubmit={addComment}
          isReply={false}
        />
      </div>
    </div>
  );
};

export default InteractiveComments;
