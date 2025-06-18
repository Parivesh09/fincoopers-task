'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setTheme } from '@/lib/store';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
  isDark: boolean;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.app.theme.mode);
  const [mounted, setMounted] = useState(false);

  const getSystemTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
    }
  };

  // Set theme
  const setThemeMode = (theme: Theme) => {
    dispatch(setTheme(theme));
    applyTheme(theme);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemTheme = getSystemTheme();
    
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
      applyTheme(savedTheme);
    } else {
      dispatch(setTheme(systemTheme));
      applyTheme(systemTheme);
    }
  }, [dispatch]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const systemTheme = getSystemTheme();
      // Only apply system theme if no theme is saved in localStorage
      if (!localStorage.getItem('theme')) {
        dispatch(setTheme(systemTheme));
        applyTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted, dispatch]);

  // Apply theme when themeMode changes
  useEffect(() => {
    if (mounted) {
      applyTheme(themeMode);
    }
  }, [themeMode, mounted]);

  const value = {
    theme: themeMode,
    setTheme: setThemeMode,
    toggleTheme,
    mounted,
    isDark: themeMode === 'dark',
    isLight: themeMode === 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 
