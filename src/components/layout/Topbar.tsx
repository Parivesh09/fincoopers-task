'use client';

import { useAppSelector } from '@/lib/store';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TopbarProps {
  onMenuButtonClick: () => void;
}

export default function Topbar({ onMenuButtonClick }: TopbarProps) {
  const currentUser = useAppSelector((state) => state.app.currentUser);
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState('Dashboard');

  useEffect(() => {
    if (pathname.includes('/projects')) {
      if (pathname.includes('/projects/') && pathname.split('/').length > 3) {
        setPageTitle('Project Details');
      } else {
        setPageTitle('Projects');
      }
    } else if (pathname.includes('/teams')) {
      setPageTitle('Teams');
    } else if (pathname.includes('/settings')) {
      setPageTitle('Settings');
    } else {
      setPageTitle('Dashboard');
    }
  }, [pathname]);

  return (
    <header className="w-full bg-card border-b border-border shadow-sm p-4 flex items-center justify-between z-10">
      <button
        onClick={onMenuButtonClick}
        className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors duration-200"
      >
        <Menu className="h-6 w-6 text-foreground" />
      </button>
      <h1 className="p-2 text-2xl font-bold text-foreground text-left">{pageTitle}</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-accent transition-colors duration-200 relative">
          <Bell className="h-6 w-6 text-foreground" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
        </button>
        {currentUser && (
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">
              {currentUser.initials}
            </div>
            <span className="text-foreground font-medium hidden md:block">{currentUser.name}</span>
            <button className="p-1 rounded-lg hover:bg-accent transition-colors duration-200 hidden md:block">
              <ChevronDown className="h-5 w-5 text-foreground" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
} 
