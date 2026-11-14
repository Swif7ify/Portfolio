import { exhibitImages } from "./exhibits";

export const labProjects = [
{ id: "concrete", title: "Concrete Hours", year: "2026", role: "Architecture film", image: exhibitImages.brutalist, body: "A slow, geometric study of brutalist housing at blue hour. Long takes, hard shadows, one warm window." },
{ id: "neon", title: "Loop Theory", year: "2025", role: "Light installation", image: exhibitImages.neon, body: "Intersecting neon loops tuned to the gallery's reverb, so light and sound share a single rhythm." },
{ id: "silk", title: "Fold / Unfold", year: "2026", role: "Fashion editorial", image: exhibitImages.fabric, body: "Fabric simulated, then photographed for real, until nobody on set could tell the two apart." },
{ id: "ceramic", title: "Terracotta Grammar", year: "2024", role: "Object design", image: exhibitImages.ceramic, body: "Spheres and arches as a type system — a visual alphabet built entirely from clay." }];


export const transitionModes = [
{ id: "pixel", label: "Pixelated", credit: "after TELETECH" },
{ id: "frames", label: "Repeating frames", credit: "after Codrops / J. Correia" },
{ id: "mask", label: "Mask wipe", credit: "after Amaterasu" },
{ id: "flip", label: "Shared element", credit: "after Palmer" }] as
const;

export const elasticImages = [
exhibitImages.chrome, exhibitImages.brutalist, exhibitImages.fabric, exhibitImages.galaxy,
exhibitImages.neon, exhibitImages.ceramic, exhibitImages.torus, exhibitImages.liquid,
exhibitImages.terrain, exhibitImages.glass, exhibitImages.brutalist, exhibitImages.chrome,
exhibitImages.liquid, exhibitImages.neon, exhibitImages.galaxy, exhibitImages.fabric,
exhibitImages.ceramic, exhibitImages.torus, exhibitImages.glass, exhibitImages.terrain];


export const puzzleProducts = [
{ id: "o1", name: "Chrome Vessel", price: "€340", image: exhibitImages.chrome },
{ id: "o2", name: "Glass Block", price: "€210", image: exhibitImages.glass },
{ id: "o3", name: "Holo Ring", price: "€480", image: exhibitImages.torus },
{ id: "o4", name: "Contour Tile", price: "€95", image: exhibitImages.terrain },
{ id: "o5", name: "Ceramic Pair", price: "€160", image: exhibitImages.ceramic },
{ id: "o6", name: "Silk Throw", price: "€290", image: exhibitImages.fabric },
{ id: "o7", name: "Neon Loop", price: "€720", image: exhibitImages.neon },
{ id: "o8", name: "Ink Print", price: "€120", image: exhibitImages.liquid }];


export const menuItems = [
{ id: "work", label: "Work", image: exhibitImages.brutalist },
{ id: "studio", label: "Studio", image: exhibitImages.ceramic },
{ id: "lab", label: "Lab", image: exhibitImages.chrome },
{ id: "journal", label: "Journal", image: exhibitImages.fabric },
{ id: "contact", label: "Contact", image: exhibitImages.neon }];


export const introHeadline = "Every SOTD starts here.";