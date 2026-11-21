export interface Service {
	number: string;
	title: string;
	description: string;
	tags: string[];
}

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
			"REST",
		],
	},
	{
		number: "02",
		title: "Game Development",
		description:
			"Interactive games and real-time graphics experiences. Designing intuitive gameplay mechanics, fluid character controllers, and optimized physics pipelines.",
		tags: [
			"Unity",
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
			"Fusion 360",
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
			"Schematic Design",
			"Microcontrollers",
			"C/C++",
			"Arduino",
			"IoT",
			"Hardware Prototyping",
		],
	},
];

