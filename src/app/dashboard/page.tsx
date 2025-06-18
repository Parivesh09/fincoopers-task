"use client";

import { useAppSelector } from "@/lib/store";
import { getDashboardStats } from "@/lib/data";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Folder, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Theme } from "@/types";
import { getComputedHSL } from "../utils";

export default function DashboardPage() {
  const projects = useAppSelector((state) => state.app.projects);
  const [stats, setStats] = useState(getDashboardStats());

  useEffect(() => {
    setStats(getDashboardStats());
  }, [projects]);


  const projectStatusData = [
    { name: "To Do", value: stats.todoTasks, color: "hsl(var(--warning))" },
    {
      name: "In Progress",
      value: stats.inProgressTasks,
      color: "hsl(var(--info))",
    },
    { name: "Done", value: stats.completedTasks, color: "hsl(var(--success))" },
  ];

  const COLORS = [
    "hsl(var(--warning))",
    "hsl(var(--info))",
    "hsl(var(--success))",
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Projects"
          value={stats.totalProjects}
          icon={<Folder className="h-6 w-6" />}
          variant="primary"
        />
        <Card
          title="Total Tasks"
          value={stats.totalTasks}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <Card
          title="Completed Tasks"
          value={stats.completedTasks}
          icon={<CheckCircle className="h-6 w-6" />}
          variant="success"
        />
        <Card
          title="Tasks In Progress"
          value={stats.inProgressTasks}
          icon={<Clock className="h-6 w-6" />}
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Tasks by Status (Bar Chart)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectStatusData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--accent))" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-lg)",
                }}
              />
              <Bar
                dataKey="value"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Tasks by Status (Pie Chart)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="hsl(var(--primary))"
                dataKey="value"
                stroke="hsl(var(--card))"
                strokeWidth={2}
              >
                {projectStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                cursor={{ fill: "hsl(var(--accent))" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-lg)",
                }}
              />
              <Legend
                wrapperStyle={{
                  color: "hsl(var(--foreground))",
                  fontSize: "14px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
