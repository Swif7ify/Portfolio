import type { BentoCellId, GalleryCardId, MorphShape } from "../types/kinetic";

export const galleryCards: {
  id: GalleryCardId;
  number: string;
  title: string;
  technique: string;
  description: string;
}[] = [
{
  id: "tilt",
  number: "01.1",
  title: "Holographic tilt",
  technique: "rotateX/Y · specular glare",
  description:
  "Pointer position is normalised to −1…1, fed through a spring into rotateX/rotateY, while a radial highlight and a foil layer track the same coordinates."
},
{
  id: "switches",
  number: "01.2",
  title: "Tactile switches",
  technique: "Web Audio synthesis",
  description:
  "No audio files. Every click is a 30ms noise burst through a band-pass filter plus a pitched sine thump, generated on the press."
},
{
  id: "morph",
  number: "01.3",
  title: "Morphing path loader",
  technique: "Polar SVG interpolation",
  description:
  "Each shape is a polar function sampled at 96 angles, and every sample is its own spring — any shape morphs into any other without path matching."
},
{
  id: "field",
  number: "01.4",
  title: "Magnetic dot field",
  technique: "Hooke's law · Canvas 2D",
  description:
  "Every dot is a damped spring anchored to its grid cell. The pointer is a repulsor with quadratic falloff. Stiffness follows the sandbox."
}];


export const bentoCells: {
  id: BentoCellId;
  title: string;
  technique: string;
  hint: string;
  className: string;
}[] = [
{
  id: "pills",
  title: "Rigid-body pill box",
  technique: "Matter.js · 2D collision",
  hint: "Drag a pill, shake the box, or scroll fast — the bodies feel it.",
  className: "h-[480px] md:col-span-5 md:row-span-2 md:h-auto"
},
{
  id: "scrubber",
  title: "Real-time data scrubber",
  technique: "Catmull-Rom · magnetic snap",
  hint: "Move across the chart. The reticle snaps to the nearest sample.",
  className: "h-[360px] md:col-span-7 md:h-auto"
},
{
  id: "spotlight",
  title: "Generative spotlight input",
  technique: "Conic border · particles",
  hint: "Type to emit particles from the caret, then generate.",
  className: "h-[380px] md:col-span-4 md:h-auto"
},
{
  id: "flip",
  title: "FLIP layout morph",
  technique: "First · Last · Invert · Play",
  hint: "Switch layouts, then open a swatch.",
  className: "h-[380px] md:col-span-3 md:h-auto"
}];


export const physicsPills = [
"Spring",
"FLIP",
"WebGL",
"Lerp",
"Raymarch",
"Hooke",
"clip-path",
"Variable font",
"rAF",
"Magnetic",
"GLSL",
"Parallax",
"Haptics",
"Bento",
"Damping"];


export const flipItems = [
{ id: "obsidian", name: "Obsidian", hex: "#0B0C0F", note: "Base surface. Carries almost every pixel in Cyber-Dark." },
{ id: "signal", name: "Signal", hex: "#C6FF3D", note: "Primary accent, reserved for live and active state." },
{ id: "phosphor", name: "Phosphor", hex: "#40E0FF", note: "Secondary accent for data, focus and telemetry." },
{ id: "ember", name: "Ember", hex: "#E4300C", note: "Swiss accent. Used for one thing per screen." },
{ id: "bone", name: "Bone", hex: "#EFEDE7", note: "Print-like paper surface for the brutalist grid." },
{ id: "iris", name: "Iris", hex: "#FF96E1", note: "Liquid Glass iridescence highlight." }];


export const telemetrySeries = [
{
  id: "session",
  label: "Session",
  unit: "fps",
  values: [58.2, 59.1, 60, 59.6, 57.8, 58.9, 60, 59.4, 56.1, 54.8, 57.3, 59.9, 60, 59.2, 58.4, 59.8, 60, 58.7, 55.9, 57.6, 59.1, 60, 59.5, 58.6]
},
{
  id: "stress",
  label: "Stress test",
  unit: "fps",
  values: [60, 57.2, 51.4, 44.8, 38.6, 41.2, 47.9, 52.3, 49.1, 36.4, 29.8, 33.5, 42.7, 50.6, 55.1, 48.3, 39.9, 35.2, 43.8, 51.7, 56.4, 58.9, 57.1, 59.3]
}];


export const toggleSwitches = [
{ id: "audio", label: "Audio feedback", detail: "Synthesised clicks" },
{ id: "latch", label: "Latching key", detail: "Key stays down" },
{ id: "deep", label: "Deep thump", detail: "Lower body pitch" }];


export const morphShapes: {id: MorphShape;label: string;}[] = [
{ id: "circle", label: "Circle" },
{ id: "star", label: "Star" },
{ id: "squircle", label: "Squircle" },
{ id: "blob", label: "Blob" }];


export const tunnelLayers = [
{ id: "bg", label: "Background", ratio: 0.15, baseZ: -2400 },
{ id: "far", label: "Far", ratio: 0.4, baseZ: -1700 },
{ id: "mid", label: "Mid", ratio: 0.7, baseZ: -1100 },
{ id: "near", label: "Near", ratio: 1.0, baseZ: -600 },
{ id: "fg", label: "Foreground", ratio: 1.4, baseZ: -200 }];


export const depthChips = [
{ label: "spring", value: "k 220 · c 22", x: -38, y: -24 },
{ label: "frame", value: "16.6 ms", x: 34, y: -28 },
{ label: "lerp", value: "0.10", x: -42, y: 18 },
{ label: "ζ ratio", value: "0.74", x: 38, y: 22 },
{ label: "layout", value: "FLIP", x: -8, y: -36 },
{ label: "mask", value: "polygon()", x: 6, y: 34 }];


export const manifestoLines = [
"Every pixel here is a decision.",
"Motion is spent, not sprinkled.",
"Springs, not béziers.",
"Measure first. Then invert.",
"Scroll is the timeline.",
"The interface is the exhibit."];


export const footerStack = ["WebGL / GLSL", "Matter.js", "Framer Motion", "Lenis", "Web Audio API", "Roboto Flex VF"];