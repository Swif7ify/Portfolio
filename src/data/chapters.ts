import type { Chapter } from "../types/kinetic";

export const chapters: Chapter[] = [
{
  id: "hero",
  number: "00",
  short: "Liquid",
  title: "Liquid Raymarching",
  technique: "WebGL SDF metaballs · variable font axes"
},
{
  id: "gallery",
  number: "01",
  short: "Pinned",
  title: "Pinned Scrollytelling",
  technique: "Scroll hijack · 3D tilt · Web Audio · SVG morph"
},
{
  id: "bento",
  number: "02",
  short: "Bento",
  title: "Micro-interaction Bento",
  technique: "Rigid bodies · FLIP · data scrubbing · particles"
},
{
  id: "tunnel",
  number: "03",
  short: "Depth",
  title: "Depth Tunnel",
  technique: "5-plane parallax · clip-path scrubbing"
},
{
  id: "particles",
  number: "04",
  short: "Particles",
  title: "GPU Particle Morph",
  technique: "Three.js points · shader-blended targets"
},
{
  id: "carousel",
  number: "05",
  short: "Cylinder",
  title: "3D Cylinder Carousel",
  technique: "preserve-3d ring · inertial drag"
},
{
  id: "stack",
  number: "06",
  short: "Stack",
  title: "Sticky Card Stack",
  technique: "Cumulative scale · depth dimming"
},
{
  id: "type",
  number: "07",
  short: "Type",
  title: "Kinetic Type & Trails",
  technique: "Velocity marquee · scramble · image trail"
},
{
  id: "reveal",
  number: "08",
  short: "Mask",
  title: "Mask Zoom-Through",
  technique: "SVG text mask · cubic scale"
},
{
  id: "distortion",
  number: "09",
  short: "Shader",
  title: "WebGL Image Distortion",
  technique: "DOM-synced planes · ripple · RGB split"
},
{
  id: "ripple",
  number: "10",
  short: "Water",
  title: "Heightfield Water",
  technique: "2D wave equation · refraction"
},
{
  id: "infinite",
  number: "11",
  short: "Infinite",
  title: "Infinite Canvas",
  technique: "Modulo wrapping · lens scale · inertia"
},
{
  id: "liquid",
  number: "12",
  short: "Reveal",
  title: "Liquid Cursor Reveal",
  technique: "Decaying mask · inset collapse · signature stroke"
},
{
  id: "planet",
  number: "13",
  short: "Planet",
  title: "Drivable Tiny Planet",
  technique: "Three.js · quaternion world rotation"
},
{
  id: "comic",
  number: "14",
  short: "Comic",
  title: "Comic Panel Camera",
  technique: "Guided-view camera · keyframed rects"
},
{
  id: "specimen",
  number: "15",
  short: "Type",
  title: "Proximity Variable Type",
  technique: "Distance-driven font axes · type tester"
},
{
  id: "transitions",
  number: "16",
  short: "Transitions",
  title: "Page Transition Lab",
  technique: "Pixelated · repeating frames · mask · shared element"
},
{
  id: "elastic",
  number: "17",
  short: "Elastic",
  title: "Elastic Grid Scroll",
  technique: "Per-column lag by distance"
},
{
  id: "puzzle",
  number: "18",
  short: "Preview",
  title: "Product Grid Preview",
  technique: "Clip-path overlay · puzzle shift"
},
{
  id: "intro",
  number: "19",
  short: "Intro",
  title: "Preloader & Split Text",
  technique: "Counter · curtains · masked chars"
},
{
  id: "menu",
  number: "20",
  short: "Menu",
  title: "Navigation Takeover",
  technique: "Circle clip-path · rolling text · cursor preview"
},
{
  id: "ascii",
  number: "21",
  short: "ASCII",
  title: "ASCII & Dither Renderer",
  technique: "Two-pass render · procedural glyphs · Bayer · CRT"
},
{
  id: "voxel",
  number: "22",
  short: "Voxels",
  title: "Instanced Voxel Word",
  technique: "3,960 instances · canvas-sampled heights"
},
{
  id: "glass",
  number: "23",
  short: "Glass",
  title: "Refractive Glass Cells",
  technique: "Hex lenses · sine field · click ripple"
},
{
  id: "flight",
  number: "24",
  short: "Flight",
  title: "Cinematic Scroll Flight",
  technique: "Spline camera · fog · emissive wayfinding"
},
{
  id: "beat",
  number: "25",
  short: "Beat",
  title: "Audio-Reactive Sequencer",
  technique: "Lookahead scheduling · analyser visuals"
},
{
  id: "datamosh",
  number: "26",
  short: "Mosh",
  title: "Datamosh Transition",
  technique: "Feedback buffer · keyframe suppression"
},
{
  id: "native",
  number: "27",
  short: "Native",
  title: "Native Scroll-Driven CSS",
  technique: "animation-timeline · view ranges · fallback"
},
{
  id: "island",
  number: "28",
  short: "Island",
  title: "Dynamic Island",
  technique: "Shape state machine · crossfade · Escape steps back"
},
{
  id: "tray",
  number: "29",
  short: "Tray",
  title: "Dynamic Tray Flow",
  technique: "Auto-height steps · directional slides · text morph"
},
{
  id: "toasts",
  number: "30",
  short: "Toasts",
  title: "Toast System",
  technique: "Depth stack · swipe dismiss · promise · Undo"
},
{
  id: "drawer",
  number: "31",
  short: "Sheet",
  title: "Gesture Sheet",
  technique: "Momentum · damping · background scale"
},
{
  id: "details",
  number: "32",
  short: "Details",
  title: "Invisible Details",
  technique: "Tabs · hold · loading · OTP · tooltips"
},
{
  id: "work",
  number: "33",
  short: "Work",
  title: "Work Index & Case Transition",
  technique: "Cursor preview · clip swaps · cover expansion"
},
{
  id: "zoomout",
  number: "34",
  short: "Zoom",
  title: "Zoom-Out Grid Reveal",
  technique: "Hero-to-tile scale · distance stagger"
},
{
  id: "statement",
  number: "35",
  short: "Statement",
  title: "Inline Image Statement",
  technique: "Images inside type · reflow on scroll"
},
{
  id: "fan",
  number: "36",
  short: "Deal",
  title: "Card Deal Into Grid",
  technique: "Fan pose → measured slots"
},
{
  id: "panels",
  number: "37",
  short: "Panels",
  title: "Expanding Service Panels",
  technique: "Spring flex · vertical spines"
},
{ id: "about", number: "39", short: "About", title: "About, by Torchlight", technique: "Cursor flashlight mask · hidden notes" },
{ id: "numbers", number: "40", short: "Numbers", title: "Odometer Stats", technique: "Rolling digit columns · spring spins" },
{ id: "skills", number: "41", short: "Skills", title: "Skill Globe", technique: "Projected Fibonacci sphere · filters" },
{ id: "process", number: "42", short: "Process", title: "Scroll-Drawn Process", technique: "SVG path draw · lit milestones" },
{ id: "clients", number: "43", short: "Clients", title: "Split-Flap Clients", technique: "Four-leaf flaps · charset stepping" },
{ id: "testimonials", number: "44", short: "Words", title: "Testimonial Deck", technique: "Throwable cards · tuck under" },
{ id: "compare", number: "45", short: "Compare", title: "Wireframe → Shipped", technique: "Sprung clip-path divider" },
{ id: "lookbook", number: "46", short: "Lookbook", title: "Page-Flip Lookbook", technique: "3D leaves · scroll page turns" },
{ id: "blinds", number: "47", short: "Blinds", title: "Blinds & Shutter Transitions", technique: "Sliced clip-paths · 3 patterns" },
{ id: "contact", number: "48", short: "Contact", title: "Contact Finale", technique: "Shy letters · live clock · copy" },
{
  id: "sandbox",
  number: "49",
  short: "Sandbox",
  title: "Physics Sandbox",
  technique: "Live Hooke parameters · curtain footer"
}];