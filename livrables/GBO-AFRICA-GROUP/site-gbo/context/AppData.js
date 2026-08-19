'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';

// This context only ever held UI state (toast) even before the backend existed —
// leads/coaches now live server-side (see app/api/*) since they're real visitor data,
// not something to keep in the browser's localStorage.

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3600);
  }, []);

  const value = { toast, showToast };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData doit être utilisé à l'intérieur de AppDataProvider");
  return ctx;
}
