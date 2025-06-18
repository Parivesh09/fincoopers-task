'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setTheme } from '@/lib/store';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.app.theme.mode);
  const [mounted, setMounted] = useState(false);

  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme: 'light' | 'dark') => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
    }
  };

  const setThemeMode = (theme: 'light' | 'dark') => {
    dispatch(setTheme(theme));
    applyTheme(theme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  };

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
  };

  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
      applyTheme(savedTheme);
    } else {
      dispatch(setTheme('light'));
      applyTheme('light');
    }
  }, [dispatch]);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const systemTheme = getSystemTheme();
      if (!localStorage.getItem('theme')) {
        dispatch(setTheme(systemTheme));
        applyTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted, dispatch]);

  useEffect(() => {
    if (mounted) {
      applyTheme(themeMode);
    }
  }, [themeMode, mounted]);

  return {
    theme: themeMode,
    setTheme: setThemeMode,
    toggleTheme,
    mounted,
    isDark: themeMode === 'dark',
    isLight: themeMode === 'light',
  };
} 
