import Link from "next/link";
import { Project } from "@/types";
import { Folder, CircleCheck, CircleDashed, Loader } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "todo":
        return "text-warning";
      case "in-progress":
        return "text-info";
      case "done":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: Project["status"]) => {
    switch (status) {
      case "todo":
        return <CircleDashed className="h-4 w-4 mr-1" />;
      case "in-progress":
        return <Loader className="h-4 w-4 mr-1 animate-spin" />;
      case "done":
        return <CircleCheck className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <div className="bg-card border border-border rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col group hover:border-primary/50">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary mr-3 group-hover:bg-primary/20 transition-colors duration-200">
            <Folder className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">{project.title}</h3>
        </div>
        <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">{project.description}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <div
            className={`flex items-center text-sm font-medium ${getStatusColor(
              project.status
            )}`}
          >
            {getStatusIcon(project.status)}
            {project.status.charAt(0).toUpperCase() +
              project.status.slice(1).replace("-", " ")}
          </div>
          <div className="flex items-center -space-x-2 overflow-hidden">
            {project.assignedMembers.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold ring-2 ring-background shadow-sm"
                title={member.name}
              >
                {member.initials}
              </div>
            ))}
            {project.assignedMembers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold ring-2 ring-background shadow-sm">
                +{project.assignedMembers.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
