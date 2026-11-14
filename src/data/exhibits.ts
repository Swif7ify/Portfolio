export const exhibitImages = {
  chrome: "/7cc27c41-e67c-46f0-aba1-b78c7291281e.jpg",
  glass: "/8922bdd1-0cde-4980-9038-c1babb257125.jpg",
  torus: "/0c532632-05ee-4e82-a1f1-2e4eedca8294.jpg",
  terrain: "/a369534a-0e07-4e0d-99ac-bf8eb55a2201.jpg",
  galaxy: "/5add1a3a-0ea6-4dec-abd4-bf8cdb2ce1a3.jpg",
  brutalist: "/0ff7dac5-0f11-4f62-8152-5b6b816b6c2e.jpg",
  liquid: "/7759f14b-a109-44e6-9398-54928bdeab12.jpg",
  fabric: "/c30abe59-8782-4c95-9317-3439028ef1e5.jpg",
  ceramic: "/45b0ebd9-8a59-459e-809a-532bbe388d1c.jpg",
  neon: "/d0a822e2-d033-48a2-8171-c278c04e1019.jpg"
};

export const distortionItems = [
{ id: "brutalist", title: "Concrete at dusk", meta: "Ripple · RGB split", image: exhibitImages.brutalist, className: "md:col-span-7", aspect: "aspect-[4/3]" },
{ id: "liquid", title: "Ink in suspension", meta: "Velocity bend", image: exhibitImages.liquid, className: "md:col-span-5 md:mt-32", aspect: "aspect-[4/5]" },
{ id: "ceramic", title: "Ceramic study", meta: "Cover-fit UVs", image: exhibitImages.ceramic, className: "md:col-span-4", aspect: "aspect-[3/4]" },
{ id: "fabric", title: "Silk, folded", meta: "Hover zoom 0.92×", image: exhibitImages.fabric, className: "md:col-span-8", aspect: "aspect-[16/10]" },
{ id: "torus", title: "Thin-film torus", meta: "Chromatic offset", image: exhibitImages.torus, className: "md:col-span-5 md:col-start-2", aspect: "aspect-[4/5]" },
{ id: "glass", title: "Frosted volume", meta: "DOM-synced plane", image: exhibitImages.glass, className: "md:col-span-5 md:mt-24", aspect: "aspect-[4/5]" }];


export const infiniteTiles = [
{ id: "t1", title: "Concrete at dusk", year: "2026", image: exhibitImages.brutalist },
{ id: "t2", title: "Liquid chrome", year: "2025", image: exhibitImages.chrome },
{ id: "t3", title: "Ink in suspension", year: "2026", image: exhibitImages.liquid },
{ id: "t4", title: "Ceramic study", year: "2024", image: exhibitImages.ceramic },
{ id: "t5", title: "Neon loops", year: "2026", image: exhibitImages.neon },
{ id: "t6", title: "Frosted volume", year: "2025", image: exhibitImages.glass },
{ id: "t7", title: "Silk, folded", year: "2026", image: exhibitImages.fabric },
{ id: "t8", title: "Thin-film torus", year: "2024", image: exhibitImages.torus },
{ id: "t9", title: "Contour terrain", year: "2025", image: exhibitImages.terrain },
{ id: "t10", title: "Particle galaxy", year: "2026", image: exhibitImages.galaxy },
{ id: "t11", title: "Night facade", year: "2025", image: exhibitImages.brutalist },
{ id: "t12", title: "Gallery glow", year: "2024", image: exhibitImages.neon },
{ id: "t13", title: "Ribbon flow", year: "2026", image: exhibitImages.liquid },
{ id: "t14", title: "Terracotta arch", year: "2025", image: exhibitImages.ceramic }];


export const particleStages = [
{ id: "sphere", label: "Sphere", detail: "Fibonacci lattice · golden angle" },
{ id: "knot", label: "Torus knot", detail: "p = 2, q = 3 · tube jitter" },
{ id: "cube", label: "Voxel cube", detail: "Snapped surface lattice" },
{ id: "galaxy", label: "Galaxy", detail: "Three-arm log spiral" }];


export const carouselItems: {id: string;title: string;tag: string;image?: string;glyph?: string;}[] = [
{ id: "chrome", title: "Liquid chrome", tag: "Raymarched SDF", image: exhibitImages.chrome },
{ id: "glyph-a", title: "Variable axes", tag: "wght · wdth · opsz", glyph: "Aa" },
{ id: "glass", title: "Frosted glass", tag: "Transmission + IOR", image: exhibitImages.glass },
{ id: "torus", title: "Holo torus", tag: "Thin-film iridescence", image: exhibitImages.torus },
{ id: "glyph-b", title: "Spring physics", tag: "k · c · m", glyph: "ζ" },
{ id: "terrain", title: "Contour terrain", tag: "Height-map shading", image: exhibitImages.terrain },
{ id: "galaxy", title: "Particle galaxy", tag: "GPU points", image: exhibitImages.galaxy },
{ id: "glyph-c", title: "Scroll timeline", tag: "0 → 1 progress", glyph: "∞" }];


export const stackCases = [
{
  id: "sequence",
  inspiration: "Apple product pages",
  title: "Image-sequence scrubbing",
  body: "Hundreds of pre-rendered frames are drawn to a canvas, indexed directly by scroll progress. Feels like 3D, costs nothing at runtime.",
  stat: "1 frame / 4px",
  image: exhibitImages.chrome
},
{
  id: "particles",
  inspiration: "Lusion · Active Theory",
  title: "GPU particle systems",
  body: "Positions for every target shape live in vertex attributes; the shader blends between them so the CPU never touches a single point.",
  stat: "14k points",
  image: exhibitImages.galaxy
},
{
  id: "volumetric",
  inspiration: "Igloo Inc",
  title: "Volumetric 3D scenes",
  body: "Glass, ice and refraction rendered in real time, with scroll used as the camera dolly rather than as a page position.",
  stat: "Scroll = camera",
  image: exhibitImages.glass
},
{
  id: "smooth",
  inspiration: "Locomotive · Studio Freight",
  title: "Inertial scroll choreography",
  body: "A lerped virtual scroll drives every transform, so velocity becomes a design input: skew, marquee speed, aberration.",
  stat: "lerp 0.10",
  image: exhibitImages.terrain
}];


export const marqueeRows = [
"Awwwards · FWA · CSS Design Awards · Webby ·",
"WebGL · GLSL · Three.js · Spring physics · FLIP ·"];


export const trailImages = [
exhibitImages.chrome,
exhibitImages.glass,
exhibitImages.torus,
exhibitImages.terrain,
exhibitImages.galaxy];