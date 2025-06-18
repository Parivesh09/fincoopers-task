import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { Task } from "@/types";
import { SortableTask } from "./SortableTask";

interface TaskColumnProps {
  status: Task["status"];
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskColumn({
  status,
  title,
  tasks,
  onEditTask,
  onDeleteTask,
}: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id: status });
  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  return (
    <div
      ref={setNodeRef}
      className="bg-background p-4 rounded-lg shadow-inner flex flex-col min-h-[200px] border border-border overflow-hidden"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4 border-b pb-2 border-gray-200">
        {title} ({tasks.length})
      </h3>
      {tasks.length === 0 && (
        <p className="text-foreground text-sm italic">
          No tasks in this column.
        </p>
      )}
      <SortableContext items={taskIds}>
        <div className="space-y-3 flex-grow">
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
} 
