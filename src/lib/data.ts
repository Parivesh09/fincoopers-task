import { User, Project, Task, Team } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    initials: 'JD',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    initials: 'JS',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    initials: 'MJ',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    initials: 'SW',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@example.com',
    initials: 'DB',
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage',
    description: 'Create a modern and responsive homepage design',
    status: 'todo',
    priority: 'high',
    assignedTo: mockUsers[0],
    deadline: '2024-02-15',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Set up user authentication system',
    status: 'in-progress',
    priority: 'high',
    assignedTo: mockUsers[1],
    deadline: '2024-02-20',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
  },
  {
    id: 'task-3',
    title: 'Database Schema Design',
    description: 'Design and implement database schema',
    status: 'done',
    priority: 'medium',
    assignedTo: mockUsers[2],
    deadline: '2024-01-30',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-25',
  },
  {
    id: '4',
    title: 'API Development',
    description: 'Develop RESTful APIs for the application',
    status: 'in-progress',
    priority: 'high',
    assignedTo: mockUsers[3],
    deadline: '2024-02-25',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-14',
  },
  {
    id: '5',
    title: 'Testing Implementation',
    description: 'Write unit and integration tests',
    status: 'todo',
    priority: 'medium',
    assignedTo: mockUsers[4],
    deadline: '2024-03-01',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
  },
  {
    id: '6',
    title: 'Deployment Setup',
    description: 'Configure CI/CD pipeline and deployment',
    status: 'todo',
    priority: 'low',
    assignedTo: mockUsers[0],
    deadline: '2024-03-10',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform with advanced features',
    status: 'in-progress',
    assignedMembers: [mockUsers[0], mockUsers[1], mockUsers[2]],
    tasks: [mockTasks[0], mockTasks[1], mockTasks[2]],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile application for iOS and Android',
    status: 'todo',
    assignedMembers: [mockUsers[3], mockUsers[4]],
    tasks: [mockTasks[3], mockTasks[4]],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-10',
  },
  {
    id: 'project-3',
    title: 'Dashboard Analytics',
    description: 'Analytics dashboard with real-time data visualization',
    status: 'done',
    assignedMembers: [mockUsers[0], mockUsers[2], mockUsers[4]],
    tasks: [mockTasks[5]],
    createdAt: '2023-12-15',
    updatedAt: '2024-01-20',
  },
  {
    id: '4',
    title: 'Content Management System',
    description: 'CMS for managing website content and media',
    status: 'in-progress',
    assignedMembers: [mockUsers[1], mockUsers[3]],
    tasks: [],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-12',
  },
  {
    id: '5',
    title: 'API Gateway',
    description: 'Centralized API gateway for microservices',
    status: 'todo',
    assignedMembers: [mockUsers[2], mockUsers[4]],
    tasks: [],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
];

export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Frontend Team',
    members: [mockUsers[0], mockUsers[1]],
    projects: [mockProjects[0], mockProjects[2]],
  },
  {
    id: 'team-2',
    name: 'Backend Team',
    members: [mockUsers[2], mockUsers[3]],
    projects: [mockProjects[1], mockProjects[3]],
  },
  {
    id: 'team-3',
    name: 'QA Team',
    members: [mockUsers[4]],
    projects: [mockProjects[4]],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id);
};

export const getTasksByProjectId = (projectId: string): Task[] => {
  const project = getProjectById(projectId);
  return project ? project.tasks : [];
};

export const getTasksByStatus = (status: 'todo' | 'in-progress' | 'done'): Task[] => {
  return mockTasks.filter(task => task.status === status);
};

export const getDashboardStats = () => {
  const totalProjects = mockProjects.length;
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(task => task.status === 'done').length;
  const inProgressTasks = mockTasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = mockTasks.filter(task => task.status === 'todo').length;

  return {
    totalProjects,
    totalTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
  };
}; 
