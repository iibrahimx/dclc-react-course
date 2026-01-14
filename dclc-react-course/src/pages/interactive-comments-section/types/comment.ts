export type User = {
  username: string;
  image: {
    png: string;
    webp: string;
  };
};

export type Reply = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
  replies?: Reply[];
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[] | CommentItem[];
};

export type CommentItem = Comment | Reply;

export const isReply = (item: CommentItem): item is Reply => {
  return "replyingTo" in item;
};
