'use client';

import { useAppSelector, useAppDispatch } from '@/lib/store';
import { logout } from '@/lib/store';
import { Bell, ChevronDown, Menu, LogOut, User, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TopbarProps {
  onMenuButtonClick: () => void;
}

export default function Topbar({ onMenuButtonClick }: TopbarProps) {
  const currentUser = useAppSelector((state) => state.app.currentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    router.push('/login');
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

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
          <div className="relative">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">
                {currentUser.initials}
              </div>
              <span className="text-foreground font-medium hidden md:block">{currentUser.name}</span>
              <button 
                onClick={handleUserMenuToggle}
                className="p-1 rounded-lg hover:bg-accent transition-colors duration-200 hidden md:block"
              >
                <ChevronDown className={`h-5 w-5 text-foreground transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                </div>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    router.push('/dashboard/settings');
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors duration-200"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    router.push('/dashboard/settings');
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors duration-200"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
                <div className="border-t border-border my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-destructive hover:bg-accent transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
} 
