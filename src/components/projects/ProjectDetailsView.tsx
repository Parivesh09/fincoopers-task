import React from "react";
import { Plus } from "lucide-react";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { TaskColumn } from "./TaskColumn";
import { SortableTask } from "./SortableTask";
import { TaskFormState } from "@/types/task";
import { Project, Task, User } from "@/types";
import { TaskFormModal } from "./TaskFormModal";

interface ProjectDetailsViewProps {
  currentProject: Project;
  tasksByStatus: { todo: Task[]; "in-progress": Task[]; done: Task[] };
  activeTask: Task | null;
  isTaskModalOpen: boolean;
  taskForm: TaskFormState;
  mockUsers: User[];
  editingTask: TaskFormState | null;
  sensors: any;
  onProjectStatusChange: (status: Project["status"]) => void;
  onAddTask: (e: React.FormEvent) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
  onDragCancel: () => void;
  setIsTaskModalOpen: (isOpen: boolean) => void;
  setTaskForm: (form: TaskFormState) => void;
  setEditingTask: (task: TaskFormState | null) => void;
}

export function ProjectDetailsView({
  currentProject,
  tasksByStatus,
  activeTask,
  isTaskModalOpen,
  taskForm,
  mockUsers,
  editingTask,
  sensors,
  onProjectStatusChange,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragEnd,
  onDragCancel,
  setIsTaskModalOpen,
  setTaskForm,
  setEditingTask,
}: ProjectDetailsViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">
          {currentProject.title}
        </h2>
        <div className="inline-flex items-center space-x-3">
          <label htmlFor="projectStatus" className="sr-only">
            Project Status
          </label>
          <select
            id="projectStatus"
            value={currentProject.status}
            onChange={(e) =>
              onProjectStatusChange(e.target.value as Project["status"])
            }
            className="inline-block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-background text-foreground"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            onClick={() => {
              setIsTaskModalOpen(true);
              setEditingTask(null);
              setTaskForm({ ...taskForm, id: String(Date.now()), title: "", description: "", assignedTo: mockUsers[0]?.id || "", deadline: "" });
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragCancel={onDragCancel}
          collisionDetection={closestCorners}
        >
          <TaskColumn
            status="todo"
            title="To Do"
            tasks={tasksByStatus.todo}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
          <TaskColumn
            status="in-progress"
            title="In Progress"
            tasks={tasksByStatus["in-progress"]}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
          <TaskColumn
            status="done"
            title="Done"
            tasks={tasksByStatus.done}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
          <DragOverlay>
            {activeTask ? (
              <SortableTask
                task={activeTask}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <TaskFormModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title={editingTask ? "Edit Task" : "Add New Task"}
        taskForm={taskForm}
        mockUsers={mockUsers}
        editingTask={editingTask}
        onAddTask={onAddTask}
        setTaskForm={setTaskForm}
      />
    </div>
  );
} 
