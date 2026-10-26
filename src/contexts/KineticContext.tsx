'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Dispatch, MutableRefObject, ReactNode, SetStateAction } from 'react';
import type Lenis from 'lenis';
import type { PhysicsSettings, ScrollMetrics, ThemeId } from '../types/kinetic';

export const defaultSettings: PhysicsSettings = {
  stiffness: 220,
  damping: 22,
  aberration: 1,
  grid: 0.3,
  smoothness: 0.1,
};

interface KineticValue {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  settings: PhysicsSettings;
  settingsRef: MutableRefObject<PhysicsSettings>;
  updateSetting: <K extends keyof PhysicsSettings>(
    key: K,
    value: PhysicsSettings[K]
  ) => void;
  resetSettings: () => void;
  paletteOpen: boolean;
  setPaletteOpen: Dispatch<SetStateAction<boolean>>;
  metrics: MutableRefObject<ScrollMetrics>;
  lenisRef: MutableRefObject<Lenis | null>;
  scrollToId: (id: string) => void;
  reducedMotion: boolean;
}

const KineticContext = createContext<KineticValue | null>(null);

interface KineticProviderProps {
  initialTheme?: ThemeId;
  children: ReactNode;
}

export function KineticProvider({
  initialTheme = 'swiss',
  children,
}: KineticProviderProps) {
  const [theme, setThemeState] = useState<ThemeId>(initialTheme);
  const [settings, setSettings] = useState<PhysicsSettings>(() =>
    initialTheme === 'swiss' ? { ...defaultSettings, grid: 0.8 } : defaultSettings
  );
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);
  const metrics = useRef<ScrollMetrics>({
    scroll: 0,
    velocity: 0,
    progress: 0,
    limit: 1,
  });
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    if (t === 'swiss') setSettings((s) => ({ ...s, grid: Math.max(s.grid, 0.8) }));
  }, []);

  const updateSetting = useCallback(
    <K extends keyof PhysicsSettings>(key: K, value: PhysicsSettings[K]) =>
      setSettings((s) => ({ ...s, [key]: value })),
    []
  );

  const resetSettings = useCallback(() => setSettings(defaultSettings), []);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const value = useMemo<KineticValue>(
    () => ({
      theme,
      setTheme,
      settings,
      settingsRef,
      updateSetting,
      resetSettings,
      paletteOpen,
      setPaletteOpen,
      metrics,
      lenisRef,
      scrollToId,
      reducedMotion,
    }),
    [
      theme,
      setTheme,
      settings,
      updateSetting,
      resetSettings,
      paletteOpen,
      scrollToId,
      reducedMotion,
    ]
  );

  return <KineticContext.Provider value={value}>{children}</KineticContext.Provider>;
}

export function useKinetic() {
  const ctx = useContext(KineticContext);
  if (!ctx) throw new Error('useKinetic must be used inside KineticProvider');
  return ctx;
}
