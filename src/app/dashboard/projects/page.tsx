'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { addProject } from '@/lib/store';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import Modal from '@/components/ui/Modal';
import { Plus } from 'lucide-react';

export default function ProjectsPage() {
  const projects = useAppSelector((state) => state.app.projects);
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProjectTitle.trim() === '') return;

    const newProject: Project = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: newProjectTitle,
      description: newProjectDescription,
      status: 'todo',
      assignedMembers: [],
      tasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addProject(newProject));
    setNewProjectTitle('');
    setNewProjectDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Projects</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex cursor-pointer items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" /> Add New Project
        </button>
      </div>

      <div className="flex space-x-2 mb-6">
        {['all', 'todo', 'in-progress', 'done'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as 'all' | 'todo' | 'in-progress' | 'done')}
            className={`px-4 py-2 rounded-md transition-colors duration-200
              ${filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-component-background text-foreground hover:bg-component-hover-background'
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-foreground">No projects found for the selected filter.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Project">
        <form onSubmit={handleAddProject} className="space-y-4">
          <div>
            <label htmlFor="projectTitle" className="block text-sm font-medium text-foreground">Project Title</label>
            <input
              type="text"
              id="projectTitle"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-background text-foreground"
              required
            />
          </div>
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-foreground">Description</label>
            <textarea
              id="projectDescription"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-background text-foreground"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Project
          </button>
        </form>
      </Modal>
    </div>
  );
} 
