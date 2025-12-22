<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import FloatingShapes from "./components/FloatingShapes.vue";
import { toastSuccess, toastError } from "./composables/Toast";
import emailjs from "emailjs-com";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";

const loading = ref(true);
const submitting = ref(false);

onMounted(() => {
	setTimeout(() => {
		loading.value = false;
	}, 2000);
});

watch(loading, async (isLoading) => {
	if (!isLoading) {
		await nextTick();
		setTimeout(() => {
			gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
			ScrollSmoother.create({
				wrapper: "#smooth-wrapper",
				content: "#smooth-content",
				smooth: 1.2,
			});

			initAnimations();
		}, 100);
	}
});

const initAnimations = () => {
	gsap.set(
		".hero-title, .hero-description, .hero-buttons .btn, .hero-image",
		{
			opacity: 0,
		}
	);

	gsap.set(".hero-title", { y: 100 });
	gsap.set(".hero-description", { y: 50 });
	gsap.set(".hero-buttons .btn", { y: 30 });
	gsap.set(".hero-image", { x: 100 });

	gsap.timeline()
		.to(".hero-title", {
			duration: 0.8,
			y: 0,
			opacity: 1,
			ease: "power3.out",
			delay: 0.5,
		})
		.to(
			".hero-description",
			{
				duration: 0.8,
				y: 0,
				opacity: 1,
				ease: "power3.out",
			},
			"-=0.5"
		)
		.to(
			".hero-buttons .btn",
			{
				duration: 0.6,
				y: 0,
				opacity: 1,
				stagger: 0.2,
				ease: "power3.out",
			},
			"-=0.3"
		)
		.to(
			".hero-image",
			{
				duration: 1,
				x: 0,
				opacity: 1,
				ease: "power3.out",
			},
			"-=0.8"
		);

	gsap.utils.toArray(".section-title").forEach((title) => {
		gsap.from(title, {
			scrollTrigger: {
				trigger: title,
				start: "top 80%",
				end: "bottom 20%",
			},
			duration: 1,
			y: 60,
			opacity: 0,
			ease: "power3.out",
		});
	});

	gsap.utils.toArray(".project-card").forEach((card, index) => {
		gsap.from(card, {
			scrollTrigger: {
				trigger: card,
				start: "top 85%",
			},
			duration: 0.8,
			y: 80,
			opacity: 0,
			delay: index * 0.2,
			ease: "power3.out",
		});
	});

	gsap.utils.toArray(".service-card").forEach((card, index) => {
		gsap.from(card, {
			scrollTrigger: {
				trigger: card,
				start: "top 85%",
			},
			duration: 0.6,
			y: 60,
			opacity: 0,
			delay: index * 0.1,
			ease: "power3.out",
		});
	});

	gsap.utils.toArray(".stat").forEach((stat, index) => {
		gsap.from(stat, {
			scrollTrigger: {
				trigger: stat,
				start: "top 90%",
			},
			duration: 0.8,
			y: 40,
			opacity: 0,
			delay: index * 0.15,
			ease: "back.out(1.7)",
		});
	});

	gsap.timeline({
		scrollTrigger: {
			trigger: ".about",
			start: "top 70%",
		},
	})
		.from(".about-image", {
			duration: 1,
			x: -100,
			opacity: 0,
			ease: "power3.out",
		})
		.from(
			".about-text",
			{
				duration: 1,
				x: 100,
				opacity: 0,
				ease: "power3.out",
			},
			"-=0.5"
		);

	gsap.timeline({
		scrollTrigger: {
			trigger: ".contact",
			start: "top 70%",
		},
	})
		.from(".contact-info", {
			duration: 0.8,
			x: -80,
			opacity: 0,
			ease: "power3.out",
		})
		.from(
			".contact-form",
			{
				duration: 0.8,
				x: 80,
				opacity: 0,
				ease: "power3.out",
			},
			"-=0.4"
		);

	gsap.utils.toArray(".project-card").forEach((card) => {
		card.addEventListener("mouseenter", () => {
			gsap.to(card, {
				duration: 0.3,
				y: -10,
				scale: 1.02,
				ease: "power2.out",
			});
		});

		card.addEventListener("mouseleave", () => {
			gsap.to(card, {
				duration: 0.3,
				y: 0,
				scale: 1,
				ease: "power2.out",
			});
		});
	});

	gsap.utils.toArray(".btn").forEach((btn) => {
		btn.addEventListener("mouseenter", () => {
			gsap.to(btn, {
				duration: 0.3,
				scale: 1.05,
				ease: "power2.out",
			});
		});

		btn.addEventListener("mouseleave", () => {
			gsap.to(btn, {
				duration: 0.3,
				scale: 1,
				ease: "power2.out",
			});
		});
	});

	gsap.to(".hero-image img", {
		duration: 3,
		y: -20,
		repeat: -1,
		yoyo: true,
		ease: "power2.inOut",
	});

	gsap.utils.toArray(".skill").forEach((skill, index) => {
		gsap.from(skill, {
			scrollTrigger: {
				trigger: skill,
				start: "top 90%",
			},
			duration: 0.6,
			scale: 0,
			opacity: 0,
			delay: index * 0.1,
			ease: "back.out(1.7)",
		});
	});
};

function useCountUp(target, duration = 1200) {
	const display = ref(0);
	let startTimestamp = null;
	let rafId = null;

	const animate = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp;
		const progress = Math.min((timestamp - startTimestamp) / duration, 1);
		display.value = Math.floor(progress * target);
		if (progress < 1) {
			rafId = requestAnimationFrame(animate);
		} else {
			display.value = target;
		}
	};

	const start = () => {
		display.value = 0;
		startTimestamp = null;
		cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(animate);
	};

	return { display, start };
}

const stats = [
	{ label: "Years Experience", value: 2, suffix: "+" },
	{ label: "Projects Completed", value: 10, suffix: "+" },
	{ label: "Client Satisfaction", value: 100, suffix: "%" },
];

const animatedStats = stats.map((stat) => {
	const { display, start } = useCountUp(stat.value);
	return { ...stat, display, start };
});

watch(loading, (val) => {
	if (!val) {
		animatedStats.forEach((stat) => stat.start());
	}
});

const mobileMenuOpen = ref(false);
const showAllProjects = ref(false);
const form = ref({
	name: "",
	email: "",
	subject: "",
	message: "",
});

const vlogVideos = [
	{
		title: "My First Job as a Intern",
		description:
			"My experience as an intern at Olongapo City Public Library.",
		driveId: "1Ge8WjLXPYMqeT210hEyQYVz2SsdVl1Aq",
		thumbnail: "",
		date: "2025-08-04",
	},
];
const additionalProjects = [
	{
		title: "BootTek",
		category: "Web Application",
		description:
			"An online coding platform where you can learn various programming languages through interactive lessons, real-time code editors, and hands-on projects.",
		image: "Projects/1.png",
		tags: ["Fullstack", "PostgreSQL", "UI/UX Design", "Node.js", "Vue.js"],
		link: "https://boottek.fwh.is",
		githubLink: "#",
		status: "Completed",
	},
	{
		title: "Clashing Grid",
		category: "Game Development",
		description:
			"Python game built with Pygame. It features local and multiplayer modes where players expand their pieces on a grid, aiming to outmaneuver and outscore their opponent.",
		image: "Projects/2.png",
		tags: ["Game Design", "Python", "Pygame", "Multiplayer"],
		link: "https://rinubi.itch.io/glid",
		githubLink: "https://github.com/Swif7ify/Clashing-Grid-Pygame",
		status: "Completed",
	},
	{
		title: "HydroBot Simulator",
		category: "Robotics Simulation",
		description:
			"A professional-grade underwater search and rescue simulation system featuring advanced sonar navigation and optical sensor.",
		image: "Projects/3.png",
		tags: ["Three.js", "Fusion 360", "3D Modelling", "Vue.js"],
		link: "https://swif7ify.github.io/Hydro-Bot-Pathfinding-Simulator/",
		githubLink:
			"https://github.com/Swif7ify/Hydro-Bot-Pathfinding-Simulator",
		status: "Completed",
	},
	{
		title: "Monkeytype Auto Typer",
		category: "Automation",
		description:
			"This project provides a user-friendly GUI to automate typing on Monkeytype using Python, Selenium, PyAutoGUI, and CustomTkinter.",
		image: "Projects/11.png",
		tags: ["Python", "Customtkinter", "Selenium", "PyAutoGUI"],
		link: "https://github.com/Swif7ify/MonkeyType-Auto-Typer",
		githubLink: "https://github.com/Swif7ify/MonkeyType-Auto-Typer",
		status: "Completed",
	},
	{
		title: "Autonomous Robot Pathfinding Simulator",
		category: "Robotics Simulation",
		description:
			"A 3D autonomous search and rescue/pathfinding simulator built with Vue 3, Vite, and Three.js. Simulate robot navigation, LiDAR scanning, and AI-driven search patterns in a dynamic environment.",
		image: "Projects/4.png",
		tags: ["Three.js", "Vue.js", "Simulation"],
		link: "https://swif7ify.github.io/Autonomous-Robot-Pathfinding-Simulator/",
		githubLink:
			"https://github.com/Swif7ify/Autonomous-Robot-Pathfinding-Simulator",
		status: "Completed",
	},
	// {
	// 	title: "EduGUI",
	// 	category: "Web Application",
	// 	description:
	// 		"EduGUI empowers schools to create engaging, real-time quiz experiences that boost student participation and provide instant feedback for better learning outcomes.",
	// 	image: "Projects/12.png",
	// 	tags: ["Next.js", "React", "MongoDB", "Tailwind CSS"],
	// 	link: "#",
	// 	githubLink: "#",
	// 	status: "In Development",
	// },
	{
		title: "MCServerhost Automation",
		category: "DevOps",
		description:
			"Python-based monitoring tool for automatically checking and starting a Minecraft server hosted on MCServerHost.com. It uses Selenium WebDriver to automate browser actions and includes a built-in HTTP health check server for status monitoring.",
		image: "Projects/5.png",
		tags: ["Python", "Selenium"],
		link: "https://github.com/Swif7ify/MCServerhost-Server-AutoStart",
		githubLink: "https://github.com/Swif7ify/MCServerhost-Server-AutoStart",
		status: "Completed",
	},
	{
		title: "React Native Gamepad Library",
		category: "React Native Library",
		description:
			"A React Native library that provides gamepad support for mobile applications, using react native webview as a bridge to connect to the gamepad API.",
		image: "Projects/18.jpg",
		tags: ["React Native", "Webview", "npmjs"],
		link: "https://www.npmjs.com/package/react-native-earl-gamepad",
		githubLink: "https://github.com/Swif7ify/react-native-earl-gamepad",
		status: "Completed",
	},
	{
		title: "Chatry - Messaging App",
		category: "Mobile Development",
		description:
			"Chatry is a messaging app that allows users to communicate in real-time with rich media support.",
		image: "Projects/16.png",
		tags: ["React Native", "Flask", "Socket.IO", "MongoDB"],
		link: "#",
		githubLink: "#",
		status: "Completed",
	},
	{
		title: "AimY - Stop Coding, Start Shooting",
		category: "VS Code Extension",
		description:
			"AimY is a VS Code extension that turns your idle time into aim training sessions. When you stop coding for a while, targets appear and you need to hit them to get back to work",
		image: "Projects/15.png",
		tags: ["TypeScript", "VS Code API", "Extension"],
		link: "https://marketplace.visualstudio.com/items?itemName=EarlRomeoOrdovez.aimy&ssr=false#review-details",
		githubLink: "https://github.com/Swif7ify/AimY",
		status: "Completed",
	},
	{
		title: "GapoGo - Smart Transportation Commuter for Olongapo City",
		category: "Web Application",
		description:
			"Innovative location-powered mobility app that empowers users through intelligent routing, real-time traffic updates, and seamless connections between drivers and commuters.",
		image: "Projects/13.png",
		tags: [
			"React",
			"Next.JS",
			"Google Maps API",
			"Typescript",
			"MongoDB",
			"Tailwind CSS",
		],
		link: "https://gapo-go.vercel.app",
		githubLink: "#",
		status: "Completed",
	},
	{
		title: "GapoGo Mobile",
		category: "Mobile Application",
		description:
			"Innovative location-powered mobility app that empowers users through intelligent routing, real-time traffic updates, and seamless connections between drivers and commuters.",
		image: "Projects/17.jpg",
		tags: [
			"React Native",
			"Google Maps API",
			"Express.js",
			"Typescript",
			"MongoDB",
			"Tailwind CSS",
		],
		link: "#",
		githubLink: "#",
		status: "Completed",
	},
	{
		title: "GCYofinder",
		category: "Mobile Application",
		description:
			"Mobile app-based application designed to help students report, search and reclaim any lost items in the campus.",
		image: "Projects/14.png",
		tags: ["React", "Next.JS", "Typescript", "MongoDB", "Tailwind CSS"],
		link: "https://gc-yofinder.vercel.app/login",
		githubLink: "#",
		status: "Completed",
	},
	{
		title: "OpenLeaf - Leaflet and MapLibre GL",
		category: "Web Mapping",
		description:
			"A web mapping tool that integrates Leaflet and MapLibre GL for advanced geospatial visualizations.",
		image: "Projects/openleaf.png",
		tags: ["React", "Leaflet", "MapLibre", "Typescript"],
		link: "https://swif7ify.github.io/leaflet-openfreemap-3d-demo/",
		githubLink: "https://github.com/Swif7ify/leaflet-openfreemap-3d-demo",
		status: "Completed",
	},
	{
		title: "Youtube to MP3 Batch Downloader",
		category: "Python Automation",
		description:
			"A tool that allows users to download YouTube videos and convert them into MP3 audio files in batches.",
		image: "Projects/1DEV.png",
		tags: ["Python", "YouTube", "Automation"],
		link: "https://github.com/Swif7ify/youtube-to-mp3-batch-downloader",
		githubLink:
			"https://github.com/Swif7ify/youtube-to-mp3-batch-downloader",
		status: "Completed",
	},
	{
		title: "Youtube Batch Downloader",
		category: "Python Automation",
		description:
			"A tool that allows users to download YouTube videos. It supports batch downloading, enabling users to download multiple videos at once.",
		image: "Projects/1DEV.png",
		tags: ["Python", "YouTube", "Automation"],
		link: "https://github.com/Swif7ify/youtube-batch-downloader",
		githubLink: "https://github.com/Swif7ify/youtube-batch-downloader",
		status: "Completed",
	},
	{
		title: "OCPL Logging",
		category: "Application Development",
		description:
			"A modern digital logging and attendance system for the Olongapo City Public Library, built with Electron and JavaScript. This application streamlines visitor registration, attendance tracking, and report generation, ensuring secure and efficient data management.",
		image: "Projects/6.png",
		tags: ["Electron", "Javascript", "Excel", "Responsive"],
		link: "https://github.com/Swif7ify/OCPL-Logging",
		githubLink: "https://github.com/Swif7ify/OCPL-Logging",
		status: "Completed",
	},
	{
		title: "All In",
		category: "Game Development",
		description:
			'All-In is a high-risk, high-reward game designed to challenge your luck and train your "SKILLS" and "DECISION MAKING". This game encourages strategic thinking and quick judgment.',
		image: "Projects/7.png",
		tags: ["Python", "Pygame", "Game Save"],
		link: "https://rinubi.itch.io/all-in",
		githubLink: "https://github.com/Swif7ify/All-In-Pygame",
		status: "Completed",
	},
	{
		title: "Cartify",
		category: "Web Development",
		description:
			"First Web Development Project. Cartify offers a wide variety of car selections, allowing you to effortlessly browse and explore your dream car. With an intuitive interface and detailed listings, finding the perfect car has never been easier.",
		image: "Projects/8.png",
		tags: ["HTML", "CSS", "JavaScript", "Responsive"],
		link: "https://github.com/Swif7ify/Cartify-Solid-Works",
		githubLink: "https://github.com/Swif7ify/Cartify-Solid-Works",
		status: "Completed",
	},
	{
		title: "Advance Calculator",
		category: "Productivity Tool",
		description:
			"This project offers a wide range of mathematical functions, from basic arithmetic operations to complex notations and summations. The calculator is designed for infinite calculations with robust handling of various mathematical functions.",
		image: "Projects/9.png",
		tags: ["Java", "Java Swing", "UX/UI Design"],
		link: "https://github.com/Swif7ify/Advanced-Calculator-Made-in-Java-Swing",
		githubLink:
			"https://github.com/Swif7ify/Advanced-Calculator-Made-in-Java-Swing",
		status: "Completed",
	},
	{
		title: "SmartPocket ",
		category: "Web Application",
		description:
			"An easy-to-use expense tracker helping students manage money and achieve financial goals. It allows users to track expenses, set budgets, and visualize spending patterns.",
		image: "Projects/10.png",
		tags: ["Vue.js", "PHP", "MySQL", "Responsive", "Tailwind CSS"],
		link: "#",
		githubLink: "#",
		status: "Completed",
	},
];

const toggleMobileMenu = () => {
	mobileMenuOpen.value = !mobileMenuOpen.value;
};

const toggleAllProjects = () => {
	showAllProjects.value = !showAllProjects.value;
	if (showAllProjects.value) {
		document.body.style.overflow = "hidden";
		return;
	}
	document.body.style.overflow = "auto";
};

const openProject = (link) => {
	if (link && link !== "#") {
		window.open(link, "_blank");
	}
};

const openGitHub = (link) => {
	if (link) {
		window.open(link, "_blank");
	}
};

const smoothScroll = (event) => {
	event.preventDefault();
	const targetId = event.target.getAttribute("href");
	const targetElement = document.querySelector(targetId);

	if (targetElement) {
		window.scrollTo({
			top: targetElement.offsetTop - 100,
			behavior: "smooth",
		});

		if (mobileMenuOpen.value) {
			mobileMenuOpen.value = false;
		}
	}
};

const submitForm = () => {
	if (
		["name", "email", "subject", "message"].some(
			(field) =>
				typeof form.value[field] !== "string" ||
				!form.value[field].trim()
		)
	) {
		toastError("Please fill in all fields.");
		return;
	}

	try {
		if (submitting.value) {
			toastError("Please wait, your message is being sent.");
			return;
		}
		submitting.value = true;
		emailjs
			.send(
				"service_5a7s8ep",
				"template_g8242va",
				{
					name: form.value.name,
					email: form.value.email,
					subject: form.value.subject,
					message: form.value.message,
					to_email: "earl.coding@gmail.com",
				},
				"_LSF5jdTjz3VeANe7"
			)
			.then(() => {
				return emailjs.send(
					"service_5a7s8ep",
					"template_pcp80n8",
					{
						name: form.value.name,
						email: form.value.email,
						subject: form.value.subject,
						message: form.value.message,
						to_email: "earl.coding@gmail.com",
					},
					"_LSF5jdTjz3VeANe7"
				);
			})
			.then(() => {
				toastSuccess(
					"Message sent successfully!",
					"Thank you for reaching out!"
				);
				form.value = {
					name: "",
					email: "",
					subject: "",
					message: "",
				};
				submitting.value = false;
			})
			.catch((error) => {
				toastError(
					"Failed to send message or auto-reply. Please try again later."
				);
				submitting.value = false;
				return;
			});
	} catch (error) {
		toastError(
			"Something went wrong while sending the message. Please try again later."
		);
		submitting.value = false;
		return;
	}
};
</script>

<template>
	<div>
		<transition name="fade">
			<div v-if="loading" class="loader-overlay">
				<FloatingShapes />
				<span class="loader-text">
					<span
						class="letter"
						v-for="(char, i) in 'EARL ROMEO ORDOVEZ'"
						:key="i"
						:style="{ animationDelay: i * 0.07 + 's' }"
					>
						{{ char === " " ? "\u00A0" : char }}
					</span>
				</span>
			</div>
		</transition>
		<div v-if="!loading" class="portfolio" style="position: relative">
			<FloatingShapes />
			<header class="header">
				<div class="container">
					<a href="#" class="logo"> 1DEV </a>

					<nav class="nav">
						<a href="#work" @click="smoothScroll">Work</a>
						<a href="#about" @click="smoothScroll">About</a>
						<a href="#services" @click="smoothScroll">Services</a>
						<a href="#vlogs" @click="smoothScroll">Vlogs</a>
						<a href="#contact" @click="smoothScroll">Contact</a>
					</nav>

					<button class="mobile-menu-btn" @click="toggleMobileMenu">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
				</div>

				<div v-show="mobileMenuOpen" class="mobile-menu">
					<a href="#work" @click="smoothScroll">Work</a>
					<a href="#about" @click="smoothScroll">About</a>
					<a href="#services" @click="smoothScroll">Services</a>
					<a href="#vlogs" @click="smoothScroll">Vlogs</a>
					<a href="#contact" @click="smoothScroll">Contact</a>
				</div>
			</header>

			<div id="smooth-wrapper">
				<div id="smooth-content">
					<section
						class="hero"
						style="position: relative; overflow: hidden"
					>
						<FloatingShapes />
						<div class="container">
							<div class="hero-content">
								<div class="hero-text">
									<h1 class="hero-title">
										Web
										<span class="accent underline-animate"
											>Developer</span
										>
										& Game Developer
									</h1>
									<p class="hero-description">
										Creating exceptional digital experiences
										that blend aesthetics with functionality
										to solve real user problems.
									</p>
									<div class="hero-buttons">
										<a
											href="#work"
											class="btn btn-primary"
											@click="smoothScroll"
											>View My Work</a
										>
										<a
											href="#contact"
											class="btn btn-secondary"
											@click="smoothScroll"
											>Get In Touch</a
										>
									</div>
								</div>

								<div class="hero-image">
									<img
										src="../public/myImage/ORDOVEZ_EARL_2A .jpg"
									/>
								</div>
							</div>

							<div class="stats">
								<div
									class="stat"
									v-for="stat in animatedStats"
									:key="stat.label"
								>
									<p class="stat-number">
										{{ stat.display
										}}<span v-if="stat.suffix">{{
											stat.suffix
										}}</span>
									</p>
									<p class="stat-label">{{ stat.label }}</p>
								</div>
							</div>
						</div>
					</section>

					<section
						id="work"
						class="work"
						style="position: relative; overflow: hidden"
					>
						<FloatingShapes />
						<div class="container">
							<div class="section-header">
								<h2 class="section-title">
									Featured
									<span class="accent">Projects</span>
								</h2>
								<p class="section-description">
									A showcase of my most significant projects,
									demonstrating my skills in web and game
									development.
								</p>
							</div>

							<div class="projects-grid">
								<div class="project-card">
									<div class="project-image">
										<img src="../public/Projects/1.png" />
										<button
											onclick="window.open('https://boottek.fwh.is', '_blank')"
											class="view-project-btn"
										>
											Visit Project
										</button>
									</div>
									<div class="project-content">
										<span class="project-category"
											>Web App</span
										>
										<h3 class="project-title">BootTek</h3>
										<p class="project-description">
											An online coding platform where you
											can learn various programming
											languages through interactive
											lessons, real-time code editors, and
											hands-on projects.
										</p>
										<div class="project-tags">
											<span class="tag">Fullstack</span>
											<span class="tag">PostgreSQL</span>
											<span class="tag"
												>UI/UX Design</span
											>
											<span class="tag">Node.js</span>
											<span class="tag">Vue.js</span>
										</div>
									</div>
								</div>

								<div class="project-card">
									<div class="project-image">
										<img src="../public/Projects/2.png" />
										<button
											onclick="window.open('https://rinubi.itch.io/glid', '_blank')"
											class="view-project-btn"
										>
											View Project
										</button>
									</div>
									<div class="project-content">
										<span class="project-category"
											>Game Development</span
										>
										<h3 class="project-title">
											Clashing Grid
										</h3>
										<p class="project-description">
											Python game built with Pygame. It
											features local and multiplayer modes
											where players expand their pieces on
											a grid, aiming to outmaneuver and
											outscore their opponent.
										</p>
										<div class="project-tags">
											<span class="tag">Game Design</span>
											<span class="tag">Pygame</span>
											<span class="tag">Multiplayer</span>
										</div>
									</div>
								</div>

								<div class="project-card">
									<div class="project-image">
										<img src="../public/Projects/3.png" />
										<button
											onclick="window.open('https://swif7ify.github.io/Hydro-Bot-Pathfinding-Simulator/', '_blank')"
											class="view-project-btn"
										>
											View Project
										</button>
									</div>
									<div class="project-content">
										<span class="project-category"
											>Robotics Simulation</span
										>
										<h3 class="project-title">
											HydroBot Simulator
										</h3>
										<p class="project-description">
											A professional-grade underwater
											search and rescue simulation system
											featuring advanced sonar navigation
											and optical sensor.
										</p>
										<div class="project-tags">
											<span class="tag">Three.js</span>
											<span class="tag">Fusion 360</span>
											<span class="tag"
												>3D Modelling</span
											>
											<span class="tag">Vue.js</span>
											<span class="tag">Simulation</span>
										</div>
									</div>
								</div>

								<div class="project-card">
									<div class="project-image">
										<img src="../public/Projects/11.png" />
										<button
											onclick="window.open('https://github.com/Swif7ify/MonkeyType-Auto-Typer', '_blank')"
											class="view-project-btn"
										>
											View Project
										</button>
									</div>
									<div class="project-content">
										<span class="project-category"
											>Automation</span
										>
										<h3 class="project-title">
											Monkeytype Auto Typer
										</h3>
										<p class="project-description">
											A Python-based automation tool that
											interacts with the Monkeytype
											website to simulate typing and
											improve typing speed.
										</p>
										<div class="project-tags">
											<span class="tag">Python</span>
											<span class="tag"
												>CustomTkinter</span
											>
											<span class="tag">Selenium</span>
											<span class="tag">PyAutoGUI</span>
										</div>
									</div>
								</div>
							</div>

							<div class="view-all">
								<button
									@click="toggleAllProjects"
									class="btn btn-secondary"
								>
									{{
										showAllProjects
											? "Show Less Projects"
											: "View All Projects"
									}}
								</button>
							</div>
						</div>
					</section>

					<section
						id="about"
						class="about"
						style="position: relative; overflow: hidden"
					>
						<FloatingShapes />
						<div class="container">
							<div class="about-content">
								<div class="about-image">
									<div class="about-placeholder">
										<div class="profile-circle">
											<img
												src="../public/myImage/IMG_20250623_112039.jpg"
											/>
										</div>
									</div>
								</div>

								<div class="about-text">
									<h2 class="section-title">
										About <span class="accent">Me</span>
									</h2>
									<p class="about-description">
										Hi, I'm Earl Romeo Ordovez, a passionate
										web and game developer with a knack for
										creating immersive digital experiences.
										With a strong background in both
										frontend and backend development, I
										specialize in building intuitive,
										user-friendly applications that not only
										look great but also perform seamlessly.
									</p>
									<p class="about-description">
										I have a keen interest in game
										development, leveraging my skills in 3D
										modeling and programming to create
										engaging and interactive games. My
										approach combines creativity with
										technical expertise, ensuring that every
										project is not only functional but also
										visually stunning.
									</p>

									<h3 class="skills-title">My Skills</h3>
									<div class="skills">
										<span class="skill"
											>UI & UX Design</span
										>
										<span class="skill"
											>Web Development</span
										>
										<span class="skill"
											>Game Development</span
										>
										<span class="skill"
											>Application Development</span
										>
										<span class="skill">3D Modeling</span>
										<span class="skill">Prototyping</span>
									</div>

									<a
										href="https://swif7ify.github.io/Portfolio/resume/resume.pdf"
										target="_blank"
										class="btn btn-primary"
										>Download Resume</a
									>
								</div>
							</div>
						</div>
					</section>

					<section
						id="services"
						class="services"
						style="position: relative; overflow: hidden"
					>
						<FloatingShapes />
						<div class="container">
							<div class="section-header centered">
								<h2 class="section-title">
									Things <span class="accent">I Do</span>
								</h2>
								<p class="section-description">
									Here are some of the projects and activities
									I work on as a student developer and
									learner.
								</p>
							</div>

							<div class="services-grid">
								<div class="service-card">
									<div class="service-icon">
										<!-- Web Projects Icon -->
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path
												d="M4 17v-2a4 4 0 014-4h8a4 4 0 014 4v2"
											/>
											<rect
												x="2"
												y="7"
												width="20"
												height="8"
												rx="2"
											/>
											<path d="M6 11v2" />
											<path d="M18 11v2" />
										</svg>
									</div>
									<h3 class="service-title">Web Projects</h3>
									<p class="service-description">
										Building websites and web apps for
										class, clubs, and personal learning.
									</p>
								</div>

								<div class="service-card">
									<div class="service-icon">
										<!-- Game Dev Icon -->
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<rect
												x="3"
												y="3"
												width="18"
												height="18"
												rx="2"
											/>
											<path d="M8 8h8v8H8z" />
										</svg>
									</div>
									<h3 class="service-title">
										Game Development
									</h3>
									<p class="service-description">
										Creating games for fun, competitions,
										and learning new programming concepts.
									</p>
								</div>

								<div class="service-card">
									<div class="service-icon">
										<!-- App Dev Icon -->
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<rect
												x="4"
												y="4"
												width="16"
												height="16"
												rx="2"
											/>
											<path d="M8 8h8v8H8z" />
										</svg>
									</div>
									<h3 class="service-title">
										App Development
									</h3>
									<p class="service-description">
										Building simple applications for school
										projects and personal use.
									</p>
								</div>

								<div class="service-card">
									<div class="service-icon">
										<!-- Learning Icon -->
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<circle cx="12" cy="12" r="10" />
											<path d="M12 8v4l3 3" />
										</svg>
									</div>
									<h3 class="service-title">
										Learning & Experimenting
									</h3>
									<p class="service-description">
										Trying out new technologies, frameworks,
										and programming languages.
									</p>
								</div>

								<div class="service-card">
									<div class="service-icon">
										<!-- Collaboration Icon -->
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path d="M12 20v-6" />
											<path d="M6 12l6-6 6 6" />
										</svg>
									</div>
									<h3 class="service-title">Collaboration</h3>
									<p class="service-description">
										Working with classmates on group
										projects and coding challenges.
									</p>
								</div>
								<div class="service-card">
									<div class="service-icon">
										<!-- Prototyping Icon -->
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<rect
												x="3"
												y="3"
												width="18"
												height="18"
												rx="2"
											/>
											<path d="M8 8h8v8H8z" />
											<path d="M12 12v4" />
											<path d="M12 12h4" />
										</svg>
									</div>
									<h3 class="service-title">Prototyping</h3>
									<p class="service-description">
										Creating interactive prototypes for
										apps, games, and websites to test ideas
										and get feedback before building the
										final version.
									</p>
								</div>
							</div>
						</div>
					</section>

					<!-- Vlog Section -->
					<section
						id="vlogs"
						class="vlogs"
						style="position: relative; overflow: hidden"
					>
						<FloatingShapes />
						<div class="container">
							<div class="section-header centered">
								<h2 class="section-title">
									My <span class="accent">Vlogs</span>
								</h2>
								<p class="section-description">
									Follow my journey, project development
									process, and experiences through my video
									logs.
								</p>
							</div>

							<div class="vlogs-grid">
								<div
									v-for="vlog in vlogVideos"
									:key="vlog.title"
									class="vlog-card"
								>
									<div class="vlog-video">
										<iframe
											:src="`https://drive.google.com/file/d/${vlog.driveId}/preview`"
											width="100"
											height="200"
											allow="autoplay"
											allowfullscreen
										></iframe>
									</div>
									<div class="vlog-content">
										<div class="vlog-date">
											{{
												new Date(
													vlog.date
												).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
													year: "numeric",
												})
											}}
										</div>
										<h3 class="vlog-title">
											{{ vlog.title }}
										</h3>
										<p class="vlog-description">
											{{ vlog.description }}
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section
						class="testimonials"
						style="position: relative; overflow: hidden"
					>
						<FloatingShapes />
						<div class="container">
							<div class="section-header centered">
								<h2 class="section-title">
									Client
									<span class="accent">Testimonials</span>
								</h2>
								<p class="section-description">
									Looking forward to working with you!
								</p>
							</div>
						</div>
					</section>

					<section
						id="contact"
						class="contact"
						style="position: relative; overflow: hidden"
					>
						<FloatingShapes />
						<div class="container">
							<div class="contact-content">
								<div class="contact-info">
									<h2 class="section-title">
										Let's
										<span class="accent">Connect</span>
									</h2>
									<p class="contact-description">
										Have a project in mind? Let's discuss
										how I can help bring your vision to
										life. Fill out the form and I'll get
										back to you within 24 hours.
									</p>

									<div class="contact-details">
										<div class="contact-item">
											<div class="contact-icon">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												>
													<path
														d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
													></path>
												</svg>
											</div>
											<span>earl.coding@gmail.com</span>
										</div>

										<div class="contact-item">
											<div class="contact-icon">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												>
													<path
														d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
													></path>
												</svg>
											</div>
											<span>09991884933</span>
										</div>

										<div class="contact-item">
											<div class="contact-icon">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												>
													<path
														d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
													></path>
													<path
														d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
													></path>
												</svg>
											</div>
											<span
												>Philippines, Zambales Olongapo
												City</span
											>
										</div>
									</div>

									<div class="social-links">
										<a
											href="https://github.com/Swif7ify"
											target="_blank"
											class="social-link"
										>
											<svg
												width="24"
												height="24"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
												></path>
											</svg>
										</a>
										<a
											href="https://linkedin.com/in/earl-romeo-ordovez-a73a36322"
											target="_blank"
											class="social-link"
										>
											<svg
												width="24"
												height="24"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c.872-1.616 4-1.736 4 1.548v3.359z"
												></path>
											</svg>
										</a>
										<a
											href="https://facebook.com/Swif7ify"
											target="_blank"
											class="social-link"
										>
											<svg
												width="24"
												height="24"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z"
												/>
											</svg>
										</a>
									</div>
								</div>

								<div class="contact-form">
									<form @submit.prevent="submitForm">
										<div class="form-group">
											<label for="name">Name</label>
											<input
												type="text"
												id="name"
												v-model="form.name"
												placeholder="Your name"
											/>
										</div>

										<div class="form-group">
											<label for="email">Email</label>
											<input
												type="email"
												id="email"
												v-model="form.email"
												placeholder="Your email"
											/>
										</div>

										<div class="form-group">
											<label for="subject">Subject</label>
											<input
												type="text"
												id="subject"
												v-model="form.subject"
												placeholder="Subject"
											/>
										</div>

										<div class="form-group">
											<label for="message">Message</label>
											<textarea
												id="message"
												rows="5"
												v-model="form.message"
												placeholder="Your message"
											></textarea>
										</div>

										<button
											type="submit"
											class="btn btn-primary full-width"
										>
											Send Message
										</button>
									</form>
								</div>
							</div>
						</div>
					</section>

					<footer class="footer">
						<div class="container">
							<div class="footer-content">
								<div class="footer-brand">
									<a href="#" class="logo">1DEV</a>
									<p class="footer-tagline">
										Creating exceptional digital
										experiences.
									</p>
								</div>

								<div class="footer-nav">
									<a href="#work" @click="smoothScroll"
										>Work</a
									>
									<a href="#about" @click="smoothScroll"
										>About</a
									>
									<a href="#services" @click="smoothScroll"
										>Services</a
									>
									<a href="#vlogs" @click="smoothScroll"
										>Vlogs</a
									>
									<a href="#contact" @click="smoothScroll"
										>Contact</a
									>
								</div>
							</div>

							<div class="footer-bottom">
								<p class="copyright">
									© 2025 1DEV. All rights reserved.
								</p>

								<div class="social-links small">
									<a
										href="https://github.com/Swif7ify"
										target="_blank"
										class="social-link"
									>
										<svg
											width="20"
											height="20"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
											></path>
										</svg>
									</a>
									<a
										href="https://linkedin.com/in/earl-romeo-ordovez-a73a36322"
										target="_blank"
										class="social-link"
									>
										<svg
											width="20"
											height="20"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c.872-1.616 4-1.736 4 1.548v3.359z"
											></path>
										</svg>
									</a>
									<a
										href="https://facebook.com/Swif7ify"
										target="_blank"
										class="social-link"
									>
										<svg
											width="24"
											height="24"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</div>
	</div>
	<!-- Additional Projects Modal/Expanded View -->
	<transition name="fade">
		<div v-if="showAllProjects" class="all-projects-modal">
			<div class="modal-backdrop" @click="toggleAllProjects"></div>
			<div class="modal-content">
				<div class="modal-header">
					<h3>All Projects</h3>
					<button class="close-btn" @click="toggleAllProjects">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="additional-projects-grid">
					<div
						v-for="project in additionalProjects"
						:key="project.title"
						class="additional-project-card"
					>
						<div class="project-image-small">
							<div class="project-placeholder">
								<img :src="project.image" alt="Project Image" />
							</div>
							<div
								class="project-status"
								:class="
									project.status
										.toLowerCase()
										.replace(' ', '-')
								"
							>
								{{ project.status }}
							</div>
						</div>
						<div class="project-content-small">
							<span class="project-category-small">{{
								project.category
							}}</span>
							<h4 class="project-title-small">
								{{ project.title }}
							</h4>
							<p class="project-description-small">
								{{ project.description }}
							</p>
							<div class="project-tags-small">
								<span
									v-for="tag in project.tags"
									:key="tag"
									class="tag-small"
								>
									{{ tag }}
								</span>
							</div>
							<div class="project-buttons">
								<button
									@click="openProject(project.link)"
									class="btn-small"
									:disabled="project.link === '#'"
								>
									{{
										project.status === "In Development"
											? "Preview"
											: "View Project"
									}}
								</button>
								<button
									@click="openGitHub(project.githubLink)"
									class="btn-small btn-github"
									:disabled="project.githubLink === '#'"
								>
									View GitHub
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	--sb-track-color: #232e33;
	--sb-thumb-color: #6baf8d;
	--sb-size: 14px;
}

*::-webkit-scrollbar {
	width: var(--sb-size);
}

*::-webkit-scrollbar-track {
	background: var(--sb-track-color);
	border-radius: 3px;
}

*::-webkit-scrollbar-thumb {
	background: var(--sb-thumb-color);
	border-radius: 3px;
}

@supports not selector(::-webkit-scrollbar) {
	body {
		scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
	}
}
</style>

<style src="/src/assets/app.css"></style>
