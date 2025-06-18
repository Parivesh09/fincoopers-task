"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Folder,
  Users,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: Folder },
  { name: "Teams", href: "/dashboard/teams", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-background border-r border-border shadow-lg h-screen flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:shadow-md
      `}
    >
      <div className="p-6 border-b border-border">
        <div className="text-2xl font-bold text-foreground">ProjectFlow</div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={onClose}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                  pathname === link.href
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <link.icon className={`h-5 w-5 mr-3 transition-colors ${
                  pathname === link.href 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground group-hover:text-accent-foreground"
                }`} />
                <span className="font-medium">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">
              {isDark ? "Dark" : "Light"} Mode
        </span>
          </div>
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {isDark ? (
              <Sun className="h-4 w-4" />
          ) : (
              <Moon className="h-4 w-4" />
          )}
        </button>
        </div>
      </div>
    </aside>
  );
}
