import type { Comment, User } from "../types/comment";
import amyrobsonPng from "../assets/image-amyrobson.png";
import amyrobsonWebp from "../assets/image-amyrobson.webp";
import juliusomoPng from "../assets/image-juliusomo.png";
import juliusomoWebp from "../assets/image-juliusomo.webp";

export const currentUser: User = {
  username: "juliusomo",
  image: {
    png: juliusomoPng,
    webp: juliusomoWebp,
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
        png: amyrobsonPng,
        webp: amyrobsonWebp,
      },
    },
    replies: [
      {
        id: 2,
        content: "I totally agree with you!",
        createdAt: "2 weeks ago",
        score: 5,
        replyingTo: "amyrobson",
        user: {
          username: "juliusomo",
          image: {
            png: juliusomoPng,
            webp: juliusomoWebp,
          },
        },
      },
    ],
  },
];
