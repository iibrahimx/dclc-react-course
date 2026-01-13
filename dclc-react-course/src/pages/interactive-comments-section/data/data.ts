import type { Comment, User } from "../types/comment";

export const currentUser: User = {
  username: "juliusomo",
  image: {
    png: "/assets/image-juliusomo.png",
    webp: "/assets/image-juliusomo.webp",
  },
};

export const initialComments: Comment[] = [
  {
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible.",
    createdAt: "1 month ago",
    score: 12,
    user: {
      username: "amyrobson",
      image: {
        png: "/assets/image-amyrobson.png",
        webp: "/assets/image-amyrobson.webp",
      },
    },
    replies: [],
  },
];
