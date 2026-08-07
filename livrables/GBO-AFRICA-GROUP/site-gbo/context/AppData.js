'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// This context only ever held UI state (theme, toast) even before the backend existed —
// leads/coaches now live server-side (see app/api/*) since they're real visitor data,
// not something to keep in the browser's localStorage.

const THEME_STORAGE_KEY = 'gbo_theme';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') setTheme(saved);
    } catch (e) {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3600);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch (e) {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = { theme, toggleTheme, toast, showToast };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData doit être utilisé à l'intérieur de AppDataProvider");
  return ctx;
}
