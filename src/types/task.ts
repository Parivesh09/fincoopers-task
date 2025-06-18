import { Task } from "./index";

export interface TaskFormState {
  id: string;
  title: string;
  description: string;
  status: Task["status"];
  priority: Task["priority"];
  assignedTo: string;
  deadline: string;
  createdAt?: string;
}

export const initialTaskFormState: TaskFormState = {
  id: "",
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  assignedTo: "",
  deadline: "",
}; 
