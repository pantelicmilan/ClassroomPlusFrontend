import { Classroom } from "./Classroom";
import { User } from "./User";

export interface ClassroomEnrollment {
  classroom: Classroom;
  classroomId: number;
  id: number;
  userId: number;
  user: User;
}
