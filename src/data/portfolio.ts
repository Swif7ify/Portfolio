import { exhibitImages } from "./exhibits";

export const aboutCopy =
	"I design and build interfaces for studios that care about the last ten percent — the easing curve, the empty state, the moment a page hands over to the next.";

export const aboutSecrets = [
	{ text: "Previously at a type foundry", x: "8%", y: "12%" },
	{ text: "Speaks fluent spring physics", x: "62%", y: "8%" },
	{ text: "Owns 41 grid notebooks", x: "70%", y: "86%" },
	{ text: "Has never used a stock easing", x: "6%", y: "88%" },
];

export const stats = [
	{
		id: "awards",
		value: 38,
		suffix: "",
		label: "International awards",
		detail: "Awwwards, FWA, CSSDA",
	},
	{ id: "projects", value: 142, suffix: "+", label: "Projects shipped" },
	{ id: "years", value: 12, suffix: "", label: "Years in practice" },
	{ id: "countries", value: 9, suffix: "", label: "Countries, remote" },
];

export const skillGroups = [
	{
		id: "design",
		label: "Design",
		tags: [
			"Art direction",
			"Typography",
			"Design systems",
			"Prototyping",
			"Figma",
			"Editorial",
			"Branding",
		],
	},
	{
		id: "motion",
		label: "Motion",
		tags: [
			"Choreography",
			"Springs",
			"Transitions",
			"Lottie",
			"Scroll",
			"Micro-interaction",
			"After Effects",
		],
	},
	{
		id: "code",
		label: "Engineering",
		tags: [
			"React",
			"TypeScript",
			"Next.js",
			"Accessibility",
			"Performance",
			"CSS",
			"Testing",
		],
	},
	{
		id: "realtime",
		label: "Real-time",
		tags: [
			"Three.js",
			"GLSL",
			"WebGPU",
			"Blender",
			"Shaders",
			"Physics",
			"Canvas",
		],
	},
];

export const processSteps = [
	{
		id: "listen",
		title: "Listen",
		body: "Two weeks of interviews, audits and uncomfortable questions before a single pixel.",
	},
	{
		id: "frame",
		title: "Frame",
		body: "One sentence the whole project must earn. Everything else is negotiable.",
	},
	{
		id: "sketch",
		title: "Sketch in motion",
		body: "Prototypes move from day one — a static mock can't tell you how something feels.",
	},
	{
		id: "build",
		title: "Build to the edge",
		body: "States, errors, slow networks, keyboards, reduced motion. The boring parts are the craft.",
	},
	{
		id: "tune",
		title: "Tune & hand over",
		body: "A week of only easing, spacing and copy. Then documentation that outlives me.",
	},
];

export const flapClients = [
	["HALDEN", "2026"],
	["MAISON OVRE", "2026"],
	["FLUXA LABS", "2025"],
	["STUDIO ARGIL", "2025"],
	["NORTHWIND", "2025"],
	["OKTAV", "2024"],
	["BRUTAL ARCH", "2024"],
	["LUMEN & CO", "2024"],
];

export const testimonials = [
	{
		id: "t1",
		quote: "The site didn't just launch — it changed how our whole team talks about craft.",
		name: "Ines Varga",
		role: "Creative Director",
		company: "Maison Ovre",
	},
	{
		id: "t2",
		quote: "Every transition answers a question you didn't know you had. Our bounce rate halved.",
		name: "Tomás Reyes",
		role: "Head of Product",
		company: "Fluxa Labs",
	},
	{
		id: "t3",
		quote: "Rare to find someone who sweats the easing curve and the deadline equally.",
		name: "Hanna Berg",
		role: "Founder",
		company: "Halden Gallery",
	},
	{
		id: "t4",
		quote: "We came for a website and left with a motion language we still use in every release.",
		name: "Kofi Mensah",
		role: "Design Lead",
		company: "Northwind",
	},
	{
		id: "t5",
		quote: "The prototype on day three was more convincing than our last agency's final build.",
		name: "Aiko Mori",
		role: "CMO",
		company: "Oktav",
	},
];

export interface LookbookSummaryItem {
	num: string;
	project: string;
	pages: string;
	takeaway: string;
}

export interface LookbookPhotoPage {
	kind: "photo";
	image: string;
	imageFit?: "cover" | "contain";
	chapter: string;
	frameLabel: string;
	title: string;
	note: string;
	caption: string;
}

export interface LookbookIndexPage {
	kind: "index";
	chapter: string;
	title: string;
	caption: string;
	summaryItems: LookbookSummaryItem[];
}

export type LookbookPage = LookbookPhotoPage | LookbookIndexPage;

export const lookbookPages: LookbookPage[] = [
	{
		kind: "photo",
		image: "/FlipBook/1.jpg",
		chapter: "Hydrobot",
		frameLabel: "01 / 03",
		title: "Bench Wiring",
		note: "Started experimenting with how code interacts with real hardware, using a Raspberry Pi, motors, sensors, and a multimeter.",
		caption: "Prototyping - 2025",
	},
	{
		kind: "photo",
		image: "/FlipBook/2.jpg",
		chapter: "Hydrobot",
		frameLabel: "02 / 03",
		title: "Hull Assembly",
		note: "Built a waterproof enclosure on twin pontoons, complete with a camera viewport and a long-range telemetry antenna.",
		caption: "Fabrication - 2025",
	},
	{
		kind: "photo",
		image: "/FlipBook/3.jpg",
		imageFit: "contain",
		chapter: "Hydrobot",
		frameLabel: "03 / 03",
		title: "Live Telemetry",
		note: "Developed a custom split-screen mobile controller to stream thermal and camera feeds with minimal delay.",
		caption: "Thermal + Optical UI - 2025",
	},
	{
		kind: "photo",
		image: "/FlipBook/4.jpg",
		chapter: "DevPad PCB",
		frameLabel: "01 / 03",
		title: "Custom Schematic",
		note: "Designed and built a custom macropad from scratch, featuring an STM32 microcontroller, dual rotary encoders, and SMD components.",
		caption: "Hardware Design - 2026",
	},
	{
		kind: "photo",
		image: "/FlipBook/5.jpg",
		chapter: "DevPad PCB",
		frameLabel: "02 / 03",
		title: "Trial & Error",
		note: "The first batch came with its fair share of mistakes, from faulty connections to bad soldering. Each problem taught me something new and helped shape the next revision.",
		caption: "PCB Prototyping - 2026",
	},
	{
		kind: "photo",
		image: "/FlipBook/6.jpg",
		chapter: "DevPad PCB",
		frameLabel: "03 / 03",
		title: "Final Build",
		note: "10 key mechanical macropad inside a custom 3D-printed shell, flashed over ST-Link V2.",
		caption: "STM32 Firmware - 2026",
	},
	{
		kind: "photo",
		image: "/FlipBook/7.jpeg",
		chapter: "Project METRO",
		frameLabel: "01 / 03",
		title: "San Antonio Launch",
		note: "Stepping onto the stage with DTI Zambales and Gordon College CCS as our capstone went live in the municipality.",
		caption: "DTI Zambales - May 2026",
	},
	{
		kind: "photo",
		image: "/FlipBook/8.JPG",
		chapter: "Project METRO",
		frameLabel: "02 / 03",
		title: "Iba Public Market",
		note: "Expanding rollout across Paleng-QR Ph Plus — watching real vendors and consumers rely on software we built.",
		caption: "Public Rollout - Jun 2026",
	},
	{
		kind: "photo",
		image: "/FlipBook/9.JPG",
		chapter: "Project METRO",
		frameLabel: "03 / 03",
		title: "San Marcelino",
		note: "Third municipal launch alongside the Price Watch Board during Consumer Welfare Month.",
		caption: "Civic Deployment - Sep 2026",
	},
	{
		kind: "index",
		chapter: "Thank You Everyone!",
		title: "Three Turning Points",
		caption: "2024 — 2026",
		summaryItems: [
			{
				num: "01",
				project: "Hydrobot",
				pages: "01–03",
				takeaway:
					"Proved software could leave the screen and command physical hardware.",
			},
			{
				num: "02",
				project: "DevPad PCB",
				pages: "04–06",
				takeaway:
					"Took an idea from blank schematic to custom-fabricated hardware and firmware.",
			},
			{
				num: "03",
				project: "Project METRO",
				pages: "07–09",
				takeaway:
					"Shipped a civic platform with DTI Zambales into real public markets.",
			},
		],
	},
];

export const blindSlides = [
	{
		image: exhibitImages.terrain,
		title: "Contour",
		meta: "Cartography for a climate lab",
	},
	{
		image: exhibitImages.brutalist,
		title: "Monolith",
		meta: "Architecture archive, 1960–1979",
	},
	{
		image: exhibitImages.fabric,
		title: "Drape",
		meta: "Autumn collection launch",
	},
	{
		image: exhibitImages.galaxy,
		title: "Drift",
		meta: "Planetarium identity",
	},
];

export const contactLinks = [
	{ label: "Instagram", href: "#instagram" },
	{ label: "Read.cv", href: "#readcv" },
	{ label: "GitHub", href: "#github" },
	{ label: "LinkedIn", href: "#linkedin" },
];

export const contactEmail = "hello@kinetic.studio";
