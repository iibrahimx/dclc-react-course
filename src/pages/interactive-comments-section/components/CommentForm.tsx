import React, { useState } from "react";
import type { User } from "../types/comment";

interface CommentFormProps {
  currentUser: User;
  onSubmit: (content: string) => void;
  initialValue?: string;
  isReply?: boolean;
  onCancel?: () => void;
  replyingTo?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  currentUser,
  onSubmit,
  initialValue = "",
  isReply = false,
  onCancel,
  replyingTo,
}) => {
  const [content, setContent] = useState(
    replyingTo ? `@${replyingTo} ${initialValue}` : initialValue
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (replyingTo && !value.startsWith(`@${replyingTo} `)) {
      setContent(`@${replyingTo} ${value.replace(`@${replyingTo} `, "")}`);
    } else {
      setContent(value);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="hidden md:block order-2 md:order-1">
          <img
            src={currentUser.image.png}
            alt={currentUser.username}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <textarea
          value={content}
          onChange={handleChange}
          placeholder={
            isReply ? `Reply to @${replyingTo}...` : "Add a comment..."
          }
          className="flex-1 border border-grey-100 rounded-lg p-4 text-grey-800 placeholder-grey-500 focus:outline-none focus:border-purple-600 resize-none min-h-25 md:min-h-24 order-1 md:order-2"
          rows={3}
        />
        <div className="flex justify-between items-center md:items-start order-3">
          <div className="md:hidden">
            <img
              src={currentUser.image.png}
              alt={currentUser.username}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 bg-grey-500 text-white rounded-lg font-medium hover:bg-grey-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-200 transition-colors cursor-pointer"
            >
              {isReply ? "REPLY" : initialValue ? "UPDATE" : "SEND"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
