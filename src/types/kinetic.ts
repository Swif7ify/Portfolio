export type ThemeId = 'swiss' | 'cyber' | 'liquid';

export interface PhysicsSettings {
  stiffness: number;
  damping: number;
  aberration: number;
  grid: number;
  smoothness: number;
}

export interface ScrollMetrics {
  scroll: number;
  velocity: number;
  progress: number;
  limit: number;
}

export interface Chapter {
  id: string;
  number: string;
  short: string;
  title: string;
  technique: string;
}
