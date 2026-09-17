export interface Project {
	id: string;
	title: string;
	category: string;
	year?: string;
	image: string;
	description: string;
	liveUrl: string;
	repoUrl: string;
	tags?: string[];
}

export interface Service {
	number: string;
	title: string;
	description: string;
	tags: string[];
}

export const projects: Project[] = [
	{
		id: "obelisk-cli",
		title: "Obelisk CLI - AI Code Health & Architecture Linter",
		category: "Developer Tool & CLI",
		year: "2026",
		description:
			"A high-performance Go-based CLI, VS Code extension, and Model Context Protocol (MCP) server that acts as an automated tech lead. Evaluates project integrity, security vulnerabilities, and architectural health using static analysis, native esbuild parsing, and Gemini AI grading.",
		image: "/projects/obelisk-cli.png",
		tags: [
			"Go",
			"CLI",
			"Model Context Protocol",
			"Gemini AI",
			"Static Analysis",
			"esbuild",
			"Security",
		],
		liveUrl: "https://github.com/Swif7ify/Obelisk-CLI",
		repoUrl: "https://github.com/Swif7ify/Obelisk-CLI",
	},
	{
		id: "8bitdo-battery-tray-display",
		title: "8BitDo Battery Tray Display",
		category: "Desktop Utility & IoT",
		year: "2026",
		description:
			"A lightweight, secure, and read-only Windows system tray monitor for the 8BitDo Ultimate 2 Wireless controller. Features transparent battery tray icons displaying exact percentages via Bluetooth LE GATT or vertical capacity blocks via 2.4 GHz receiver, zero input lag, and per-monitor DPI awareness.",
		image: "/projects/8bitdo_tray.png",
		tags: [
			"Python",
			"Windows API",
			"Bluetooth LE",
			"GATT",
			"PyStray",
			"Win32",
			"Reverse Engineering",
		],
		liveUrl: "https://github.com/Swif7ify/8BitDo-Battery-Tray-Display",
		repoUrl: "https://github.com/Swif7ify/8BitDo-Battery-Tray-Display",
	},
	{
		id: "devpad",
		title: "DevPad - Custom Mechanical Macropad",
		category: "Hardware & Embedded",
		year: "2024",
		description:
			"A custom-built 10-key mechanical macropad featuring a rotary encoder knob and an integrated 0.96-inch OLED display for real-time status, macros, and productivity shortcuts.",
		image: "/projects/placeholder.jpg",
		tags: [
			"ESP32 / Arduino",
			"C++",
			"Circuit Design",
			"OLED Display",
			"Rotary Encoder",
			"3D Printing",
		],
		liveUrl: "#",
		repoUrl: "#",
	},
	{
		id: "esp32-pc-telemetry-display",
		title: "Dual-ESP32 PC Telemetry & Desk Display",
		category: "Hardware & IoT",
		year: "2024",
		description:
			"A dual ESP32 microcontroller system equipped with a 1.3-inch OLED display. One ESP32 fetches live date, time, weather, and Wi-Fi speeds, while the secondary ESP32 interfaces directly with the PC to stream live CPU/GPU temperatures and hardware telemetry.",
		image: "/projects/placeholder.jpg",
		tags: [
			"ESP32",
			"C++",
			"IoT",
			'1.3" OLED',
			"PC Telemetry",
			"Serial Communication",
		],
		liveUrl: "#",
		repoUrl: "#",
	},
	{
		id: "project-metro",
		title: "Project METRO IkotPalengke - DTI ",
		category: "Fullstack & Mobile System",
		year: "2025",
		description:
			"Measurement, Evaluation, and Tracking for Regulatory Operations — a comprehensive regulatory compliance ecosystem for the Department of Trade and Industry (DTI). Combines a Next.js administrative management portal with an offline-first React Native mobile application for field inspectors featuring Bluetooth thermal receipt printing and automated cloud sync.",
		image: "/projects/projectmetro.png",
		tags: [
			"Next.js",
			"React Native",
			"Expo",
			"TypeScript",
			"Supabase",
			"Express.js",
			"MongoDB",
			"Bluetooth Printing",
			"Tailwind CSS",
		],
		liveUrl: "https://metro.consumerhub.online",
		repoUrl: "https://github.com/Swif7ify/Project-METRO-Mobile",
	},
	{
		id: "rfjewelry",
		title: "RF Jewelry - Luxury E-Commerce & Inventory System",
		category: "Fullstack E-Commerce",
		year: "2025",
		description:
			"An all-in-one luxury jewelry e-commerce platform and inventory management system built with Astro, Supabase, and Tailwind CSS. Features custom order requests, appointment scheduling, QR code receipt scanning, PWA offline capabilities, and administrative analytics.",
		image: "/projects/rfjewelry.png",
		tags: [
			"Astro",
			"Supabase",
			"Tailwind CSS",
			"TypeScript",
			"PostgreSQL",
			"Redis",
			"PWA",
			"QR Code Scanner",
		],
		liveUrl: "#",
		repoUrl: "#",
	},
	{
		id: "boottek",
		title: "BootTek",
		category: "Web Application",
		year: "2024",
		description:
			"An online coding platform where you can learn various programming languages through interactive lessons, real-time code editors, and hands-on projects.",
		image: "/projects/bootek.png",
		tags: ["Fullstack", "PostgreSQL", "UI/UX Design", "Node.js", "Vue.js"],
		liveUrl: "https://boottek.fwh.is",
		repoUrl: "#",
	},
	{
		id: "clashing-grid",
		title: "Clashing Grid",
		category: "Game Development",
		year: "2024",
		description:
			"Python game built with Pygame. It features local and multiplayer modes where players expand their pieces on a grid, aiming to outmaneuver and outscore their opponent.",
		image: "/projects/clashing_grid.png",
		tags: ["Game Design", "Python", "Pygame", "Multiplayer"],
		liveUrl: "https://rinubi.itch.io/glid",
		repoUrl: "https://github.com/Swif7ify/Clashing-Grid-Pygame",
	},
	{
		id: "hydrobot-simulator",
		title: "HydroBot Simulator",
		category: "Robotics Simulation",
		year: "2024",
		description:
			"A professional-grade underwater search and rescue simulation system featuring advanced sonar navigation and optical sensor.",
		image: "/projects/hydrobot_simulation.png",
		tags: ["Three.js", "Fusion 360", "3D Modelling", "Vue.js"],
		liveUrl: "https://swif7ify.github.io/Hydro-Bot-Pathfinding-Simulator/",
		repoUrl: "https://github.com/Swif7ify/Hydro-Bot-Pathfinding-Simulator",
	},
	{
		id: "monkeytype-auto-typer",
		title: "Monkeytype Auto Typer",
		category: "Automation",
		year: "2024",
		description:
			"This project provides a user-friendly GUI to automate typing on Monkeytype using Python, Selenium, PyAutoGUI, and CustomTkinter.",
		image: "/projects/monkeytype.png",
		tags: ["Python", "Customtkinter", "Selenium", "PyAutoGUI"],
		liveUrl: "https://github.com/Swif7ify/MonkeyType-Auto-Typer",
		repoUrl: "https://github.com/Swif7ify/MonkeyType-Auto-Typer",
	},
	{
		id: "autonomous-robot-pathfinding-simulator",
		title: "Autonomous Robot Pathfinding Simulator",
		category: "Robotics Simulation",
		year: "2024",
		description:
			"A 3D autonomous search and rescue/pathfinding simulator built with Vue 3, Vite, and Three.js. Simulate robot navigation, LiDAR scanning, and AI-driven search patterns in a dynamic environment.",
		image: "/projects/pathfinding.png",
		tags: ["Three.js", "Vue.js", "Simulation"],
		liveUrl:
			"https://swif7ify.github.io/Autonomous-Robot-Pathfinding-Simulator/",
		repoUrl:
			"https://github.com/Swif7ify/Autonomous-Robot-Pathfinding-Simulator",
	},
	{
		id: "mcserverhost-automation",
		title: "MCServerhost Automation",
		category: "DevOps",
		year: "2024",
		description:
			"Python-based monitoring tool for automatically checking and starting a Minecraft server hosted on MCServerHost.com. It uses Selenium WebDriver to automate browser actions and includes a built-in HTTP health check server for status monitoring.",
		image: "/projects/mcpserver.png",
		tags: ["Python", "Selenium"],
		liveUrl: "https://github.com/Swif7ify/MCServerhost-Server-AutoStart",
		repoUrl: "https://github.com/Swif7ify/MCServerhost-Server-AutoStart",
	},
	{
		id: "react-native-gamepad-library",
		title: "React Native Gamepad Library",
		category: "React Native Library",
		year: "2024",
		description:
			"A React Native library that provides gamepad support for mobile applications, using react native webview as a bridge to connect to the gamepad API.",
		image: "/projects/gamepad.jpg",
		tags: ["React Native", "Webview", "npmjs"],
		liveUrl: "https://www.npmjs.com/package/react-native-earl-gamepad",
		repoUrl: "https://github.com/Swif7ify/react-native-earl-gamepad",
	},
	{
		id: "react-native-earl-thermal-printer",
		title: "React Native Thermal Printer Library",
		category: "React Native Library",
		year: "2025",
		description:
			"A high-performance React Native thermal printer library built with TurboModules (New Architecture) supporting Bluetooth (BLE), USB, and TCP/IP printers.",
		image: "/projects/npmjs.png",
		tags: ["React Native", "TurboModules", "Bluetooth", "ESC/POS", "npmjs"],
		liveUrl:
			"https://www.npmjs.com/package/react-native-earl-thermal-printer",
		repoUrl:
			"https://github.com/Swif7ify/react-native-earl-thermal-printer",
	},
	{
		id: "react-native-earl-toastify",
		title: "React Native Toastify Library",
		category: "React Native Library",
		year: "2025",
		description:
			"A highly customizable toast notification and confirmation modal library for React Native featuring Fabric (New Architecture) support, 6 animation modes, global imperative trigger API, and WCAG 2.1 AA accessibility compliance.",
		image: "/projects/npmjs.png",
		tags: ["React Native", "Fabric", "TypeScript", "UI Component", "npmjs"],
		liveUrl: "https://www.npmjs.com/package/react-native-earl-toastify",
		repoUrl: "https://github.com/Swif7ify/react-native-earl-toastify",
	},
	{
		id: "hydrobot-mobile",
		title: "Hydrobot Mobile",
		category: "Mobile Development",
		year: "2024",
		description:
			"A mobile application that allows users to control Hydrobot in real-time.",
		image: "/projects/hydrobotmobile.jpg",
		tags: ["React Native"],
		liveUrl: "#",
		repoUrl: "#",
	},
	{
		id: "hydrobot",
		title: "Hydrobot",
		category: "Robotics",
		year: "2024",
		description:
			"A fully functional floating robot built from scratch. It features thermal camera, leak detection system, and an integrated camera system for real-time video streaming. The robot is controlled via a custom mobile application.",
		image: "/projects/hydrobotiot.jpg",
		tags: ["Raspberry Pi", "Python"],
		liveUrl: "#",
		repoUrl: "#",
	},
	{
		id: "smart-vacuum-bot",
		title: "Smart Vacuum Bot",
		category: "Robotics",
		year: "2025",
		description:
			"A smart vacuum robot that autonomously cleans floors and can be controlled through a mobile application. It features automatic home mapping and intelligent cleaning modes.",
		image: "/projects/placeholder.jpg",
		tags: ["ESP32", "Arduino", "C#"],
		liveUrl: "#",
		repoUrl: "#",
	},
	{
		id: "chatry",
		title: "Chatry - Messaging App",
		category: "Mobile Development",
		year: "2024",
		description:
			"Chatry is a messaging app that allows users to communicate in real-time with rich media support.",
		image: "/projects/chatry.png",
		tags: ["React Native", "Flask", "Socket.IO", "MongoDB"],
		liveUrl: "#",
		repoUrl: "#",
	},
	{
		id: "aimy",
		title: "AimY - Stop Coding, Start Shooting",
		category: "VS Code Extension",
		year: "2024",
		description:
			"AimY is a VS Code extension that turns your idle time into aim training sessions. When you stop coding for a while, targets appear and you need to hit them to get back to work",
		image: "/projects/aimy.png",
		tags: ["TypeScript", "VS Code API", "Extension"],
		liveUrl:
			"https://marketplace.visualstudio.com/items?itemName=EarlRomeoOrdovez.aimy&ssr=false#review-details",
		repoUrl: "https://github.com/Swif7ify/AimY",
	},
	{
		id: "gapogo-web",
		title: "GapoGo - Smart Transportation Commuter",
		category: "Web Application",
		year: "2024",
		description:
			"Innovative location-powered mobility app that empowers users through intelligent routing, real-time traffic updates, and seamless connections between drivers and commuters.",
		image: "/projects/gapogoweb.png",
		tags: [
			"React",
			"Next.js",
			"Google Maps API",
			"TypeScript",
			"MongoDB",
			"Tailwind CSS",
		],
		liveUrl: "https://gapo-go.vercel.app",
		repoUrl: "#",
	},
	{
		id: "gapogo-mobile",
		title: "GapoGo Mobile",
		category: "Mobile Application",
		year: "2024",
		description:
			"Innovative location-powered mobility app that empowers users through intelligent routing, real-time traffic updates, and seamless connections between drivers and commuters.",
		image: "/projects/gapogomobile.jpg",
		tags: [
			"React Native",
			"Google Maps API",
			"Express.js",
			"TypeScript",
			"MongoDB",
			"Tailwind CSS",
		],
		liveUrl: "#",
		repoUrl: "#",
	},
	{
		id: "gcyofinder",
		title: "GCYofinder",
		category: "Mobile Application",
		year: "2024",
		description:
			"Mobile app-based application designed to help students report, search and reclaim any lost items in the campus.",
		image: "/projects/gcyofinder.png",
		tags: ["React", "Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
		liveUrl: "https://gc-yofinder.vercel.app/login",
		repoUrl: "#",
	},
	{
		id: "openleaf",
		title: "OpenLeaf - Leaflet and MapLibre GL",
		category: "Web Mapping",
		year: "2024",
		description:
			"A web mapping tool that integrates Leaflet and MapLibre GL for advanced geospatial visualizations.",
		image: "/projects/openleaf.png",
		tags: ["React", "Leaflet", "MapLibre", "TypeScript"],
		liveUrl: "https://swif7ify.github.io/leaflet-openfreemap-3d-demo/",
		repoUrl: "https://github.com/Swif7ify/leaflet-openfreemap-3d-demo",
	},
	{
		id: "youtube-mp3-downloader",
		title: "Youtube to MP3 Batch Downloader",
		category: "Python Automation",
		year: "2024",
		description:
			"A tool that allows users to download YouTube videos and convert them into MP3 audio files in batches.",
		image: "/projects/placeholder.jpg",
		tags: ["Python", "YouTube", "Automation"],
		liveUrl: "https://github.com/Swif7ify/youtube-to-mp3-batch-downloader",
		repoUrl: "https://github.com/Swif7ify/youtube-to-mp3-batch-downloader",
	},
	{
		id: "youtube-batch-downloader",
		title: "Youtube Batch Downloader",
		category: "Python Automation",
		year: "2024",
		description:
			"A tool that allows users to download YouTube videos. It supports batch downloading, enabling users to download multiple videos at once.",
		image: "/projects/placeholder.jpg",
		tags: ["Python", "YouTube", "Automation"],
		liveUrl: "https://github.com/Swif7ify/youtube-batch-downloader",
		repoUrl: "https://github.com/Swif7ify/youtube-batch-downloader",
	},
	{
		id: "ocpl-logging",
		title: "OCPL Logging",
		category: "Application Development",
		year: "2024",
		description:
			"A modern digital logging and attendance system for the Olongapo City Public Library, built with Electron and JavaScript. This application streamlines visitor registration, attendance tracking, and report generation, ensuring secure and efficient data management.",
		image: "/projects/ocpl.png",
		tags: ["Electron", "JavaScript", "Excel", "Responsive"],
		liveUrl: "https://github.com/Swif7ify/OCPL-Logging",
		repoUrl: "https://github.com/Swif7ify/OCPL-Logging",
	},
	{
		id: "all-in",
		title: "All In",
		category: "Game Development",
		year: "2024",
		description:
			'All-In is a high-risk, high-reward game designed to challenge your luck and train your "SKILLS" and "DECISION MAKING". This game encourages strategic thinking and quick judgment.',
		image: "/projects/allin.png",
		tags: ["Python", "Pygame", "Game Save"],
		liveUrl: "https://rinubi.itch.io/all-in",
		repoUrl: "https://github.com/Swif7ify/All-In-Pygame",
	},
	{
		id: "cartify",
		title: "Cartify",
		category: "Web Development",
		year: "2023",
		description:
			"First Web Development Project. Cartify offers a wide variety of car selections, allowing you to effortlessly browse and explore your dream car. With an intuitive interface and detailed listings, finding the perfect car has never been easier.",
		image: "/projects/cartify.png",
		tags: ["HTML", "CSS", "JavaScript", "Responsive"],
		liveUrl: "https://github.com/Swif7ify/Cartify-Solid-Works",
		repoUrl: "https://github.com/Swif7ify/Cartify-Solid-Works",
	},
	{
		id: "advance-calculator",
		title: "Advance Calculator",
		category: "Productivity Tool",
		year: "2023",
		description:
			"This project offers a wide range of mathematical functions, from basic arithmetic operations to complex notations and summations. The calculator is designed for infinite calculations with robust handling of various mathematical functions.",
		image: "/projects/calculator.png",
		tags: ["Java", "Java Swing", "UX/UI Design"],
		liveUrl:
			"https://github.com/Swif7ify/Advanced-Calculator-Made-in-Java-Swing",
		repoUrl:
			"https://github.com/Swif7ify/Advanced-Calculator-Made-in-Java-Swing",
	},
	{
		id: "smartpocket",
		title: "SmartPocket",
		category: "Web Application",
		year: "2024",
		description:
			"An easy-to-use expense tracker helping students manage money and achieve financial goals. It allows users to track expenses, set budgets, and visualize spending patterns.",
		image: "/projects/pocket.png",
		tags: ["Vue.js", "PHP", "MySQL", "Responsive", "Tailwind CSS"],
		liveUrl: "#",
		repoUrl: "#",
	},
];

export const services: Service[] = [
	{
		number: "01",
		title: "Web Development",
		description:
			"Full-stack web applications built for speed, responsiveness, and scale. Crafting pixel-perfect frontend interfaces backed by resilient cloud and API architectures.",
		tags: [
			"Next.js",
			"React",
			"Node.js",
			"TypeScript",
			"TailwindCSS",
			"REST & GraphQL",
		],
	},
	{
		number: "02",
		title: "Game Development",
		description:
			"Interactive games and real-time graphics experiences. Designing intuitive gameplay mechanics, fluid character controllers, and optimized physics pipelines.",
		tags: [
			"Unity",
			"Unreal Engine",
			"C#",
			"C++",
			"Gameplay Systems",
			"Physics",
		],
	},
	{
		number: "03",
		title: "3D Modeling & Art",
		description:
			"Stylized and high-fidelity 3D assets, environment modeling, and real-time shaders engineered for seamless integration in game engines and web visualizers.",
		tags: [
			"Blender",
			"Texturing",
			"Shader Graph",
			"Environment Design",
			"Asset Pipeline",
		],
	},
	{
		number: "04",
		title: "Circuit Design & IoT",
		description:
			"Hardware-software integration and custom PCB layout engineering. Developing custom microcontroller firmware that bridges real-world physical inputs with digital software.",
		tags: [
			"PCB Layout",
			"Microcontrollers",
			"C/C++",
			"Arduino",
			"IoT",
			"Hardware Prototyping",
		],
	},
];
