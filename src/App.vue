<template>
	<div id="app" :class="{ loaded: isLoaded }">
		<!-- Loading Screen -->
		<div class="loading-screen" :class="{ 'fade-out': isLoaded }">
			<div class="loading-content">
				<div class="loading-logo">E</div>
				<div class="loading-text">Loading Portfolio...</div>
				<div class="loading-bar">
					<div
						class="loading-progress"
						:style="{ width: loadingProgress + '%' }"
					></div>
				</div>
			</div>
		</div>

		<!-- Navigation -->
		<nav class="navbar" :class="{ scrolled: isScrolled }">
			<div
				class="scroll-progress"
				:style="{ width: scrollProgress + '%' }"
			></div>
			<div class="nav-container">
				<div class="nav-logo">
					<h2>Earl's Portfolio</h2>
				</div>
				<ul class="nav-menu" :class="{ active: isMenuOpen }">
					<li>
						<a
							href="#home"
							@click="scrollTo('home')"
							:class="{ active: currentSection === 'home' }"
							>Home</a
						>
					</li>
					<li>
						<a
							href="#about"
							@click="scrollTo('about')"
							:class="{ active: currentSection === 'about' }"
							>About</a
						>
					</li>
					<li>
						<a
							href="#skills"
							@click="scrollTo('skills')"
							:class="{ active: currentSection === 'skills' }"
							>Skills</a
						>
					</li>
					<li>
						<a
							href="#projects"
							@click="scrollTo('projects')"
							:class="{ active: currentSection === 'projects' }"
							>Projects</a
						>
					</li>
					<li>
						<a
							href="#contact"
							@click="scrollTo('contact')"
							:class="{ active: currentSection === 'contact' }"
							>Contact</a
						>
					</li>
				</ul>
				<div
					class="hamburger"
					:class="{ active: isMenuOpen }"
					@click="toggleMenu"
				>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</nav>

		<!-- Hero Section -->
		<section id="home" class="hero">
			<div class="hero-content">
				<div class="hero-text">
					<h1 class="hero-title">
						Hi, I'm <span class="highlight">Earl</span>
					</h1>
					<h2 class="hero-subtitle">Full Stack Developer</h2>
					<p class="hero-description">
						I create amazing web experiences with modern
						technologies and clean code. Passionate about building
						scalable applications and solving complex problems.
					</p>
					<div class="hero-buttons">
						<button
							class="btn-primary"
							@click="scrollTo('projects')"
						>
							View My Work
						</button>
						<button
							class="btn-secondary"
							@click="scrollTo('contact')"
						>
							Get In Touch
						</button>
					</div>
				</div>
				<div class="hero-image">
					<div class="profile-card">
						<div class="profile-img">
							<div class="placeholder-avatar">
								<img
									src="../public/myImage/ORDOVEZ_EARL_2A .jpg"
									alt="Earl's Avatar"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="scroll-indicator" @click="scrollTo('about')">
				<div class="scroll-arrow"></div>
			</div>
		</section>

		<!-- About Section -->
		<section id="about" class="about">
			<div class="container">
				<h2 class="section-title">About Me</h2>
				<div class="about-content">
					<div class="about-text">
						<h3>Passionate Developer & Problem Solver</h3>
						<p>
							With several years of experience in web development,
							I specialize in creating robust, scalable
							applications using modern technologies. I'm
							passionate about clean code, user experience, and
							continuous learning.
						</p>
						<p>
							When I'm not coding, you can find me exploring new
							technologies, contributing to open source projects,
							or sharing knowledge with the developer community.
						</p>
						<div class="stats">
							<div class="stat">
								<h4>50+</h4>
								<p>Projects Completed</p>
							</div>
							<div class="stat">
								<h4>3+</h4>
								<p>Years Experience</p>
							</div>
							<div class="stat">
								<h4>100%</h4>
								<p>Client Satisfaction</p>
							</div>
						</div>
					</div>
					<div class="about-skills">
						<h3>What I Do</h3>
						<div class="skill-cards">
							<div class="skill-card">
								<div class="skill-icon">🎨</div>
								<h4>Frontend Development</h4>
								<p>
									Creating responsive, interactive user
									interfaces with modern frameworks
								</p>
							</div>
							<div class="skill-card">
								<div class="skill-icon">⚙️</div>
								<h4>Backend Development</h4>
								<p>
									Building robust APIs and server-side
									applications
								</p>
							</div>
							<div class="skill-card">
								<div class="skill-icon">📱</div>
								<h4>Mobile Development</h4>
								<p>
									Developing cross-platform mobile
									applications
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Skills Section -->
		<section id="skills" class="skills">
			<div class="container">
				<h2 class="section-title">Technical Universe</h2>
				<p class="section-subtitle">
					Navigate through my constellation of skills and technologies
				</p>
				<div
					class="skills-universe"
					ref="skillsUniverse"
					@click="handleUniverseClick"
				>
					<div class="universe-background">
						<div class="stars"></div>
						<div class="cosmic-dust"></div>
					</div>
					<div class="skill-constellation">
						<div
							v-for="(skill, index) in allSkills"
							:key="skill.name"
							class="skill-orb"
							:class="`skill-orb-${index}`"
							:style="getOrbPosition(index)"
							@mouseenter="activateSkill(skill, index, $event)"
							@mouseleave="deactivateSkill"
							@click="activateSkill(skill, index, $event)"
						>
							<div
								class="orb-core"
								:style="getOrbStyle(skill.level)"
							>
								<div class="skill-icon">{{ skill.icon }}</div>
								<div class="pulse-ring"></div>
								<div class="energy-field"></div>
							</div>
							<div class="skill-label">{{ skill.name }}</div>
							<div
								class="connection-lines"
								ref="connectionLines"
							></div>
						</div>
					</div>
				</div>
				<!-- Tooltip moved outside the universe container -->
				<div
					v-if="activeSkill"
					class="skill-tooltip"
					:style="tooltipPosition"
				>
					<div class="tooltip-header">
						<span class="tooltip-icon">{{ activeSkill.icon }}</span>
						<h3>{{ activeSkill.name }}</h3>
						<div class="skill-mastery">
							<div class="mastery-label">Mastery</div>
							<div class="mastery-meter">
								<div
									class="mastery-fill"
									:style="{
										width: activeSkill.level + '%',
									}"
								></div>
							</div>
							<span class="mastery-percentage"
								>{{ activeSkill.level }}%</span
							>
						</div>
					</div>
					<p class="tooltip-description">
						{{ activeSkill.description }}
					</p>
					<div class="skill-category">
						{{ getSkillCategory(activeSkill.name) }}
					</div>
				</div>
			</div>
		</section>

		<!-- Projects Section -->
		<section id="projects" class="projects">
			<div class="container">
				<h2 class="section-title">Featured Projects</h2>
				<div class="project-filters">
					<button
						v-for="filter in projectFilters"
						:key="filter"
						:class="{ active: activeFilter === filter }"
						@click="filterProjects(filter)"
						class="filter-btn"
					>
						{{ filter }}
					</button>
				</div>
				<div class="projects-grid">
					<div
						v-for="project in filteredProjects"
						:key="project.id"
						class="project-card"
						@click="openProject(project)"
						@mousemove="handleProjectHover"
						@mouseleave="resetProjectHover"
					>
						<div class="project-image">
							<div class="project-placeholder">
								{{ project.title.charAt(0) }}
							</div>
							<div class="project-overlay">
								<div class="project-links">
									<a href="#" class="project-link"
										>Live Demo</a
									>
									<a href="#" class="project-link">GitHub</a>
								</div>
							</div>
						</div>
						<div class="project-content">
							<h3>{{ project.title }}</h3>
							<p>{{ project.description }}</p>
							<div class="project-tech">
								<span
									v-for="tech in project.technologies"
									:key="tech"
									class="tech-tag"
								>
									{{ tech }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Contact Section -->
		<section id="contact" class="contact">
			<div class="container">
				<h2 class="section-title">Get In Touch</h2>
				<div class="contact-content">
					<div class="contact-info">
						<h3>Let's Work Together</h3>
						<p>
							I'm always interested in hearing about new
							opportunities and exciting projects. Whether you
							have a question or just want to say hi, feel free to
							reach out!
						</p>
						<div class="contact-methods">
							<div class="contact-method">
								<div class="contact-icon">📧</div>
								<div class="contact-details">
									<h4>Email</h4>
									<p>earl@example.com</p>
								</div>
							</div>
							<div class="contact-method">
								<div class="contact-icon">📱</div>
								<div class="contact-details">
									<h4>Phone</h4>
									<p>+1 (555) 123-4567</p>
								</div>
							</div>
							<div class="contact-method">
								<div class="contact-icon">📍</div>
								<div class="contact-details">
									<h4>Location</h4>
									<p>New York, NY</p>
								</div>
							</div>
						</div>
					</div>
					<form class="contact-form" @submit.prevent="submitForm">
						<div class="form-group">
							<input
								type="text"
								v-model="form.name"
								placeholder="Your Name"
								required
								class="form-input"
							/>
						</div>
						<div class="form-group">
							<input
								type="email"
								v-model="form.email"
								placeholder="Your Email"
								required
								class="form-input"
							/>
						</div>
						<div class="form-group">
							<input
								type="text"
								v-model="form.subject"
								placeholder="Subject"
								required
								class="form-input"
							/>
						</div>
						<div class="form-group">
							<textarea
								v-model="form.message"
								placeholder="Your Message"
								required
								class="form-textarea"
								rows="5"
							></textarea>
						</div>
						<button
							type="submit"
							class="btn-primary"
							:disabled="isSubmitting"
						>
							{{ isSubmitting ? "Sending..." : "Send Message" }}
						</button>
					</form>
				</div>
			</div>
		</section>

		<!-- Footer -->
		<footer class="footer">
			<div class="container">
				<div class="footer-content">
					<div class="footer-text">
						<p>
							&copy; 2025 Earl's Portfolio. All rights reserved.
						</p>
					</div>
					<div class="social-links">
						<a href="#" class="social-link">GitHub</a>
						<a href="#" class="social-link">LinkedIn</a>
						<a href="#" class="social-link">Twitter</a>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// Reactive state
const isScrolled = ref(false);
const isMenuOpen = ref(false);
const activeFilter = ref("All");
const isSubmitting = ref(false);
const isLoaded = ref(false);
const loadingProgress = ref(0);
const activeSkill = ref(null);
const tooltipPosition = ref({ top: "0px", left: "0px" });
const skillsUniverse = ref(null);
const scrollProgress = ref(0);
const currentSection = ref("home");

// Mouse parallax effect
const mouseX = ref(0);
const mouseY = ref(0);
const parallaxX = ref(0);
const parallaxY = ref(0);

const form = ref({
	name: "",
	email: "",
	subject: "",
	message: "",
});

// Skills data
const frontendSkills = ref([
	{
		name: "HTML",
		level: 95,
		icon: "🧱",
		description: "Semantic markup and modern web standards",
	},
	{
		name: "CSS",
		level: 90,
		icon: "🎨",
		description: "Styling and responsive design with modern CSS",
	},
	{
		name: "Vue.js",
		level: 90,
		icon: "🟢",
		description: "Progressive framework for building user interfaces",
	},
	{
		name: "JavaScript",
		level: 95,
		icon: "💛",
		description: "Core programming language for web development",
	},
]);

const backendSkills = ref([
	{
		name: "Python",
		level: 85,
		icon: "🐍",
		description:
			"Versatile programming language for backend and data science",
	},
	{
		name: "C++",
		level: 75,
		icon: "⚡",
		description:
			"High-performance programming language for system development",
	},
	{
		name: "C#",
		level: 80,
		icon: "🔷",
		description: "Modern object-oriented language for .NET development",
	},
	{
		name: "Node.js",
		level: 85,
		icon: "🟩",
		description: "JavaScript runtime for server-side development",
	},
	{
		name: "Express.js",
		level: 85,
		icon: "🚂",
		description: "Fast web framework for Node.js applications",
	},
	{
		name: "SlimPHP",
		level: 70,
		icon: "🐘",
		description: "Micro framework for PHP web applications and APIs",
	},
]);

const toolsSkills = ref([
	{
		name: "Unity",
		level: 80,
		icon: "🎮",
		description: "Game development engine for cross-platform games",
	},
	{
		name: "Blender",
		level: 75,
		icon: "🎨",
		description: "3D modeling and animation software",
	},
	{
		name: "Git",
		level: 90,
		icon: "📂",
		description: "Version control and collaborative development",
	},
	{
		name: "PostgreSQL",
		level: 80,
		icon: "🐘",
		description: "Advanced relational database system",
	},
	{
		name: "MySQL",
		level: 85,
		icon: "🗄️",
		description: "Popular relational database management system",
	},
	{
		name: "AWS",
		level: 70,
		icon: "☁️",
		description: "Cloud services and infrastructure management",
	},
]);

const projectFilters = ref(["All", "Web App", "Mobile", "API"]);

const projects = ref([
	{
		id: 1,
		title: "E-Commerce Platform",
		description:
			"Full-stack e-commerce solution with payment integration and admin dashboard.",
		technologies: ["Vue.js", "Node.js", "MongoDB", "Stripe"],
		category: "Web App",
	},
	{
		id: 2,
		title: "Task Management App",
		description:
			"Real-time collaborative task management application with team features.",
		technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
		category: "Web App",
	},
	{
		id: 3,
		title: "Weather Mobile App",
		description:
			"Cross-platform mobile app for weather forecasting with location services.",
		technologies: ["React Native", "Redux", "OpenWeather API"],
		category: "Mobile",
	},
	{
		id: 4,
		title: "Social Media API",
		description:
			"RESTful API for social media platform with authentication and real-time features.",
		technologies: ["Node.js", "Express", "JWT", "Redis"],
		category: "API",
	},
	{
		id: 5,
		title: "Portfolio Website",
		description:
			"Responsive portfolio website with modern design and smooth animations.",
		technologies: ["Vue.js", "GSAP", "CSS3"],
		category: "Web App",
	},
	{
		id: 6,
		title: "Fitness Tracker",
		description:
			"Mobile fitness tracking app with workout plans and progress analytics.",
		technologies: ["Flutter", "Firebase", "Charts.js"],
		category: "Mobile",
	},
]);

// Combine all skills into one array for the new layout
const allSkills = computed(() => [
	...frontendSkills.value.map((s) => ({ ...s })),
	...backendSkills.value.map((s) => ({ ...s })),
	...toolsSkills.value.map((s) => ({ ...s })),
]);

// Computed properties
const filteredProjects = computed(() => {
	if (activeFilter.value === "All") {
		return projects.value;
	}
	return projects.value.filter(
		(project) => project.category === activeFilter.value
	);
});

// Methods
const handleScroll = () => {
	isScrolled.value = window.scrollY > 100;
	scrollProgress.value =
		(window.scrollY /
			(document.documentElement.scrollHeight - window.innerHeight)) *
		100;

	// Update current section based on scroll position
	const sections = ["home", "about", "skills", "projects", "contact"];
	const currentY = window.scrollY + window.innerHeight / 2;

	for (const sectionId of sections) {
		const element = document.getElementById(sectionId);
		if (element) {
			const rect = element.getBoundingClientRect();
			const elementTop = rect.top + window.scrollY;
			const elementBottom = elementTop + rect.height;

			if (currentY >= elementTop && currentY <= elementBottom) {
				currentSection.value = sectionId;
				break;
			}
		}
	}
};

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};

const scrollTo = (elementId) => {
	const element = document.getElementById(elementId);
	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
		isMenuOpen.value = false;
	}
};

const filterProjects = (filter) => {
	activeFilter.value = filter;
};

const openProject = (project) => {
	console.log("Open project:", project);
};

const submitForm = async () => {
	isSubmitting.value = true;

	setTimeout(() => {
		alert("Message sent successfully!");
		form.value = { name: "", email: "", subject: "", message: "" };
		isSubmitting.value = false;
	}, 2000);
};

const handleProjectHover = (event) => {
	const card = event.currentTarget;
	const rect = card.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;

	const centerX = rect.width / 2;
	const centerY = rect.height / 2;

	const deltaX = (x - centerX) / centerX;
	const deltaY = (y - centerY) / centerY;

	card.style.transform = `
		perspective(1000px)
		rotateY(${deltaX * 5}deg)
		rotateX(${-deltaY * 5}deg)
		translateY(-10px)
		scale(1.02)
	`;
};

const resetProjectHover = (event) => {
	const card = event.currentTarget;
	card.style.transform = "";
};

// Skills constellation methods
const getOrbPosition = (index) => {
	const positions = [
		// Frontend cluster (top-left area)
		{ top: "15%", left: "20%" }, // HTML
		{ top: "25%", left: "35%" }, // CSS
		{ top: "10%", left: "45%" }, // Vue.js
		{ top: "30%", left: "15%" }, // JavaScript

		// Backend cluster (center-right area)
		{ top: "50%", left: "70%" }, // Python
		{ top: "60%", left: "55%" }, // C++
		{ top: "45%", left: "80%" }, // C#
		{ top: "65%", left: "75%" }, // Node.js
		{ top: "70%", left: "60%" }, // Express.js
		{ top: "55%", left: "85%" }, // SlimPHP

		// Tools cluster (bottom area)
		{ top: "80%", left: "25%" }, // Unity
		{ top: "85%", left: "40%" }, // Blender
		{ top: "75%", left: "50%" }, // Git
		{ top: "90%", left: "30%" }, // PostgreSQL
		{ top: "85%", left: "60%" }, // MySQL
		{ top: "80%", left: "70%" }, // AWS
	];

	return positions[index] || { top: "50%", left: "50%" };
};

const getOrbStyle = (level) => {
	const intensity = level / 100;
	const size = 60 + intensity * 40; // 60px to 100px
	const glow = intensity * 20; // 0 to 20px glow

	return {
		width: `${size}px`,
		height: `${size}px`,
		boxShadow: `
			0 0 ${glow}px rgba(255, 255, 255, ${intensity * 0.8}),
			0 0 ${glow * 2}px rgba(255, 255, 255, ${intensity * 0.4}),
			inset 0 0 ${glow}px rgba(255, 255, 255, ${intensity * 0.6})
		`,
	};
};

const activateSkill = (skill, index, event) => {
	// Clear any pending hide timeout
	if (hideTimeout) {
		clearTimeout(hideTimeout);
	}

	activeSkill.value = skill;

	if (event) {
		const rect = event.currentTarget.getBoundingClientRect();

		// Use fixed positioning relative to viewport
		tooltipPosition.value = {
			top: `${rect.top - 120}px`,
			left: `${rect.left + rect.width / 2 - 150}px`,
		};
	}

	// Add connection lines animation
	setTimeout(() => {
		drawConnections(index);
	}, 100);
};

let hideTimeout;

const deactivateSkill = () => {
	// Add a small delay before hiding to prevent flickering
	hideTimeout = setTimeout(() => {
		activeSkill.value = null;
		clearConnections();
	}, 100);
};

const handleUniverseClick = (event) => {
	// Only hide tooltip if clicking on the universe background, not on skill orbs
	if (event.target.closest(".skill-orb")) {
		return;
	}
	activeSkill.value = null;
	clearConnections();
};

const drawConnections = (activeIndex) => {
	// Draw connections between related skills
	const connections = getRelatedSkills(activeIndex);
	// Implementation for drawing animated SVG lines between orbs
};

const clearConnections = () => {
	// Clear all connection lines
};

const getRelatedSkills = (index) => {
	// Define relationships between skills
	const relationships = {
		0: [2, 4, 5], // Vue.js connects to JS, CSS, HTML
		1: [2, 4, 5], // React connects to JS, CSS, HTML
		2: [6, 8], // JavaScript connects to Node.js, Express
		6: [8, 11], // Node.js connects to Express, APIs
		// Add more relationships...
	};

	return relationships[index] || [];
};

const getSkillCategory = (skillName) => {
	const categories = {
		"Vue.js": "Frontend Framework",
		JavaScript: "Programming Language",
		HTML: "Markup Language",
		CSS: "Styling",
		Python: "Programming Language",
		"C++": "Programming Language",
		"C#": "Programming Language",
		"Node.js": "Backend Runtime",
		"Express.js": "Backend Framework",
		SlimPHP: "Backend Framework",
		Unity: "Game Engine",
		Blender: "3D Software",
		Git: "Version Control",
		PostgreSQL: "Database",
		MySQL: "Database",
		AWS: "Cloud Platform",
	};

	return categories[skillName] || "Technology";
};

const simulateLoading = () => {
	const interval = setInterval(() => {
		loadingProgress.value += Math.random() * 15;
		if (loadingProgress.value >= 100) {
			loadingProgress.value = 100;
			clearInterval(interval);
			setTimeout(() => {
				isLoaded.value = true;
				setTimeout(() => {
					animateOnScroll();
				}, 1000);
			}, 500);
		}
	}, 200);
};

// Mouse parallax effect handlers
const handleMouseMove = (event) => {
	const { clientX, clientY } = event;
	const { innerWidth, innerHeight } = window;

	// Normalize mouse position to -1 to 1 range
	mouseX.value = (clientX / innerWidth) * 2 - 1;
	mouseY.value = (clientY / innerHeight) * 2 - 1;

	// Create smooth parallax movement
	const maxParallax = 50;
	parallaxX.value = mouseX.value * maxParallax;
	parallaxY.value = mouseY.value * maxParallax;

	// Apply the transform to the background elements
	updateParallaxElements();
};

const updateParallaxElements = () => {
	// Update CSS custom properties for the parallax effect
	document.documentElement.style.setProperty(
		"--mouse-x",
		`${parallaxX.value}px`
	);
	document.documentElement.style.setProperty(
		"--mouse-y",
		`${parallaxY.value}px`
	);
	document.documentElement.style.setProperty(
		"--mouse-x-inverse",
		`${-parallaxX.value * 0.5}px`
	);
	document.documentElement.style.setProperty(
		"--mouse-y-inverse",
		`${-parallaxY.value * 0.5}px`
	);
};

// Animation function to animate skill orbs on scroll/load
const animateOnScroll = () => {
	// Animate skill orbs to appear
	const skillOrbs = document.querySelectorAll(".skill-orb");
	skillOrbs.forEach((orb, index) => {
		setTimeout(() => {
			orb.style.opacity = "1";
			orb.style.transform = "translate(-50%, -50%) scale(1)";
		}, index * 100); // Stagger animation by 100ms per orb
	});

	// Animate sections on scroll
	const sections = document.querySelectorAll("section");
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("animate");
			}
		});
	}, observerOptions);

	sections.forEach((section) => {
		observer.observe(section);
	});
};

// Lifecycle hooks
onMounted(() => {
	window.addEventListener("scroll", handleScroll);
	window.addEventListener("mousemove", handleMouseMove);
	simulateLoading();
});

onBeforeUnmount(() => {
	window.removeEventListener("scroll", handleScroll);
	window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	margin: 0;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	line-height: 1.6;
	color: #ffffff;
	background: #000000;
	overflow-x: hidden;
}

#app {
	min-height: 100vh;
	background: radial-gradient(
		ellipse at center top,
		#0f0f23 0%,
		#000000 50%,
		#000000 100%
	);
	position: relative;
	transition: all 1s ease;
}

#app.loaded {
	background: radial-gradient(
		ellipse at center top,
		#1a0d2e 0%,
		#0f0f23 25%,
		#000000 50%,
		#000000 100%
	);
}

#app::before {
	content: "";
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: radial-gradient(
			2px 2px at 20px 30px,
			rgba(255, 255, 255, 0.3),
			transparent
		),
		radial-gradient(
			2px 2px at 40px 70px,
			rgba(255, 255, 255, 0.2),
			transparent
		),
		radial-gradient(
			1px 1px at 90px 40px,
			rgba(255, 255, 255, 0.4),
			transparent
		),
		radial-gradient(
			1px 1px at 130px 80px,
			rgba(255, 255, 255, 0.2),
			transparent
		),
		radial-gradient(
			2px 2px at 160px 30px,
			rgba(255, 255, 255, 0.3),
			transparent
		);
	background-repeat: repeat;
	background-size: 200px 150px;
	animation: twinkleStars 6s ease-in-out infinite alternate;
	pointer-events: none;
	z-index: -1;
	transform: translate3d(var(--mouse-x, 0px), var(--mouse-y, 0px), 0);
	transition: transform 0.3s ease-out;
}

#app::after {
	content: "";
	position: fixed;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	background-image: radial-gradient(
			circle at 20% 50%,
			rgba(120, 119, 198, 0.1) 0%,
			transparent 50%
		),
		radial-gradient(
			circle at 80% 20%,
			rgba(255, 119, 198, 0.1) 0%,
			transparent 50%
		),
		radial-gradient(
			circle at 40% 80%,
			rgba(120, 219, 255, 0.1) 0%,
			transparent 50%
		),
		radial-gradient(
			circle at 60% 40%,
			rgba(255, 255, 255, 0.05) 0%,
			transparent 50%
		),
		radial-gradient(
			circle at 80% 70%,
			rgba(255, 255, 255, 0.03) 0%,
			transparent 50%
		);
	animation: slowRotate 30s linear infinite;
	pointer-events: none;
	z-index: -2;
	transform: translate3d(
		var(--mouse-x-inverse, 0px),
		var(--mouse-y-inverse, 0px),
		0
	);
	transition: transform 0.5s ease-out;
}

@keyframes twinkleStars {
	0% {
		opacity: 0.3;
	}
	50% {
		opacity: 0.8;
	}
	100% {
		opacity: 0.5;
	}
}

@keyframes slowRotate {
	from {
		transform: rotate(0deg)
			translate3d(
				var(--mouse-x-inverse, 0px),
				var(--mouse-y-inverse, 0px),
				0
			);
	}
	to {
		transform: rotate(360deg)
			translate3d(
				var(--mouse-x-inverse, 0px),
				var(--mouse-y-inverse, 0px),
				0
			);
	}
}

/* Loading Screen */
.loading-screen {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: radial-gradient(ellipse at center, #1a0d2e 0%, #000000 70%);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
	transition: opacity 1s ease, visibility 1s ease;
}

.loading-screen::before {
	content: "";
	position: absolute;
	width: 100%;
	height: 100%;
	background-image: radial-gradient(
			2px 2px at 20px 30px,
			rgba(255, 255, 255, 0.4),
			transparent
		),
		radial-gradient(
			1px 1px at 40px 70px,
			rgba(255, 255, 255, 0.3),
			transparent
		),
		radial-gradient(
			2px 2px at 90px 40px,
			rgba(255, 255, 255, 0.5),
			transparent
		);
	background-repeat: repeat;
	background-size: 200px 150px;
	animation: twinkleStars 3s ease-in-out infinite alternate;
}

.loading-screen.fade-out {
	opacity: 0;
	visibility: hidden;
}

.loading-content {
	text-align: center;
	color: #ffffff;
	z-index: 2;
	position: relative;
}

.loading-logo {
	font-size: 4rem;
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 1rem;
	animation: cosmicPulse 2s infinite;
	text-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
		0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4);
}

.loading-text {
	font-size: 1.2rem;
	margin-bottom: 2rem;
	color: #cccccc;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.loading-bar {
	width: 300px;
	height: 6px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 3px;
	overflow: hidden;
	margin: 0 auto;
	border: 1px solid rgba(255, 255, 255, 0.3);
}

.loading-progress {
	height: 100%;
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0.9) 0%,
		rgba(255, 255, 255, 0.7) 50%,
		rgba(255, 255, 255, 0.9) 100%
	);
	border-radius: 3px;
	transition: width 0.3s ease;
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

@keyframes cosmicPulse {
	0%,
	100% {
		transform: scale(1);
		text-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
			0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4);
	}
	50% {
		transform: scale(1.1);
		text-shadow: 0 0 30px rgba(255, 255, 255, 1),
			0 0 60px rgba(255, 255, 255, 0.8), 0 0 90px rgba(255, 255, 255, 0.6);
	}
}

/* Navigation */
.navbar {
	position: fixed;
	top: 0;
	width: 100%;
	background: rgba(0, 0, 0, 0.85);
	backdrop-filter: blur(15px);
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	z-index: 1000;
	transition: all 0.3s ease;
}

.scroll-progress {
	position: absolute;
	top: 0;
	left: 0;
	height: 3px;
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0.6) 0%,
		rgba(255, 255, 255, 1) 50%,
		rgba(255, 255, 255, 0.6) 100%
	);
	transition: width 0.3s ease;
	z-index: 3;
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.navbar::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		90deg,
		transparent 0%,
		rgba(255, 255, 255, 0.02) 25%,
		rgba(255, 255, 255, 0.05) 50%,
		rgba(255, 255, 255, 0.02) 75%,
		transparent 100%
	);
	pointer-events: none;
}

.navbar.scrolled {
	background: rgba(0, 0, 0, 0.95);
	box-shadow: 0 2px 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 255, 255, 0.1);
}

.nav-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 70px;
	position: relative;
	z-index: 2;
}

.nav-logo h2 {
	color: #ffffff;
	font-size: 1.8rem;
	font-weight: 700;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.6),
		0 0 20px rgba(255, 255, 255, 0.3);
}

.nav-menu {
	display: flex;
	list-style: none;
	gap: 2rem;
}

.nav-menu a {
	color: #ffffff;
	text-decoration: none;
	font-weight: 500;
	transition: all 0.3s ease;
	position: relative;
	cursor: pointer;
	text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
	padding: 8px 16px;
	border-radius: 8px;
}

.nav-menu a:hover,
.nav-menu a.active {
	color: #ffffff;
	background: rgba(255, 255, 255, 0.1);
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
		0 0 20px rgba(255, 255, 255, 0.6);
	transform: translateY(-2px);
}

.nav-menu a::after {
	content: "";
	position: absolute;
	width: 0;
	height: 2px;
	bottom: -5px;
	left: 0;
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0.8),
		rgba(255, 255, 255, 1),
		rgba(255, 255, 255, 0.8)
	);
	transition: width 0.3s ease;
	box-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
}

.nav-menu a:hover::after {
	width: 100%;
}

.hamburger {
	display: none;
	flex-direction: column;
	cursor: pointer;
}

.hamburger span {
	width: 25px;
	height: 3px;
	background: #ffffff;
	margin: 3px 0;
	transition: 0.3s;
	box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* Hero Section */
.hero {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 100px 20px 50px;
	position: relative;
	background: radial-gradient(
		ellipse at 30% 20%,
		rgba(75, 0, 130, 0.2) 0%,
		rgba(25, 25, 112, 0.1) 25%,
		transparent 70%
	);
	overflow: hidden;
}

.hero::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: radial-gradient(
			circle at 20% 30%,
			rgba(138, 43, 226, 0.1) 0%,
			transparent 40%
		),
		radial-gradient(
			circle at 80% 70%,
			rgba(72, 61, 139, 0.1) 0%,
			transparent 40%
		),
		linear-gradient(
			45deg,
			transparent 40%,
			rgba(147, 0, 211, 0.03) 50%,
			transparent 60%
		);
	animation: cosmicDrift 25s linear infinite;
	pointer-events: none;
}

@keyframes cosmicDrift {
	0% {
		transform: translate(0, 0) rotate(0deg);
	}
	25% {
		transform: translate(-10px, -15px) rotate(90deg);
	}
	50% {
		transform: translate(10px, -10px) rotate(180deg);
	}
	75% {
		transform: translate(-5px, 10px) rotate(270deg);
	}
	100% {
		transform: translate(0, 0) rotate(360deg);
	}
}

.hero-content {
	max-width: 1200px;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 4rem;
	align-items: center;
	position: relative;
	z-index: 2;
}

.hero-title {
	font-size: 4rem;
	font-weight: 700;
	margin-bottom: 1rem;
	line-height: 1.2;
	color: #ffffff;
	text-shadow: 0 0 20px rgba(255, 255, 255, 0.6),
		0 0 40px rgba(255, 255, 255, 0.3);
}

.highlight {
	color: #ffffff;
	position: relative;
	text-shadow: 0 0 30px rgba(255, 255, 255, 0.9),
		0 0 60px rgba(255, 255, 255, 0.6), 0 0 90px rgba(255, 255, 255, 0.3);
	animation: cosmicGlow 3s ease-in-out infinite alternate;
}

@keyframes cosmicGlow {
	0% {
		text-shadow: 0 0 30px rgba(255, 255, 255, 0.9),
			0 0 60px rgba(255, 255, 255, 0.6), 0 0 90px rgba(255, 255, 255, 0.3);
	}
	100% {
		text-shadow: 0 0 40px rgba(255, 255, 255, 1),
			0 0 80px rgba(255, 255, 255, 0.8),
			0 0 120px rgba(255, 255, 255, 0.5);
	}
}

.hero-subtitle {
	font-size: 2rem;
	color: #cccccc;
	margin-bottom: 2rem;
	font-weight: 400;
	text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
}

.hero-description {
	font-size: 1.2rem;
	color: #aaaaaa;
	margin-bottom: 3rem;
	line-height: 1.8;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.hero-buttons {
	display: flex;
	gap: 1.5rem;
}

.btn-primary {
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.9) 0%,
		rgba(255, 255, 255, 0.8) 50%,
		rgba(255, 255, 255, 0.9) 100%
	);
	color: #000000;
	padding: 15px 30px;
	border: none;
	border-radius: 8px;
	font-size: 1.1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	text-decoration: none;
	display: inline-block;
	box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3),
		inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.btn-primary:hover {
	transform: translateY(-3px);
	box-shadow: 0 15px 35px rgba(255, 255, 255, 0.4),
		0 0 20px rgba(255, 255, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 1);
}

.btn-secondary {
	background: transparent;
	color: #ffffff;
	padding: 15px 30px;
	border: 2px solid rgba(255, 255, 255, 0.6);
	border-radius: 8px;
	font-size: 1.1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
	background: rgba(255, 255, 255, 0.1);
	transform: translateY(-3px);
	border-color: rgba(255, 255, 255, 0.9);
	box-shadow: 0 10px 25px rgba(255, 255, 255, 0.3),
		0 0 30px rgba(255, 255, 255, 0.4);
}

.hero-image {
	display: flex;
	justify-content: center;
	align-items: center;
}

.profile-card {
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(15px);
	border-radius: 25px;
	padding: 2.5rem;
	border: 1px solid rgba(255, 255, 255, 0.2);
	transition: all 0.4s ease;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5),
		0 0 30px rgba(255, 255, 255, 0.1),
		inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.profile-card:hover {
	transform: translateY(-15px);
	box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6),
		0 0 50px rgba(255, 255, 255, 0.2),
		inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.profile-img {
	width: 250px;
	height: 250px;
	border-radius: 50%;
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.9) 0%,
		rgba(255, 255, 255, 0.7) 50%,
		rgba(255, 255, 255, 0.9) 100%
	);
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	border: 3px solid rgba(255, 255, 255, 0.4);
	box-shadow: 0 0 30px rgba(255, 255, 255, 0.3),
		inset 0 0 20px rgba(255, 255, 255, 0.2);
	overflow: hidden;
}

.placeholder-avatar {
	font-size: 6rem;
	font-weight: 700;
	color: #000000;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.placeholder-avatar img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 50%;
}

.scroll-indicator {
	position: absolute;
	bottom: 30px;
	left: 50%;
	transform: translateX(-50%);
	cursor: pointer;
	animation: cosmicBounce 2s infinite;
}

.scroll-arrow {
	width: 30px;
	height: 30px;
	border-right: 3px solid rgba(255, 255, 255, 0.8);
	border-bottom: 3px solid rgba(255, 255, 255, 0.8);
	transform: rotate(45deg);
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

@keyframes cosmicBounce {
	0%,
	20%,
	50%,
	80%,
	100% {
		transform: translateY(0) translateX(-50%);
	}
	40% {
		transform: translateY(-15px) translateX(-50%);
	}
	60% {
		transform: translateY(-8px) translateX(-50%);
	}
}

/* Container */
.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
	position: relative;
	z-index: 2;
}

/* Section Titles */
.section-title {
	font-size: 3rem;
	text-align: center;
	margin-bottom: 4rem;
	color: #ffffff;
	position: relative;
	text-shadow: 0 0 20px rgba(255, 255, 255, 0.7),
		0 0 40px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3);
}

.section-title::after {
	content: "";
	position: absolute;
	width: 120px;
	height: 4px;
	background: linear-gradient(
		90deg,
		transparent 0%,
		rgba(255, 255, 255, 0.8) 25%,
		rgba(255, 255, 255, 1) 50%,
		rgba(255, 255, 255, 0.8) 75%,
		transparent 100%
	);
	bottom: -15px;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 2px;
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.6),
		0 0 20px rgba(255, 255, 255, 0.3);
}

.section-subtitle {
	text-align: center;
	color: #cccccc;
	font-size: 1.2rem;
	margin-bottom: 3rem;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* About Section */
.about {
	padding: 100px 0;
	background: radial-gradient(
		ellipse at 80% 30%,
		rgba(75, 0, 130, 0.15) 0%,
		rgba(25, 25, 112, 0.08) 25%,
		transparent 60%
	);
	position: relative;
}

.about::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: radial-gradient(
			circle at 25% 75%,
			rgba(138, 43, 226, 0.08) 0%,
			transparent 35%
		),
		radial-gradient(
			circle at 75% 25%,
			rgba(72, 61, 139, 0.08) 0%,
			transparent 35%
		),
		linear-gradient(
			135deg,
			transparent 30%,
			rgba(147, 0, 211, 0.02) 50%,
			transparent 70%
		);
	animation: cosmicFlow 20s linear infinite;
	pointer-events: none;
}

@keyframes cosmicFlow {
	0% {
		transform: translateX(0) translateY(0);
	}
	25% {
		transform: translateX(15px) translateY(-10px);
	}
	50% {
		transform: translateX(-10px) translateY(15px);
	}
	75% {
		transform: translateX(-15px) translateY(-5px);
	}
	100% {
		transform: translateX(0) translateY(0);
	}
}

.about-content {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 4rem;
	align-items: start;
	position: relative;
	z-index: 2;
}

.about-text h3 {
	font-size: 2rem;
	color: #ffffff;
	margin-bottom: 1.5rem;
	text-shadow: 0 0 15px rgba(255, 255, 255, 0.6),
		0 0 30px rgba(255, 255, 255, 0.3);
}

.about-text p {
	font-size: 1.1rem;
	color: #cccccc;
	margin-bottom: 1.5rem;
	line-height: 1.8;
	text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

.stats {
	display: flex;
	gap: 2rem;
	margin-top: 2rem;
}

.stat {
	text-align: center;
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	padding: 1.5rem;
	border-radius: 15px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: all 0.4s ease;
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.stat:hover {
	transform: translateY(-8px);
	background: rgba(255, 255, 255, 0.08);
	border-color: rgba(255, 255, 255, 0.2);
	box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4),
		0 0 20px rgba(255, 255, 255, 0.1);
}

.stat h4 {
	font-size: 2.5rem;
	color: #ffffff;
	font-weight: 700;
	text-shadow: 0 0 20px rgba(255, 255, 255, 0.7),
		0 0 40px rgba(255, 255, 255, 0.4);
}

.stat p {
	color: #aaaaaa;
	font-size: 0.9rem;
	margin: 0.5rem 0 0 0;
	text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
}

.about-skills h3 {
	font-size: 2rem;
	color: #ffffff;
	margin-bottom: 2rem;
	text-shadow: 0 0 15px rgba(255, 255, 255, 0.6),
		0 0 30px rgba(255, 255, 255, 0.3);
}

.skill-cards {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.skill-card {
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(10px);
	padding: 1.8rem;
	border-radius: 15px;
	border: 1px solid rgba(255, 255, 255, 0.15);
	transition: all 0.4s ease;
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
	position: relative;
	overflow: hidden;
}

.skill-card::before {
	content: "";
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		90deg,
		transparent 0%,
		rgba(255, 255, 255, 0.1) 50%,
		transparent 100%
	);
	transition: left 0.6s ease;
}

.skill-card:hover::before {
	left: 100%;
}

.skill-card:hover {
	transform: translateX(15px);
	background: rgba(255, 255, 255, 0.12);
	border-color: rgba(255, 255, 255, 0.25);
	box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4),
		0 0 25px rgba(255, 255, 255, 0.15);
}

.skill-icon {
	font-size: 2.5rem;
	filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
}

.skill-card h4 {
	color: #ffffff;
	margin-bottom: 0.5rem;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.skill-card p {
	color: #aaaaaa;
	font-size: 0.9rem;
	margin: 0;
	text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}

/* Skills Section - Cosmic Universe */
.skills {
	padding: 120px 0;
	background: radial-gradient(ellipse at center, #0f0f23 0%, #000000 70%);
	position: relative;
	overflow: hidden;
	min-height: 100vh;
}

.skills-universe {
	position: relative;
	width: 100%;
	height: 80vh;
	min-height: 600px;
	border-radius: 20px;
	background: radial-gradient(
		circle at 30% 20%,
		rgba(75, 0, 130, 0.3) 0%,
		rgba(25, 25, 112, 0.2) 25%,
		rgba(0, 0, 0, 0.8) 70%
	);
	border: 1px solid rgba(255, 255, 255, 0.1);
	overflow: hidden;
	perspective: 1000px;
	transform: rotateX(calc(var(--mouse-y, 0) * 0.01deg))
		rotateY(calc(var(--mouse-x, 0) * 0.01deg));
	transition: transform 0.3s ease-out;
}

.universe-background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.stars {
	position: absolute;
	width: 100%;
	height: 100%;
	background-image: radial-gradient(2px 2px at 20px 30px, #fff, transparent),
		radial-gradient(
			2px 2px at 40px 70px,
			rgba(255, 255, 255, 0.8),
			transparent
		),
		radial-gradient(1px 1px at 90px 40px, #fff, transparent),
		radial-gradient(
			1px 1px at 130px 80px,
			rgba(255, 255, 255, 0.6),
			transparent
		),
		radial-gradient(2px 2px at 160px 30px, #fff, transparent);
	background-repeat: repeat;
	background-size: 200px 100px;
	animation: twinkle 4s ease-in-out infinite alternate;
	transform: translate3d(
		calc(var(--mouse-x, 0px) * 0.3),
		calc(var(--mouse-y, 0px) * 0.3),
		0
	);
	transition: transform 0.4s ease-out;
}

.cosmic-dust {
	position: absolute;
	width: 100%;
	height: 100%;
	background: radial-gradient(
			circle at 25% 25%,
			rgba(138, 43, 226, 0.1) 0%,
			transparent 50%
		),
		radial-gradient(
			circle at 75% 75%,
			rgba(72, 61, 139, 0.1) 0%,
			transparent 50%
		),
		linear-gradient(
			45deg,
			transparent 40%,
			rgba(147, 0, 211, 0.05) 50%,
			transparent 60%
		);
	animation: drift 20s linear infinite;
	transform: translate3d(
		calc(var(--mouse-x, 0px) * -0.2),
		calc(var(--mouse-y, 0px) * -0.2),
		0
	);
	transition: transform 0.5s ease-out;
}

@keyframes twinkle {
	0% {
		opacity: 0.3;
		transform: scale(1);
	}
	100% {
		opacity: 1;
		transform: scale(1.2);
	}
}

@keyframes drift {
	0% {
		transform: translateX(-10px) translateY(-10px);
	}
	50% {
		transform: translateX(10px) translateY(10px);
	}
	100% {
		transform: translateX(-10px) translateY(-10px);
	}
}

.skill-constellation {
	position: relative;
	width: 100%;
	height: 100%;
}

.skill-orb {
	position: absolute;
	transform: translate(-50%, -50%);
	cursor: pointer;
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	z-index: 2;
	opacity: 0;
	transform: translate(-50%, -50%) scale(0.3);
}

.skill-orb:hover {
	transform: translate(-50%, -50%) scale(1.2);
	z-index: 10;
}

.skill-orb:hover ~ .skill-orb {
	transform: translate(-50%, -50%) scale(0.9);
	opacity: 0.6;
}

.skill-constellation:hover .skill-orb:not(:hover) {
	filter: blur(1px);
	opacity: 0.4;
}

.orb-core {
	position: relative;
	border-radius: 50%;
	background: radial-gradient(
		circle at 30% 30%,
		rgba(255, 255, 255, 0.8) 0%,
		rgba(255, 255, 255, 0.6) 30%,
		rgba(255, 255, 255, 0.4) 60%,
		rgba(255, 255, 255, 0.2) 100%
	);
	border: 2px solid rgba(255, 255, 255, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.4s ease;
	animation: float 6s ease-in-out infinite;
}

.skill-orb:hover .orb-core {
	background: radial-gradient(
		circle at 30% 30%,
		rgba(255, 255, 255, 1) 0%,
		rgba(255, 255, 255, 0.9) 30%,
		rgba(255, 255, 255, 0.7) 60%,
		rgba(255, 255, 255, 0.5) 100%
	);
	border-color: rgba(255, 255, 255, 1);
}

@keyframes float {
	0%,
	100% {
		transform: translateY(0px) rotate(0deg);
	}
	25% {
		transform: translateY(-10px) rotate(90deg);
	}
	50% {
		transform: translateY(0px) rotate(180deg);
	}
	75% {
		transform: translateY(5px) rotate(270deg);
	}
}

.skill-icon {
	font-size: 1.8rem;
	z-index: 3;
	filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.8));
}

.pulse-ring {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100%;
	border: 2px solid rgba(255, 255, 255, 0.6);
	border-radius: 50%;
	animation: pulse 2s infinite;
	opacity: 0;
}

.skill-orb:hover .pulse-ring {
	animation: pulse 1s infinite;
	opacity: 1;
}

@keyframes pulse {
	0% {
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
	}
	100% {
		transform: translate(-50%, -50%) scale(2);
		opacity: 0;
	}
}

.energy-field {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 150%;
	height: 150%;
	border-radius: 50%;
	background: radial-gradient(
		circle,
		transparent 60%,
		rgba(255, 255, 255, 0.1) 70%,
		transparent 80%
	);
	opacity: 0;
	transition: opacity 0.4s ease;
}

.skill-orb:hover .energy-field {
	opacity: 1;
	animation: rotate 8s linear infinite;
}

@keyframes rotate {
	from {
		transform: translate(-50%, -50%) rotate(0deg);
	}
	to {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}

.skill-label {
	position: absolute;
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
	margin-top: 10px;
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.9rem;
	font-weight: 500;
	text-align: center;
	white-space: nowrap;
	opacity: 0;
	transition: opacity 0.3s ease;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.skill-orb:hover .skill-label {
	opacity: 1;
}

.skill-tooltip {
	position: fixed;
	background: rgba(0, 0, 0, 0.95);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 15px;
	padding: 1.5rem;
	width: 300px;
	z-index: 1000;
	backdrop-filter: blur(10px);
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5),
		0 0 20px rgba(255, 255, 255, 0.1);
	animation: tooltipAppear 0.3s ease-out;
	pointer-events: none; /* Prevent interference with mouse events */
}

@keyframes tooltipAppear {
	from {
		opacity: 0;
		transform: translateY(10px) scale(0.95);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}

.tooltip-header {
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
	flex-wrap: wrap;
}

.tooltip-icon {
	font-size: 2rem;
	filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
}

.tooltip-header h3 {
	color: #fff;
	font-size: 1.3rem;
	margin: 0;
	flex: 1;
}

.skill-mastery {
	width: 100%;
	margin-top: 1rem;
}

.mastery-label {
	color: #ccc;
	font-size: 0.9rem;
	margin-bottom: 0.5rem;
}

.mastery-meter {
	width: 100%;
	height: 8px;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 4px;
	overflow: hidden;
	margin-bottom: 0.5rem;
}

.mastery-fill {
	height: 100%;
	background: linear-gradient(90deg, #fff 0%, #ccc 100%);
	border-radius: 4px;
	transition: width 0.8s ease;
}

.mastery-percentage {
	color: #fff;
	font-weight: 600;
	font-size: 0.9rem;
}

.tooltip-description {
	color: #ccc;
	line-height: 1.6;
	margin-bottom: 1rem;
}

.skill-category {
	display: inline-block;
	background: rgba(255, 255, 255, 0.1);
	color: #fff;
	padding: 0.3rem 0.8rem;
	border-radius: 12px;
	font-size: 0.8rem;
	border: 1px solid rgba(255, 255, 255, 0.3);
}

.connection-lines {
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
}

/* Enhanced 3D Background Effects */
body::before {
	content: "";
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-image: radial-gradient(
			circle at 25% 25%,
			rgba(255, 255, 255, 0.1) 1px,
			transparent 1px
		),
		radial-gradient(
			circle at 75% 75%,
			rgba(255, 255, 255, 0.08) 1px,
			transparent 1px
		),
		radial-gradient(
			circle at 50% 10%,
			rgba(120, 119, 198, 0.15) 2px,
			transparent 2px
		),
		radial-gradient(
			circle at 90% 60%,
			rgba(255, 119, 198, 0.12) 1px,
			transparent 1px
		),
		radial-gradient(
			circle at 10% 90%,
			rgba(120, 219, 255, 0.1) 1px,
			transparent 1px
		);
	background-size: 300px 300px, 250px 250px, 400px 400px, 350px 350px,
		280px 280px;
	background-position: 0 0, 50px 50px, 0 0, 100px 20px, 150px 150px;
	animation: floatParticles 20s ease-in-out infinite;
	pointer-events: none;
	z-index: -3;
	transform: translate3d(var(--mouse-x, 0px), var(--mouse-y, 0px), 0)
		scale(1.1);
	transition: transform 0.4s ease-out;
}

@keyframes floatParticles {
	0%,
	100% {
		background-position: 0 0, 50px 50px, 0 0, 100px 20px, 150px 150px;
	}
	25% {
		background-position: 20px 10px, 70px 60px, 15px 5px, 120px 30px,
			170px 160px;
	}
	50% {
		background-position: 10px 20px, 60px 70px, 8px 12px, 110px 40px,
			160px 170px;
	}
	75% {
		background-position: 30px 5px, 80px 40px, 20px 8px, 130px 15px,
			180px 140px;
	}
}

/* Dynamic gradient overlay that responds to mouse */
.hero::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: radial-gradient(
		800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
		rgba(255, 255, 255, 0.1) 0%,
		rgba(120, 119, 198, 0.05) 30%,
		transparent 50%
	);
	pointer-events: none;
	z-index: 1;
	transition: background 0.3s ease;
}

/* Responsive adjustments for skills universe */
@media (max-width: 768px) {
	.skills-universe {
		height: 60vh;
		min-height: 500px;
	}

	.skill-orb {
		transform: translate(-50%, -50%) scale(0.8);
	}

	.skill-tooltip {
		width: 260px;
		padding: 1rem;
	}

	.orb-core {
		width: 50px !important;
		height: 50px !important;
	}

	.skill-icon {
		font-size: 1.4rem;
	}
}

/* Projects Section */
.projects {
	padding: 100px 0;
	background: radial-gradient(
		ellipse at 20% 70%,
		rgba(75, 0, 130, 0.15) 0%,
		rgba(25, 25, 112, 0.08) 25%,
		transparent 60%
	);
	position: relative;
}

.projects::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: radial-gradient(
			circle at 75% 25%,
			rgba(138, 43, 226, 0.08) 0%,
			transparent 35%
		),
		radial-gradient(
			circle at 25% 75%,
			rgba(72, 61, 139, 0.08) 0%,
			transparent 35%
		),
		linear-gradient(
			-45deg,
			transparent 30%,
			rgba(147, 0, 211, 0.02) 50%,
			transparent 70%
		);
	animation: cosmicFlow 25s linear infinite reverse;
	pointer-events: none;
}

.project-filters {
	display: flex;
	justify-content: center;
	gap: 1rem;
	margin-bottom: 3rem;
	position: relative;
	z-index: 2;
}

.filter-btn {
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	color: #aaaaaa;
	border: 2px solid rgba(255, 255, 255, 0.15);
	padding: 12px 24px;
	border-radius: 25px;
	cursor: pointer;
	transition: all 0.4s ease;
	font-weight: 500;
	text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.filter-btn:hover,
.filter-btn.active {
	color: #ffffff;
	border-color: rgba(255, 255, 255, 0.6);
	background: rgba(255, 255, 255, 0.12);
	transform: translateY(-2px);
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
	box-shadow: 0 10px 25px rgba(0, 0, 255, 255, 0.3),
		0 0 20px rgba(255, 255, 255, 0.1);
}

.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 2rem;
	position: relative;
	z-index: 2;
}

.project-card {
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(15px);
	border-radius: 20px;
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.15);
	transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
	cursor: pointer;
	box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
	position: relative;
	transform-style: preserve-3d;
}

.project-card::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		45deg,
		transparent 30%,
		rgba(255, 255, 255, 0.05) 50%,
		transparent 70%
	);
	opacity: 0;
	transition: opacity 0.4s ease;
}

.project-card:hover::before {
	opacity: 1;
}

.project-card:hover {
	transform: translateY(-15px);
	background: rgba(255, 255, 255, 0.12);
	border-color: rgba(255, 255, 255, 0.25);
	box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5),
		0 0 30px rgba(255, 255, 255, 0.15);
}

.project-image {
	height: 200px;
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.9) 0%,
		rgba(255, 255, 255, 0.7) 50%,
		rgba(255, 255, 255, 0.9) 100%
	);
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.project-placeholder {
	font-size: 4rem;
	font-weight: 700;
	color: #000000;
	text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.project-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.85);
	backdrop-filter: blur(5px);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.4s ease;
}

.project-card:hover .project-overlay {
	opacity: 1;
}

.project-links {
	display: flex;
	gap: 1rem;
}

.project-link {
	color: #ffffff;
	text-decoration: none;
	padding: 12px 20px;
	border: 1px solid rgba(255, 255, 255, 0.6);
	border-radius: 8px;
	transition: all 0.3s ease;
	cursor: pointer;
	text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
	box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

.project-link:hover {
	background: rgba(255, 255, 255, 0.15);
	border-color: rgba(255, 255, 255, 0.9);
	transform: translateY(-2px);
	box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
}

.project-content {
	padding: 1.8rem;
}

.project-content h3 {
	color: #ffffff;
	font-size: 1.4rem;
	margin-bottom: 0.8rem;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.project-content p {
	color: #aaaaaa;
	margin-bottom: 1.2rem;
	line-height: 1.6;
	text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}

.project-tech {
	display: flex;
	flex-wrap: wrap;
	gap: 0.6rem;
}

.tech-tag {
	background: rgba(255, 255, 255, 0.12);
	backdrop-filter: blur(5px);
	color: #ffffff;
	padding: 0.4rem 1rem;
	border-radius: 20px;
	font-size: 0.85rem;
	border: 1px solid rgba(255, 255, 255, 0.2);
	text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;
}

.tech-tag:hover {
	background: rgba(255, 255, 255, 0.18);
	border-color: rgba(255, 255, 255, 0.4);
	transform: translateY(-1px);
}

/* Contact Section */
.contact {
	padding: 100px 0;
	background: radial-gradient(
		ellipse at 50% 100%,
		rgba(75, 0, 130, 0.2) 0%,
		rgba(25, 25, 112, 0.1) 25%,
		transparent 60%
	);
	position: relative;
}

.contact::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: radial-gradient(
			circle at 30% 30%,
			rgba(138, 43, 226, 0.1) 0%,
			transparent 40%
		),
		radial-gradient(
			circle at 70% 70%,
			rgba(72, 61, 139, 0.1) 0%,
			transparent 40%
		);
	animation: cosmicFlow 30s linear infinite;
	pointer-events: none;
}

.contact-content {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 4rem;
	align-items: start;
	position: relative;
	z-index: 2;
}

.contact-info h3 {
	font-size: 2rem;
	color: #ffffff;
	margin-bottom: 1.5rem;
	text-shadow: 0 0 15px rgba(255, 255, 255, 0.6),
		0 0 30px rgba(255, 255, 255, 0.3);
}

.contact-info p {
	color: #aaaaaa;
	font-size: 1.1rem;
	line-height: 1.8;
	margin-bottom: 2rem;
	text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

.contact-methods {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.contact-method {
	display: flex;
	align-items: center;
	gap: 1rem;
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(15px);
	padding: 1.2rem;
	border-radius: 15px;
	border: 1px solid rgba(255, 255, 255, 0.15);
	transition: all 0.4s ease;
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.contact-method:hover {
	background: rgba(255, 255, 255, 0.12);
	border-color: rgba(255, 255, 255, 0.25);
	transform: translateX(10px);
	box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4),
		0 0 25px rgba(255, 255, 255, 0.1);
}

.contact-icon {
	font-size: 1.5rem;
	width: 55px;
	height: 55px;
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.9) 0%,
		rgba(255, 255, 255, 0.7) 50%,
		rgba(255, 255, 255, 0.9) 100%
	);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 0 20px rgba(255, 255, 255, 0.3),
		inset 0 0 10px rgba(255, 255, 255, 0.2);
}

.contact-details h4 {
	color: #ffffff;
	margin-bottom: 0.25rem;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.contact-details p {
	color: #aaaaaa;
	margin: 0;
	text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
}

.contact-form {
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(15px);
	padding: 2.5rem;
	border-radius: 20px;
	border: 1px solid rgba(255, 255, 255, 0.15);
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4),
		0 0 30px rgba(255, 255, 255, 0.1);
}

.form-group {
	margin-bottom: 1.5rem;
}

.form-input,
.form-textarea {
	width: 100%;
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.15);
	border-radius: 12px;
	padding: 1.2rem;
	color: #ffffff;
	font-size: 1rem;
	transition: all 0.4s ease;
	cursor: text;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.form-input:focus,
.form-textarea:focus {
	outline: none;
	border-color: rgba(255, 255, 255, 0.4);
	background: rgba(255, 255, 255, 0.12);
	box-shadow: 0 0 20px rgba(255, 255, 255, 0.2), 0 8px 25px rgba(0, 0, 0, 0.3);
}

.form-input::placeholder,
.form-textarea::placeholder {
	color: #aaaaaa;
	text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}

.form-textarea {
	resize: vertical;
	min-height: 120px;
}

/* Footer */
.footer {
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(15px);
	padding: 2.5rem 0;
	border-top: 1px solid rgba(255, 255, 255, 0.15);
	position: relative;
}

.footer::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		90deg,
		transparent 0%,
		rgba(255, 255, 255, 0.02) 25%,
		rgba(255, 255, 255, 0.05) 50%,
		rgba(255, 255, 255, 0.02) 75%,
		transparent 100%
	);
	pointer-events: none;
}

.footer-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	z-index: 2;
}

.footer-text p {
	color: #aaaaaa;
	text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

.social-links {
	display: flex;
	gap: 1.5rem;
}

.social-link {
	color: #aaaaaa;
	text-decoration: none;
	transition: all 0.3s ease;
	cursor: pointer;
	padding: 0.8rem;
	border-radius: 8px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	background: rgba(255, 255, 255, 0.05);
	text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}

.social-link:hover {
	color: #ffffff;
	background: rgba(255, 255, 255, 0.1);
	border-color: rgba(255, 255, 255, 0.3);
	transform: translateY(-2px);
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
	box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
	.hamburger {
		display: flex;
		cursor: pointer;
	}

	.nav-menu {
		position: fixed;
		left: -100%;
		top: 70px;
		flex-direction: column;
		background-color: rgba(0, 0, 0, 0.95);
		width: 100%;
		text-align: center;
		transition: 0.3s;
		padding: 2rem 0;
	}

	.nav-menu.active {
		left: 0;
	}

	.hero-content {
		grid-template-columns: 1fr;
		text-align: center;
		gap: 2rem;
	}

	.hero-title {
		font-size: 2.5rem;
	}

	.hero-subtitle {
		font-size: 1.5rem;
	}

	.hero-buttons {
		justify-content: center;
		flex-wrap: wrap;
	}

	.about-content {
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	.stats {
		justify-content: center;
	}

	.skills-grid {
		grid-template-columns: 1fr;
	}

	.projects-grid {
		grid-template-columns: 1fr;
	}

	.contact-content {
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	.footer-content {
		flex-direction: column;
		gap: 1rem;
		text-align: center;
	}

	.section-title {
		font-size: 2rem;
	}
}

@media (max-width: 480px) {
	.hero-title {
		font-size: 2rem;
	}

	.hero-subtitle {
		font-size: 1.2rem;
	}

	.hero-description {
		font-size: 1rem;
	}

	.btn-primary,
	.btn-secondary {
		padding: 12px 24px;
		font-size: 1rem;
	}

	.profile-img {
		width: 200px;
		height: 200px;
	}

	.placeholder-avatar {
		font-size: 4rem;
	}
}

/* Animation Classes */
section {
	opacity: 0;
	transform: translateY(50px);
	transition: all 0.8s ease;
}

section.animate {
	opacity: 1;
	transform: translateY(0);
}
</style>
