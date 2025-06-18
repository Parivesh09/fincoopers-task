import React from "react";
import Modal from "@/components/ui/Modal";
import { TaskFormState } from "@/types/task";
import { Task, User } from "@/types";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  taskForm: TaskFormState;
  mockUsers: User[];
  editingTask: TaskFormState | null;
  onAddTask: (e: React.FormEvent) => void;
  setTaskForm: (form: TaskFormState) => void;
}

export function TaskFormModal({
  isOpen,
  onClose,
  title,
  taskForm,
  mockUsers,
  editingTask,
  onAddTask,
  setTaskForm,
}: TaskFormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={onAddTask} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-foreground"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-background text-foreground"
            value={taskForm.title}
            onChange={(e) =>
              setTaskForm({ ...taskForm, title: e.target.value })
            }
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-foreground"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-background text-foreground"
            value={taskForm.description}
            onChange={(e) =>
              setTaskForm({ ...taskForm, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-foreground"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-background text-foreground"
            value={taskForm.status}
            onChange={(e) =>
              setTaskForm({
                ...taskForm,
                status: e.target.value as Task["status"],
              })
            }
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-foreground"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-background text-foreground"
            value={taskForm.priority}
            onChange={(e) =>
              setTaskForm({
                ...taskForm,
                priority: e.target.value as Task["priority"],
              })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="assignedTo"
            className="block text-sm font-medium text-foreground"
          >
            Assigned To
          </label>
          <select
            id="assignedTo"
            name="assignedTo"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-background text-foreground"
            value={taskForm.assignedTo}
            onChange={(e) =>
              setTaskForm({ ...taskForm, assignedTo: e.target.value })
            }
          >
            {mockUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-foreground"
          >
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-background text-foreground"
            value={taskForm.deadline}
            onChange={(e) =>
              setTaskForm({ ...taskForm, deadline: e.target.value })
            }
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-foreground bg-muted rounded-md hover:bg-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {editingTask ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
