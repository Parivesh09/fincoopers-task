'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { useAppSelector } from '@/lib/store';
import { Sun, Moon } from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme, isDark } = useTheme();
  const currentUser = useAppSelector((state) => state.app.currentUser);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-4xl font-bold text-foreground mb-8">Settings</h1>
      <div className="bg-card border border-border rounded-lg shadow p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {currentUser?.initials}
            </div>
            <div>
              <div className="text-lg font-medium text-foreground">{currentUser?.name}</div>
              <div className="text-muted-foreground text-sm">{currentUser?.email}</div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Theme</h2>
          <div className="flex items-center gap-4">
            <span className="text-foreground">{isDark ? 'Dark' : 'Light'} Mode</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Account</h2>
          <p className="text-muted-foreground text-sm">More account settings coming soon!</p>
        </div>
      </div>
    </div>
  );
} 
