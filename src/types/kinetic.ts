export type ThemeId = "cyber" | "swiss" | "liquid";

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

export interface ThemeDef {
  id: ThemeId;
  name: string;
  description: string;
  shaderA: [number, number, number];
  shaderB: [number, number, number];
  shaderBg: [number, number, number];
}

export type GalleryCardId = "tilt" | "switches" | "morph" | "field";
export type BentoCellId = "pills" | "scrubber" | "spotlight" | "flip";
export type MorphShape = "circle" | "star" | "squircle" | "blob";
