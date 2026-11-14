import { exhibitImages } from "./exhibits";

export const workProjects = [
{ id: "concrete", title: "Concrete Hours", client: "Brutal Archive", year: "2026", services: "Art direction · WebGL · Film", image: exhibitImages.brutalist },
{ id: "loop", title: "Loop Theory", client: "Halden Gallery", year: "2026", services: "Installation · Sound · Site", image: exhibitImages.neon },
{ id: "fold", title: "Fold / Unfold", client: "Maison Ovre", year: "2025", services: "E-commerce · Motion · 3D", image: exhibitImages.fabric },
{ id: "terracotta", title: "Terracotta Grammar", client: "Studio Argil", year: "2025", services: "Identity · Type system", image: exhibitImages.ceramic },
{ id: "ink", title: "Ink in Suspension", client: "Fluxa Labs", year: "2024", services: "Product launch · Shader R&D", image: exhibitImages.liquid },
{ id: "chrome", title: "Liquid Chrome", client: "Kinetic Studio", year: "2024", services: "Brand film · Real-time render", image: exhibitImages.chrome }];


export const zoomTiles = [
exhibitImages.ceramic,
exhibitImages.glass,
exhibitImages.liquid,
exhibitImages.fabric,
exhibitImages.brutalist,
exhibitImages.torus,
exhibitImages.terrain,
exhibitImages.neon,
exhibitImages.chrome];


export type StatementToken = {word: string;} | {image: string;alt: string;};

export const statementTokens: StatementToken[] = [
{ word: "We" },
{ word: "build" },
{ image: exhibitImages.chrome, alt: "Liquid chrome render" },
{ word: "interfaces" },
{ word: "that" },
{ word: "move" },
{ word: "like" },
{ image: exhibitImages.liquid, alt: "Ink in water" },
{ word: "water," },
{ word: "read" },
{ word: "like" },
{ image: exhibitImages.brutalist, alt: "Concrete architecture" },
{ word: "print," },
{ word: "and" },
{ word: "feel" },
{ word: "as" },
{ word: "considered" },
{ word: "as" },
{ image: exhibitImages.ceramic, alt: "Ceramic objects" },
{ word: "objects." }];


export const fanCards = [
{ id: "f1", title: "Motion system", body: "One spring, shared by every component, so the whole product moves with a single personality.", metric: "k 220 · c 22" },
{ id: "f2", title: "Real-time rendering", body: "WebGL scenes that pause off-screen and degrade gracefully when the GPU says no.", metric: "60 fps budget" },
{ id: "f3", title: "Variable typography", body: "Weight, width and optical size driven by layout, scroll and intent — not by breakpoints.", metric: "3 axes" },
{ id: "f4", title: "Accessible by default", body: "Keyboard paths, reduced motion and polite announcements are designed first, not patched in.", metric: "WCAG 2.2 AA" },
{ id: "f5", title: "Scroll choreography", body: "Sections enter, hold and exit as beats, so a long page reads like one continuous piece.", metric: "Lerp 0.10" },
{ id: "f6", title: "Design tokens", body: "Three themes from one set of variables — the shader, the cursor and the copy all repaint together.", metric: "1 source" }];


export const servicePanels = [
{ id: "strategy", title: "Strategy", body: "Positioning, narrative and the one idea a site should be remembered for.", tags: ["Workshops", "Narrative", "Audit"], image: exhibitImages.terrain },
{ id: "interface", title: "Interface", body: "Product and marketing UI with obsessive attention to states, edges and empty moments.", tags: ["Product UI", "Design systems", "Prototyping"], image: exhibitImages.ceramic },
{ id: "motion", title: "Motion", body: "Transitions that explain where you came from and where you're going.", tags: ["Choreography", "Transitions", "Micro-interaction"], image: exhibitImages.fabric },
{ id: "realtime", title: "Real-time", body: "Shaders, 3D and simulation where they earn their place — and nowhere else.", tags: ["WebGL", "Three.js", "GLSL"], image: exhibitImages.torus },
{ id: "engineering", title: "Engineering", body: "Fast, resilient front-ends that keep the craft intact after launch.", tags: ["React", "Performance", "A11y"], image: exhibitImages.brutalist }];