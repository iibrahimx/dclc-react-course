import { useState } from "react";
import type {
  Comment,
  Reply,
} from "../pages/interactive-comments-section/types/comment";
import {
  currentUser,
  initialComments,
} from "../pages/interactive-comments-section/data/data";

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // Add comment
  const addComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      content,
      createdAt: "Just now",
      score: 0,
      user: currentUser,
      replies: [],
    };
    setComments([...comments, newComment]);
  };

  // Update comment or reply
  const updateContent = (id: number, content: string) => {
    const updateRecursively = (
      items: (Comment | Reply)[]
    ): (Comment | Reply)[] => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, content };
        }

        // Check if it's a Comment with replies
        if ("replies" in item && item.replies) {
          return {
            ...item,
            replies: updateRecursively(item.replies),
          };
        }

        return item;
      });
    };

    setComments(updateRecursively(comments) as Comment[]);
  };

  // Delete comment or reply
  const deleteItem = (id: number) => {
    const deleteRecursively = (
      items: (Comment | Reply)[]
    ): (Comment | Reply)[] => {
      // Filter out the item with matching id
      const filtered = items.filter((item) => item.id !== id);

      // Recursively filter replies
      return filtered.map((item) => {
        if ("replies" in item && item.replies) {
          return {
            ...item,
            replies: deleteRecursively(item.replies),
          };
        }
        return item;
      });
    };

    setComments(deleteRecursively(comments) as Comment[]);
  };

  // Add reply to comment or another reply
  const addReply = (targetId: number, content: string, replyingTo: string) => {
    const addReplyRecursively = (
      items: (Comment | Reply)[],
      targetId: number
    ): (Comment | Reply)[] => {
      return items.map((item) => {
        if (item.id === targetId) {
          const newReply: Reply = {
            id: Date.now(),
            content: content.replace(`@${replyingTo} `, ""),
            createdAt: "Just now",
            score: 0,
            replyingTo,
            user: currentUser,
            replies: [],
          };

          const currentReplies = "replies" in item ? item.replies || [] : [];
          return {
            ...item,
            replies: [...currentReplies, newReply],
          };
        }

        if ("replies" in item && item.replies) {
          return {
            ...item,
            replies: addReplyRecursively(item.replies, targetId),
          };
        }

        return item;
      });
    };

    setComments(addReplyRecursively(comments, targetId) as Comment[]);
  };

  // Update score
  const updateScore = (id: number, type: "upvote" | "downvote") => {
    const updateScoreRecursively = (
      items: (Comment | Reply)[]
    ): (Comment | Reply)[] => {
      return items.map((item) => {
        if (item.id === id) {
          const newScore =
            type === "upvote" ? item.score + 1 : Math.max(0, item.score - 1);
          return { ...item, score: newScore };
        }

        if ("replies" in item && item.replies) {
          return {
            ...item,
            replies: updateScoreRecursively(item.replies),
          };
        }

        return item;
      });
    };

    setComments(updateScoreRecursively(comments) as Comment[]);
  };

  return {
    comments,
    currentUser,
    addComment,
    updateContent,
    deleteItem,
    addReply,
    updateScore,
  };
};
