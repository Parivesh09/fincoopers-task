import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types";
import { GripVertical, AlignLeft, Calendar, Tag } from "lucide-react";

interface SortableTaskProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function SortableTask({ task, onEdit, onDelete }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: { type: "Task", task },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusBorderColor = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "border-gray-500"; 
      case "in-progress":
        return "border-blue-500";
      case "done":
        return "border-emerald-500";
      default:
        return "border-gray-300";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`w-full bg-background p-4 rounded-md shadow flex items-start space-x-3 transition-all duration-200 hover:shadow-lg  border border-t-4 ${getStatusBorderColor(
        task.status
      )}`}
    >
      <button {...listeners} className="cursor-grab p-1 -ml-2 -mt-1">
        <GripVertical className="h-5 w-5 text-gray-400" />
      </button>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">
          {task.title}
        </h4>
        <p className="text-sm text-foreground flex items-center mt-1">
          <AlignLeft className="h-4 w-4 mr-1 text-gray-500" />{" "}
          {task.description.substring(0, 50)}...
        </p>
        <div className="flex items-center text-xs text-foreground mt-2 space-x-3">
          <span className="flex items-center">
            {task.assignedTo.avatar ? (
              <img
                src={task.assignedTo.avatar}
                alt={task.assignedTo.initials}
                className="w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold ring-2 ring-background shadow-sm"
              />
            ) : (
              <div className="w-5 h-5 p-3 mr-0.5 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold ring-2 ring-background shadow-sm">
                {task.assignedTo.initials}
              </div>
            )}
            {task.assignedTo.name}
          </span>
          <span className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" /> {task.deadline}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              task.priority === "high"
                ? "bg-red-100 text-red-800"
                : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            <Tag className="h-3 w-3 inline-block mr-1" />{" "}
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
        <div className="mt-3 flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 
