import { User } from "./User";

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  createdDate: string;
  edited: boolean;
  user: User;
}
