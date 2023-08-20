import { Comment } from "./Comment";

export interface Post {
  id: number;
  name: string;
  description: string;
  comments: Comment[];
  createdDate: string;
}