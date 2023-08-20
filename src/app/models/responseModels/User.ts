import { Classroom } from "./Classroom";

export interface User {
  id: number;
  username: string;
  name: string;
  surname: string;
  profileImageUrl: string;
  classrooms: Classroom[];
  email: string;
}