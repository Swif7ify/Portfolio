import { exhibitImages } from "./exhibits";

export interface CraftNote {
  label: string;
  body: string;
}

export const islandNotes: CraftNote[] = [
{ label: "One shape, many states", body: "A single pill animates width, height and radius between a size table — idle, compact, expanded, notification. Content never resizes; it crossfades with a short blur once the shape has room." },
{ label: "Escape walks back one step", body: "Dismissing an expanded activity returns to compact, not idle. The music is still playing — an empty pill would lie about the system." },
{ label: "Notifications borrow, then return", body: "An alert takes over the island for 2.4 s and hands it back to whatever was running before." }];


export const trayNotes: CraftNote[] = [
{ label: "Every step is a different height", body: "Family varies tray height on purpose so each transition is unmistakable. The tray measures its content and springs auto → auto." },
{ label: "Fly, don't teleport", body: "Forward slides content from the right, back from the left. The close icon morphs into a back chevron as soon as there's somewhere to go back to." },
{ label: "Labels morph on shared letters", body: "Continue becomes Confirm by keeping C-o-n-i in place and swapping the rest — the user notices the stakes changed without reading twice." }];


export const toastNotes: CraftNote[] = [
{ label: "Stacked, then fanned", body: "Toasts sit as a stack using index-based translateY and scale. Hover fans them out so every message is readable; timers pause while you're reading." },
{ label: "Undo beats confirm", body: "Deleting a project happens instantly with an Undo in the toast — Vercel's guideline: confirm destructive actions or provide a safe Undo window." },
{ label: "One toast, many states", body: "A deploy toast updates in place from loading to success instead of stacking a second message. Swipe right to dismiss." }];


export const drawerNotes: CraftNote[] = [
{ label: "The page becomes the card behind", body: "As the sheet rises the page scales to 0.93 and rounds its corners, proportional to drag progress — the iOS sheet illusion Vaul brought to the web." },
{ label: "Momentum, not thresholds", body: "Flick down fast and it closes from anywhere. Drag up past the top and resistance grows with a square-root damping curve." },
{ label: "Transforms written directly", body: "During drag, transform is set on the element itself — not via a CSS variable — so style recalculation never cascades into children." }];


export const contacts = [
{ id: "ada", name: "Ada Okafor", handle: "ada.eth", initials: "AO" },
{ id: "ren", name: "Ren Takahashi", handle: "ren.eth", initials: "RT" },
{ id: "mia", name: "Mia Lindqvist", handle: "mia.eth", initials: "ML" },
{ id: "sol", name: "Sol Ortega", handle: "sol.eth", initials: "SO" }];


export const amountChips = [25, 50, 120, 250];

export const craftProjects = [
{ id: "p1", name: "kinetic-site", branch: "main" },
{ id: "p2", name: "design-tokens", branch: "next" },
{ id: "p3", name: "motion-lab", branch: "main" }];


export const nowPlaying = { title: "Loop Theory", artist: "Kinetic Studio", art: exhibitImages.neon };

export const libraryTracks = ["Concrete Hours", "Fold / Unfold", "Terracotta Grammar", "Ink in Suspension"];

export const detailRows = [
{
  id: "tabs",
  title: "Directional tabs",
  body: "Content slides in from the side of the tab you chose and the pill indicator travels between labels. A flash of direction gives the interface a sense of space.",
  source: "Benji Taylor — Family Values"
},
{
  id: "hold",
  title: "Hold to confirm",
  body: "Destructive actions need friction that isn't a modal. A clip-path fill tracks the hold; let go early and it snaps back in 200 ms.",
  source: "Emil Kowalski — The Magic of Clip Path"
},
{
  id: "loading",
  title: "Loading without flicker",
  body: "The spinner waits 150 ms before appearing, then stays at least 500 ms. Fast requests never flash a spinner; slow ones never vanish mid-blink. The label keeps its meaning: Save → Saving… → Saved.",
  source: "Vercel Web Interface Guidelines"
},
{
  id: "otp",
  title: "One-time code input",
  body: "One real input behind six visual slots — so paste, autofill (one-time-code) and screen readers all just work. Try 424242.",
  source: "Vercel Web Interface Guidelines — don't block paste"
},
{
  id: "tooltip",
  title: "Tooltip group timing",
  body: "The first tooltip waits 400 ms. Once one is open, its neighbours appear instantly with no animation, so scanning a toolbar feels immediate.",
  source: "Rauno Freiberg — Web Interface Guidelines"
}] as
const;