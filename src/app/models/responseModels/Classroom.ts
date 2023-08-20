import { Post } from "./Post";
import { User } from "./User";

export interface Classroom {
  id: number;
  creator: User;
  creatorId: number;
  name: string;
  posts: Post[];
  joinCode : string;
}

