import { exhibitImages } from "./exhibits";

export const beatTracks = [
{ id: "kick", label: "Kick" },
{ id: "snare", label: "Snare" },
{ id: "hat", label: "Hat" },
{ id: "bass", label: "Bass" }] as
const;

export const defaultPattern: boolean[][] = [
[0, 4, 8, 12, 14],
[4, 12],
[0, 2, 4, 6, 8, 10, 11, 12, 14],
[0, 3, 6, 10, 13]].
map((hits) => Array.from({ length: 16 }, (_, i) => hits.includes(i)));

export const moshShots = [
{ id: "knots", label: "Shot A — Knot ring" },
{ id: "towers", label: "Shot B — Tower field" },
{ id: "core", label: "Shot C — Wire core" }];


export const nativeSteps = [
{ title: "No JavaScript in the loop.", body: "These wipes run on animation-timeline: view(). The browser drives them off the main thread, so they stay smooth even when the page is busy.", image: exhibitImages.brutalist },
{ title: "Named timelines, shared scope.", body: "Each text block publishes a view-timeline name. A parent declares timeline-scope so the sticky frame can listen to siblings it isn't related to.", image: exhibitImages.neon },
{ title: "Ranges, not thresholds.", body: "animation-range: entry 0% contain 0% means the wipe starts as the block enters and finishes when it is fully in view — reversible, scrubbable, exact.", image: exhibitImages.fabric }];


export const nativeReveals = [exhibitImages.ceramic, exhibitImages.liquid, exhibitImages.torus];