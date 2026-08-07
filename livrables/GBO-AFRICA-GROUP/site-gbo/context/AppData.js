'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { STATUSES, seedCoaches, seedLeads } from '../data/seed.js';

const STORAGE_KEY = 'gbo_platform_v1';

const AppDataContext = createContext(null);

function today() {
  const d = new Date();
  return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
}

export { today, STATUSES };

export function AppDataProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [leads, setLeads] = useState(() => seedLeads());
  const [coaches] = useState(() => seedCoaches());
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const hydrated = useRef(false);

  useEffect(() => {
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
      saved = {};
    }
    if (saved.leads) setLeads(saved.leads);
    if (saved.theme) setTheme(saved.theme);
    hydrated.current = true;
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const persist = useCallback((extra) => {
    if (!hydrated.current) return;
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...extra }));
    } catch (e) {
      /* ignore */
    }
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3600);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      persist({ theme: next });
      return next;
    });
  }, [persist]);

  const addLead = useCallback(
    (lead) => {
      setLeads((prev) => {
        const next = [lead, ...prev];
        persist({ leads: next });
        return next;
      });
    },
    [persist]
  );

  const advanceStatus = useCallback(
    (id, dir) => {
      setLeads((prev) => {
        const next = prev.map((l) => {
          if (l.id !== id) return l;
          const i = STATUSES.indexOf(l.status);
          const ni = Math.max(0, Math.min(STATUSES.length - 1, i + dir));
          return { ...l, status: STATUSES[ni] };
        });
        persist({ leads: next });
        return next;
      });
    },
    [persist]
  );

  const assignCoach = useCallback(
    (id, coach) => {
      setLeads((prev) => {
        const next = prev.map((l) =>
          l.id === id
            ? { ...l, coach, status: ['Nouveau', 'À contacter', 'Qualifié'].includes(l.status) ? 'Coach attribué' : l.status }
            : l
        );
        persist({ leads: next });
        return next;
      });
      showToast('Coach attribué — notification client envoyée.');
    },
    [persist, showToast]
  );

  const countLeadsOfType = useCallback((type) => leads.filter((l) => l.type === type).length, [leads]);

  const nextLeadId = useCallback(
    (prefix, type, base) => prefix + '-' + (base + (type ? countLeadsOfType(type) : leads.length)),
    [countLeadsOfType, leads.length]
  );

  const value = {
    theme,
    toggleTheme,
    leads,
    coaches,
    addLead,
    advanceStatus,
    assignCoach,
    nextLeadId,
    toast,
    showToast,
    today,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData doit être utilisé à l\'intérieur de AppDataProvider');
  return ctx;
}
