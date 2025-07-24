<script setup>
import { ref, onMounted, watch } from "vue";
import FloatingShapes from "./components/FloatingShapes.vue";

const loading = ref(true);

onMounted(() => {
	setTimeout(() => {
		loading.value = false;
	}, 2000);
});

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
	{ label: "Projects Completed", value: 6, suffix: "+" },
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
const form = ref({
	name: "",
	email: "",
	subject: "",
	message: "",
});

// Methods
const toggleMobileMenu = () => {
	mobileMenuOpen.value = !mobileMenuOpen.value;
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
	console.log("Form submitted:", form.value);
	alert("Message sent successfully!");

	form.value = {
		name: "",
		email: "",
		subject: "",
		message: "",
	};
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
		<div v-show="!loading" class="portfolio" style="position: relative">
			<FloatingShapes />
			<header class="header">
				<div class="container">
					<a href="#" class="logo"> 1DEV </a>

					<nav class="nav">
						<a href="#work" @click="smoothScroll">Work</a>
						<a href="#about" @click="smoothScroll">About</a>
						<a href="#services" @click="smoothScroll">Services</a>
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
					<a href="#contact" @click="smoothScroll">Contact</a>
				</div>
			</header>

			<section class="hero" style="position: relative; overflow: hidden">
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
								Creating exceptional digital experiences that
								blend aesthetics with functionality to solve
								real user problems.
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
							<img src="../public/myImage/ORDOVEZ_EARL_2A .jpg" />
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
							Featured <span class="accent">Projects</span>
						</h2>
						<p class="section-description">
							A showcase of my most significant projects,
							demonstrating my skills in web and game development.
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
								<span class="project-category">Web App</span>
								<h3 class="project-title">BootTek</h3>
								<p class="project-description">
									An online coding platform where you can
									learn various programming languages through
									interactive lessons, real-time code editors,
									and hands-on projects.
								</p>
								<div class="project-tags">
									<span class="tag">Frontend</span>
									<span class="tag">Backend</span>
									<span class="tag">UI/UX Design</span>
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
								<h3 class="project-title">Clashing Grid</h3>
								<p class="project-description">
									Python game built with Pygame. It features
									local and multiplayer modes where players
									expand their pieces on a grid, aiming to
									outmaneuver and outscore their opponent.
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
									A professional-grade underwater search and
									rescue simulation system featuring advanced
									sonar navigation and optical sensor.
								</p>
								<div class="project-tags">
									<span class="tag">Three.js</span>
									<span class="tag">Fusion 360</span>
									<span class="tag">3D Modelling</span>
									<span class="tag">Vue.js</span>
								</div>
							</div>
						</div>

						<div class="project-card">
							<div class="project-image">
								<img src="../public/Projects/4.png" />
								<button
									onclick="window.open('https://swif7ify.github.io/Autonomous-Robot-Pathfinding-Simulator/', '_blank')"
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
									Autonomous Robot Pathfinding Simulator
								</h3>
								<p class="project-description">
									A 3D autonomous search and
									rescue/pathfinding simulator built with Vue
									3, Vite, and Three.js. Simulate robot
									navigation, LiDAR scanning, and AI-driven
									search patterns in a dynamic environment.
								</p>
								<div class="project-tags">
									<span class="tag">Three.js</span>
									<span class="tag">Vue.js</span>
								</div>
							</div>
						</div>
					</div>

					<div class="view-all">
						<a href="#" class="btn btn-secondary"
							>View All Projects</a
						>
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
								Hi, I'm Earl Romeo Ordovez, a passionate web and
								game developer with a knack for creating
								immersive digital experiences. With a strong
								background in both frontend and backend
								development, I specialize in building intuitive,
								user-friendly applications that not only look
								great but also perform seamlessly.
							</p>
							<p class="about-description">
								I have a keen interest in game development,
								leveraging my skills in 3D modeling and
								programming to create engaging and interactive
								games. My approach combines creativity with
								technical expertise, ensuring that every project
								is not only functional but also visually
								stunning.
							</p>

							<h3 class="skills-title">My Skills</h3>
							<div class="skills">
								<span class="skill">UI & UX Design</span>
								<span class="skill">Web Development</span>
								<span class="skill">Game Development</span>
								<span class="skill"
									>Application Development</span
								>
								<span class="skill">3D Modeling</span>
							</div>

							<a href="#" class="btn btn-primary"
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
							My <span class="accent">Services</span>
						</h2>
						<p class="section-description">
							I offer a comprehensive range of design services to
							help businesses create exceptional digital
							experiences.
						</p>
					</div>

					<div class="services-grid">
						<div class="service-card">
							<div class="service-icon">
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
										d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									></path>
								</svg>
							</div>
							<h3 class="service-title">UI Design</h3>
							<p class="service-description">
								Creating visually stunning interfaces that align
								with your brand identity and provide a seamless
								user experience.
							</p>
						</div>

						<div class="service-card">
							<div class="service-icon">
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
										d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
									></path>
								</svg>
							</div>
							<h3 class="service-title">UX Research</h3>
							<p class="service-description">
								Conducting in-depth user research to understand
								your audience's needs, behaviors, and pain
								points.
							</p>
						</div>

						<div class="service-card">
							<div class="service-icon">
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
										d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
									></path>
								</svg>
							</div>
							<h3 class="service-title">Design Systems</h3>
							<p class="service-description">
								Building comprehensive design systems that
								ensure consistency and scalability across all
								your digital products.
							</p>
						</div>

						<div class="service-card">
							<div class="service-icon">
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
										d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
									></path>
								</svg>
							</div>
							<h3 class="service-title">Prototyping</h3>
							<p class="service-description">
								Creating interactive prototypes that allow you
								to test and validate your ideas before
								development.
							</p>
						</div>

						<div class="service-card">
							<div class="service-icon">
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
										d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
									></path>
								</svg>
							</div>
							<h3 class="service-title">Responsive Design</h3>
							<p class="service-description">
								Ensuring your digital products look and function
								perfectly across all devices and screen sizes.
							</p>
						</div>

						<div class="service-card">
							<div class="service-icon">
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
										d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									></path>
								</svg>
							</div>
							<h3 class="service-title">Design to Development</h3>
							<p class="service-description">
								Collaborating with development teams to ensure
								designs are implemented accurately and
								efficiently.
							</p>
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
							Client <span class="accent">Testimonials</span>
						</h2>
						<p class="section-description">
							Don't just take my word for it. Here's what my
							clients have to say about working with me.
						</p>
					</div>

					<div class="testimonials-grid">
						<div class="testimonial-card">
							<div class="testimonial-header">
								<div class="avatar">S</div>
								<div class="client-info">
									<h4 class="client-name">Sarah Johnson</h4>
									<p class="client-title">CEO, TechStart</p>
								</div>
							</div>
							<p class="testimonial-text">
								"Working with this designer was a game-changer
								for our product. They understood our vision
								perfectly and delivered a design that exceeded
								our expectations. Our user engagement has
								increased by 40% since the redesign."
							</p>
						</div>

						<div class="testimonial-card">
							<div class="testimonial-header">
								<div class="avatar">M</div>
								<div class="client-info">
									<h4 class="client-name">Michael Chen</h4>
									<p class="client-title">
										Product Manager, FinanceApp
									</p>
								</div>
							</div>
							<p class="testimonial-text">
								"The attention to detail and user-centered
								approach was impressive. They didn't just make
								our app look better, they made it work better
								for our users. The design process was
								collaborative and insightful."
							</p>
						</div>

						<div class="testimonial-card">
							<div class="testimonial-header">
								<div class="avatar">A</div>
								<div class="client-info">
									<h4 class="client-name">
										Amanda Rodriguez
									</h4>
									<p class="client-title">
										Marketing Director, LuxuryBrand
									</p>
								</div>
							</div>
							<p class="testimonial-text">
								"Our e-commerce platform needed a complete
								overhaul, and this designer delivered beyond our
								expectations. The new design not only looks
								stunning but has significantly improved our
								conversion rates."
							</p>
						</div>
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
								Let's <span class="accent">Connect</span>
							</h2>
							<p class="contact-description">
								Have a project in mind? Let's discuss how I can
								help bring your vision to life. Fill out the
								form and I'll get back to you within 24 hours.
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
								<a href="#" class="social-link">
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
								<a href="#" class="social-link">
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
								<a href="#" class="social-link">
									<svg
										width="24"
										height="24"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"
										></path>
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
								Creating exceptional digital experiences.
							</p>
						</div>

						<div class="footer-nav">
							<a href="#work" @click="smoothScroll">Work</a>
							<a href="#about" @click="smoothScroll">About</a>
							<a href="#services" @click="smoothScroll"
								>Services</a
							>
							<a href="#contact" @click="smoothScroll">Contact</a>
						</div>
					</div>

					<div class="footer-bottom">
						<p class="copyright">
							© 2025 1DEV. All rights reserved.
						</p>

						<div class="social-links small">
							<a href="#" class="social-link">
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
							<a href="#" class="social-link">
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
							<a href="#" class="social-link">
								<svg
									width="20"
									height="20"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"
									></path>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	</div>
</template>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
</style>

<style src="/src/assets/app.css"></style>
