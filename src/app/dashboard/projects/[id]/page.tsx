"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { updateProject } from "@/lib/store";
import { Project, Task, User } from "@/types";
import {
  Plus,
} from "lucide-react";
import { mockUsers } from "@/lib/data";
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskFormState, initialTaskFormState } from "@/types/task";
import { ProjectDetailsView } from "@/components/projects/ProjectDetailsView";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.app.projects);
  const currentProject = projects.find((p) => p.id === id);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskFormState | null>(null);
  const [taskForm, setTaskForm] = useState<TaskFormState>(initialTaskFormState);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!currentProject) {
      // Redirect or show error if project not found
      return;
    }
  }, [currentProject]);

  if (!currentProject) {
    return (
      <div className="text-center text-foreground">
        Project not found.
      </div>
    );
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    // currentProject is guaranteed to be defined here due to the early return above

    const assignedUser = mockUsers.find(
      (user) => user.id === taskForm.assignedTo
    );
    if (!assignedUser) {
      console.error("Assigned user not found");
      return;
    }

    const newTask: Task = {
      id: editingTask ? editingTask.id : String(Date.now()),
      title: taskForm.title,
      description: taskForm.description,
      status: taskForm.status,
      priority: taskForm.priority,
      assignedTo: assignedUser,
      deadline: taskForm.deadline,
      createdAt: editingTask?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let updatedTasks: Task[];
    if (editingTask) {
      updatedTasks = currentProject.tasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
    } else {
      updatedTasks = [...currentProject.tasks, newTask];
    }

    dispatch(
      updateProject({ id: currentProject.id, updates: { tasks: updatedTasks } })
    );
    setIsTaskModalOpen(false);
    setTaskForm(initialTaskFormState);
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo.id,
      deadline: task.deadline,
      createdAt: task.createdAt,
    });
    setTaskForm({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo.id,
      deadline: task.deadline,
      createdAt: task.createdAt,
    });
    setIsTaskModalOpen(true);
  };

  const onDeleteTask = (taskId: string) => {
    // currentProject is guaranteed to be defined here
    const updatedTasks = currentProject.tasks.filter(
      (task) => task.id !== taskId
    );
    dispatch(
      updateProject({ id: currentProject.id, updates: { tasks: updatedTasks } })
    );
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    // currentProject is guaranteed to be defined here
    const { active, over } = event;
    if (!over) return;

    const activeTask = active.data.current?.task;
    if (!activeTask) return; // Ensure activeTask is defined

    let newStatus = activeTask.status; // Default to current status

    if (over.data.current?.type === "Task") {
      newStatus = over.data.current.task.status;
    } else if (over.id) {
      newStatus = over.id as Task["status"];
    }

    if (activeTask.status === newStatus) {
      const tasksInColumn = currentProject.tasks.filter(
        (task) => task.status === activeTask.status
      );
      const oldIndex = tasksInColumn.findIndex(
        (task) => task.id === activeTask.id
      );
      const newIndex = tasksInColumn.findIndex(
        (task) => task.id === String(over.id)
      );

      if (oldIndex === -1 || newIndex === -1) return;

      const reorderedTasksInColumn = arrayMove(
        tasksInColumn,
        oldIndex,
        newIndex
      );

      const updatedAllTasks = currentProject.tasks.map((task) => {
        if (task.status === activeTask.status) {
          const reorderedTask = reorderedTasksInColumn.shift();
          return reorderedTask || task;
        }
        return task;
      });
      dispatch(
        updateProject({
          id: currentProject.id,
          updates: { tasks: updatedAllTasks },
        })
      );
    } else {
      const updatedTasks = currentProject.tasks.map((task) =>
        task.id === activeTask.id ? { ...task, status: newStatus } : task
      );
      dispatch(
        updateProject({
          id: currentProject.id,
          updates: { tasks: updatedTasks },
        })
      );
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleProjectStatusChange = (newStatus: Project["status"]) => {
    // currentProject is guaranteed to be defined here
    dispatch(
      updateProject({
        id: currentProject.id,
        updates: { status: newStatus, updatedAt: new Date().toISOString() },
      })
    );
  };

  const tasksByStatus = {
    todo: currentProject.tasks.filter((task) => task.status === "todo"),
    "in-progress": currentProject.tasks.filter(
      (task) => task.status === "in-progress"
    ),
    done: currentProject.tasks.filter((task) => task.status === "done"),
  };

  const activeTask = activeId
    ? currentProject.tasks.find((task) => task.id === activeId) || null
    : null;

  return (
    <ProjectDetailsView
      currentProject={currentProject}
      tasksByStatus={tasksByStatus}
      activeTask={activeTask}
      isTaskModalOpen={isTaskModalOpen}
      taskForm={taskForm}
      mockUsers={mockUsers}
      editingTask={editingTask}
      sensors={sensors}
      onProjectStatusChange={handleProjectStatusChange}
      onAddTask={handleAddTask}
      onEditTask={handleEditTask}
      onDeleteTask={onDeleteTask}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      setIsTaskModalOpen={setIsTaskModalOpen}
      setTaskForm={setTaskForm}
      setEditingTask={setEditingTask}
    />
  );
}
