export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignedTo: User;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  assignedMembers: User[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  members: User[];
  projects: Project[];
}

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface AppState {
  projects: Project[];
  currentUser: User | null;
  theme: Theme;
  isLoading: boolean;
  error: string | null;
} 
