export const asciiModes = [
{ id: "ascii", label: "ASCII", detail: "Procedural 5×7 glyphs" },
{ id: "bayer", label: "Bayer dither", detail: "8×8 ordered threshold" },
{ id: "raw", label: "Raw render", detail: "No post-processing" }] as
const;

export const flightScenes = [
{ from: 0, to: 0.18, title: "Gate I — Fog is depth", body: "Linear fog matched to the page background turns distance into atmosphere for free." },
{ from: 0.18, to: 0.4, title: "Gate II — The path is a spline", body: "A Catmull-Rom curve defines the flight. Scroll is just a position along it." },
{ from: 0.4, to: 0.62, title: "Gate III — Look ahead", body: "The camera aims at a point slightly further along the curve, so turns feel banked and intentional." },
{ from: 0.62, to: 0.84, title: "Gate IV — Light as signage", body: "Emissive strips act as wayfinding — the eye follows the glow before the mind reads anything." },
{ from: 0.84, to: 1.01, title: "Arrival — The monolith", body: "One object, one ring, total stillness. The end of a camera move should breathe." }];


export const flightGates = [
{ x: 2, z: 0 },
{ x: -3, z: -14 },
{ x: 1, z: -28 },
{ x: 4, z: -42 }];