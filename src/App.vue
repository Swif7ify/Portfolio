<script setup>
import { ref, onMounted, watch } from "vue";
import FloatingShapes from "./components/FloatingShapes.vue";

// Loader state
const loading = ref(true);

onMounted(() => {
	setTimeout(() => {
		loading.value = false;
	}, 2000);
});

// Animated number composable
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

// Stats data and animation
const stats = [
	{ label: "Years Experience", value: 10, suffix: "+" },
	{ label: "Projects Completed", value: 150, suffix: "+" },
	{ label: "Design Awards", value: 30, suffix: "+" },
	{ label: "Client Satisfaction", value: 98, suffix: "%" },
];

const animatedStats = stats.map((stat) => {
	const { display, start } = useCountUp(stat.value);
	return { ...stat, display, start };
});

// Start animation when loader finishes
watch(loading, (val) => {
	if (!val) {
		animatedStats.forEach((stat) => stat.start());
	}
});

// Reactive state
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

		// Close mobile menu if open
		if (mobileMenuOpen.value) {
			mobileMenuOpen.value = false;
		}
	}
};

const submitForm = () => {
	// Handle form submission here
	console.log("Form submitted:", form.value);
	alert("Message sent successfully!");

	// Reset form
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
		<!-- Loader -->
		<transition name="fade">
			<div v-if="loading" class="loader-overlay">
				<FloatingShapes />
				<span class="loader-text">
					<span
						class="letter"
						v-for="(char, i) in 'ALEX MORGAN'"
						:key="i"
						:style="{ animationDelay: i * 0.07 + 's' }"
					>
						{{ char === " " ? "\u00A0" : char }}
					</span>
				</span>
			</div>
		</transition>
		<!-- Main Content -->
		<div v-show="!loading" class="portfolio" style="position: relative">
			<FloatingShapes />
			<!-- Navigation -->
			<header class="header">
				<div class="container">
					<a href="#" class="logo">DESIGNER</a>

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

				<!-- Mobile Menu -->
				<div v-show="mobileMenuOpen" class="mobile-menu">
					<a href="#work" @click="smoothScroll">Work</a>
					<a href="#about" @click="smoothScroll">About</a>
					<a href="#services" @click="smoothScroll">Services</a>
					<a href="#contact" @click="smoothScroll">Contact</a>
				</div>
			</header>

			<!-- Hero Section -->
			<section class="hero" style="position: relative; overflow: hidden">
				<!-- Hero blob removed as requested -->
				<FloatingShapes />
				<div class="container">
					<div class="hero-content">
						<div class="hero-text">
							<h1 class="hero-title">
								UI/UX
								<span class="accent underline-animate"
									>Designer</span
								>
								& Creative Director
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
							<div class="floating-cta">
								<a
									href="#contact"
									class="btn btn-primary pulse"
									@click="smoothScroll"
								>
									Let's Collaborate!
								</a>
							</div>
						</div>

						<div class="hero-image">
							<div class="hero-placeholder">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="128"
									height="128"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									></path>
								</svg>
							</div>
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

			<!-- Work Section -->
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
							A selection of my award-winning work across various
							industries and design challenges.
						</p>
					</div>

					<div class="projects-grid">
						<!-- Project 1 -->
						<div class="project-card">
							<div class="project-image">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="80"
									height="80"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
									></path>
								</svg>
							</div>
							<div class="project-content">
								<span class="project-category">Mobile App</span>
								<h3 class="project-title">
									FinTech Revolution
								</h3>
								<p class="project-description">
									Redesigned a leading financial app,
									increasing user engagement by 45% and
									improving conversion rates.
								</p>
								<div class="project-tags">
									<span class="tag">UX Research</span>
									<span class="tag">UI Design</span>
									<span class="tag">Prototyping</span>
								</div>
							</div>
						</div>

						<!-- Project 2 -->
						<div class="project-card">
							<div class="project-image">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="80"
									height="80"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
									></path>
								</svg>
							</div>
							<div class="project-content">
								<span class="project-category">E-commerce</span>
								<h3 class="project-title">
									Luxury Retail Platform
								</h3>
								<p class="project-description">
									Created an immersive shopping experience for
									a luxury brand, resulting in 60% increase in
									time spent on site.
								</p>
								<div class="project-tags">
									<span class="tag">UX Design</span>
									<span class="tag">Visual Design</span>
									<span class="tag">Animation</span>
								</div>
							</div>
						</div>

						<!-- Project 3 -->
						<div class="project-card">
							<div class="project-image">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="80"
									height="80"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									></path>
								</svg>
							</div>
							<div class="project-content">
								<span class="project-category">Dashboard</span>
								<h3 class="project-title">
									Analytics Platform
								</h3>
								<p class="project-description">
									Designed an intuitive analytics dashboard
									that simplified complex data visualization
									for non-technical users.
								</p>
								<div class="project-tags">
									<span class="tag"
										>Information Architecture</span
									>
									<span class="tag">Data Visualization</span>
									<span class="tag">UI Design</span>
								</div>
							</div>
						</div>

						<!-- Project 4 -->
						<div class="project-card">
							<div class="project-image">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="80"
									height="80"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									></path>
								</svg>
							</div>
							<div class="project-content">
								<span class="project-category"
									>Health Tech</span
								>
								<h3 class="project-title">Wellness Tracker</h3>
								<p class="project-description">
									Created a user-friendly health monitoring
									app that simplifies tracking daily wellness
									metrics.
								</p>
								<div class="project-tags">
									<span class="tag">UX Design</span>
									<span class="tag">Data Visualization</span>
									<span class="tag">UI Design</span>
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

			<!-- About Section -->
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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="96"
										height="96"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										></path>
									</svg>
								</div>
							</div>
						</div>

						<div class="about-text">
							<h2 class="section-title">
								About <span class="accent">Me</span>
							</h2>
							<p class="about-description">
								I'm a passionate UI/UX designer with over 10
								years of experience creating user-centered
								digital experiences. My approach combines
								aesthetic sensibility with a deep understanding
								of user behavior to create designs that are both
								beautiful and functional.
							</p>
							<p class="about-description">
								I believe that great design is invisible – it
								should feel intuitive and natural to the user.
								My goal is to solve complex problems with
								simple, elegant solutions that delight users and
								help businesses achieve their objectives.
							</p>

							<h3 class="skills-title">My Skills</h3>
							<div class="skills">
								<span class="skill">UI Design</span>
								<span class="skill">UX Research</span>
								<span class="skill">Wireframing</span>
								<span class="skill">Prototyping</span>
								<span class="skill">User Testing</span>
								<span class="skill">Design Systems</span>
							</div>

							<a href="#" class="btn btn-primary"
								>Download Resume</a
							>
						</div>
					</div>
				</div>
			</section>

			<!-- Services Section -->
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
						<!-- Service 1 -->
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

						<!-- Service 2 -->
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

						<!-- Service 3 -->
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

						<!-- Service 4 -->
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

						<!-- Service 5 -->
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

						<!-- Service 6 -->
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

			<!-- Testimonials Section -->
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
						<!-- Testimonial 1 -->
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

						<!-- Testimonial 2 -->
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

						<!-- Testimonial 3 -->
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

			<!-- Contact Section -->
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
									<span>hello@designerportfolio.com</span>
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
									<span>+1 (555) 123-4567</span>
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
									<span>San Francisco, CA</span>
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

			<!-- Footer -->
			<footer class="footer">
				<div class="container">
					<div class="footer-content">
						<div class="footer-brand">
							<a href="#" class="logo">DESIGNER</a>
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
							© 2023 Designer Portfolio. All rights reserved.
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

.portfolio {
	background-color: #111111;
	color: #ffffff;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
		Roboto, sans-serif;
	line-height: 1.6;
}

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
}

.accent {
	color: #ff4500;
}

/* Buttons */
.btn {
	display: inline-block;
	padding: 12px 32px;
	border-radius: 50px;
	text-decoration: none;
	font-weight: 500;
	transition: all 0.3s ease;
	border: none;
	cursor: pointer;
	font-size: 16px;
}

.btn-primary {
	background-color: #ea580c;
	color: white;
}

.btn-primary:hover {
	background-color: #dc2626;
}

.btn-secondary {
	background-color: transparent;
	color: white;
	border: 2px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

.btn.full-width {
	width: 100%;
}

/* Header */
.header {
	padding: 24px 0;
}

.header .container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.logo {
	font-size: 24px;
	font-weight: bold;
	color: white;
	text-decoration: none;
}

.nav {
	display: flex;
	gap: 32px;
}

.nav a {
	color: white;
	text-decoration: none;
	transition: color 0.3s ease;
}

.nav a:hover {
	color: #ea580c;
}

.mobile-menu-btn {
	display: none;
	background: none;
	border: none;
	color: white;
	cursor: pointer;
}

.mobile-menu {
	display: none;
	margin-top: 16px;
	padding: 16px 0;
}

.mobile-menu a {
	display: block;
	color: #d1d5db;
	text-decoration: none;
	padding: 8px 0;
	transition: color 0.3s ease;
}

.mobile-menu a:hover {
	color: #ea580c;
}

/* Hero Section */
.hero {
	padding: 80px 0;
}

.hero-content {
	display: flex;
	align-items: center;
	margin-bottom: 80px;
}

.hero-text {
	flex: 1;
	margin-right: 40px;
}

.hero-title {
	font-size: 4rem;
	font-weight: bold;
	line-height: 1.1;
	margin-bottom: 24px;
}

.hero-description {
	font-size: 20px;
	color: #d1d5db;
	margin-bottom: 32px;
	max-width: 600px;
}

.hero-buttons {
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
}

.hero-image {
	flex: 1;
}

.hero-placeholder {
	width: 100%;
	height: 384px;
	background: linear-gradient(135deg, #ea580c, #f97316);
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
}

.stats {
	display: flex;
	justify-content: center;
	gap: 80px;
	flex-wrap: wrap;
}

.stat {
	text-align: center;
}

.stat-number {
	font-size: 36px;
	font-weight: bold;
	margin-bottom: 8px;
}

.stat-label {
	color: #9ca3af;
}

/* Work Section */
.work {
	padding: 80px 0;
	background-color: #000000;
}

.section-header {
	margin-bottom: 48px;
}

.section-header.centered {
	text-align: center;
}

.section-title {
	font-size: 3rem;
	font-weight: bold;
	margin-bottom: 24px;
}

.section-description {
	font-size: 20px;
	color: #d1d5db;
	max-width: 768px;
}

.section-header.centered .section-description {
	margin: 0 auto;
}

.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	gap: 32px;
	margin-bottom: 48px;
}

.project-card {
	background-color: #18181b;
	border-radius: 12px;
	overflow: hidden;
	transition: transform 0.3s ease;
}

.project-card:hover {
	transform: translateY(-10px);
}

.project-image {
	height: 256px;
	background: linear-gradient(135deg, #ea580c, #f97316);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
}

.project-content {
	padding: 24px;
}

.project-category {
	color: #ea580c;
	font-size: 14px;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.project-title {
	font-size: 24px;
	font-weight: bold;
	margin: 8px 0;
}

.project-description {
	color: #9ca3af;
	margin: 8px 0 16px;
}

.project-tags {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.tag {
	background-color: #27272a;
	color: #d1d5db;
	padding: 4px 12px;
	border-radius: 20px;
	font-size: 12px;
}

.view-all {
	text-align: center;
}

/* About Section */
.about {
	padding: 80px 0;
}

.about-content {
	display: flex;
	align-items: center;
}

.about-image {
	flex: 1;
	margin-right: 48px;
}

.about-placeholder {
	width: 100%;
	height: 384px;
	background-color: #18181b;
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.profile-circle {
	width: 192px;
	height: 192px;
	border-radius: 50%;
	background: linear-gradient(135deg, #ea580c, #f97316);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
}

.about-text {
	flex: 1;
}

.about-description {
	font-size: 20px;
	color: #d1d5db;
	margin-bottom: 24px;
}

.skills-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 16px;
}

.skills {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	margin-bottom: 32px;
}

.skill {
	background-color: #18181b;
	color: white;
	padding: 8px 16px;
	border-radius: 20px;
	font-size: 14px;
	font-weight: 500;
}

/* Services Section */
.services {
	padding: 80px 0;
	background-color: #000000;
}

.services-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 32px;
}

.service-card {
	background-color: #18181b;
	padding: 32px;
	border-radius: 12px;
}

.service-icon {
	width: 64px;
	height: 64px;
	background-color: rgba(234, 88, 12, 0.2);
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 24px;
	color: #ea580c;
}

.service-title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 16px;
}

.service-description {
	color: #9ca3af;
}

/* Testimonials Section */
.testimonials {
	padding: 80px 0;
}

.testimonials-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 32px;
}

.testimonial-card {
	background-color: #18181b;
	padding: 32px;
	border-radius: 12px;
}

.testimonial-header {
	display: flex;
	align-items: center;
	margin-bottom: 24px;
}

.avatar {
	width: 48px;
	height: 48px;
	background-color: #ea580c;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: bold;
	font-size: 20px;
	margin-right: 16px;
}

.client-name {
	font-weight: bold;
	margin-bottom: 4px;
}

.client-title {
	color: #9ca3af;
	font-size: 14px;
}

.testimonial-text {
	color: #d1d5db;
}

/* Contact Section */
.contact {
	padding: 80px 0;
	background-color: #000000;
}

.contact-content {
	display: flex;
	gap: 48px;
}

.contact-info {
	flex: 1;
}

.contact-description {
	font-size: 20px;
	color: #d1d5db;
	margin-bottom: 32px;
}

.contact-details {
	margin-bottom: 32px;
}

.contact-item {
	display: flex;
	align-items: center;
	margin-bottom: 16px;
}

.contact-icon {
	width: 48px;
	height: 48px;
	background-color: #18181b;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 16px;
	color: #ea580c;
}

.social-links {
	display: flex;
	gap: 24px;
}

.social-links.small {
	gap: 16px;
}

.social-link {
	color: #9ca3af;
	transition: color 0.3s ease;
}

.social-link:hover {
	color: #ea580c;
}

.contact-form {
	flex: 1;
	background-color: #18181b;
	padding: 32px;
	border-radius: 12px;
}

.form-group {
	margin-bottom: 24px;
}

.form-group label {
	display: block;
	color: #d1d5db;
	margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
	width: 100%;
	background-color: #27272a;
	border: 1px solid #3f3f46;
	border-radius: 8px;
	padding: 12px 16px;
	color: white;
	font-size: 16px;
	transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
	outline: none;
	border-color: #ea580c;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
	color: #9ca3af;
}

/* Footer */
.footer {
	padding: 48px 0;
	border-top: 1px solid #27272a;
}

.footer-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 48px;
}

.footer-tagline {
	color: #9ca3af;
	margin-top: 8px;
}

.footer-nav {
	display: flex;
	gap: 32px;
}

.footer-nav a {
	color: #d1d5db;
	text-decoration: none;
	transition: color 0.3s ease;
}

.footer-nav a:hover {
	color: #ea580c;
}

.footer-bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 32px;
	border-top: 1px solid #27272a;
}

.copyright {
	color: #9ca3af;
}

/* Loader */
.loader-overlay {
	position: fixed;
	inset: 0;
	background: #111111; /* Match .portfolio background */
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
	transition: opacity 0.5s;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
		Roboto, sans-serif; /* Match main font */
}

.loader-text {
	font-size: 2.5rem;
	font-weight: bold;
	color: #ff4500; /* Use accent color */
	letter-spacing: 0.1em;
	display: flex;
}

.letter {
	display: inline-block;
	opacity: 0;
	animation: fadeIn 0.7s forwards;
}

@keyframes fadeIn {
	0% {
		opacity: 0;
		transform: translateY(10px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
	.container {
		padding: 0 1rem;
	}

	.nav {
		display: none;
	}

	.mobile-menu-btn {
		display: block;
	}

	.mobile-menu {
		display: block;
	}

	.hero-title {
		font-size: 2.5rem;
	}

	.hero-content {
		flex-direction: column;
		text-align: center;
	}

	.hero-text {
		margin-right: 0;
		margin-bottom: 40px;
	}

	.hero-buttons {
		justify-content: center;
	}

	.stats {
		gap: 40px;
	}

	.section-title {
		font-size: 2.5rem;
	}

	.projects-grid {
		grid-template-columns: 1fr;
	}

	.about-content {
		flex-direction: column;
		text-align: center;
	}

	.about-image {
		margin-right: 0;
		margin-bottom: 40px;
	}

	.services-grid {
		grid-template-columns: 1fr;
	}

	.testimonials-grid {
		grid-template-columns: 1fr;
	}

	.contact-content {
		flex-direction: column;
	}

	.footer-content {
		flex-direction: column;
		gap: 24px;
		text-align: center;
	}

	.footer-nav {
		flex-wrap: wrap;
		justify-content: center;
	}

	.footer-bottom {
		flex-direction: column;
		gap: 16px;
		text-align: center;
	}
}

@media (max-width: 480px) {
	.hero-title {
		font-size: 2rem;
	}

	.section-title {
		font-size: 2rem;
	}

	.hero-buttons {
		flex-direction: column;
		width: 100%;
	}

	.btn {
		width: 100%;
		text-align: center;
	}
}

.loader-overlay {
	position: fixed;
	inset: 0;
	background: #0a1121;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
	transition: opacity 0.5s;
}

.loader-text {
	font-size: 2.5rem;
	font-weight: bold;
	color: #fff;
	letter-spacing: 0.1em;
	display: flex;
}

.letter {
	opacity: 0;
	transform: translateY(30px);
	animation: loader-fade-in 0.5s forwards;
}

@keyframes loader-fade-in {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Fade out transition for loader */
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-leave-to {
	opacity: 0;
}

/* Loader Background Shapes */
.loader-bg-shapes {
	position: absolute;
	inset: 0;
	pointer-events: none;
}

.shape {
	position: absolute;
	opacity: 0.7;
	animation: fadeInOut 3s ease-in-out infinite;
}

.shape1 {
	top: 10%;
	left: 10%;
	animation-delay: 0s;
}

.shape2 {
	top: 20%;
	right: 10%;
	animation-delay: 0.5s;
}

.shape3 {
	bottom: 10%;
	left: 10%;
	animation-delay: 1s;
}

.shape4 {
	bottom: 20%;
	right: 10%;
	animation-delay: 1.5s;
}

@keyframes fadeInOut {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

/* Animated Underline for Designer */
.underline-animate {
	position: relative;
	display: inline-block;
}
.underline-animate::after {
	content: "";
	position: absolute;
	left: 0;
	bottom: -6px;
	width: 100%;
	height: 6px;
	background: linear-gradient(90deg, #ff4500, #ea580c);
	border-radius: 3px;
	opacity: 0.7;
	animation: underline-slide 2s infinite alternate;
}
@keyframes underline-slide {
	0% {
		width: 0;
		opacity: 0.2;
	}
	60% {
		width: 100%;
		opacity: 0.7;
	}
	100% {
		width: 100%;
		opacity: 0.2;
	}
} /* Floating CTA Button */
.floating-cta {
	margin-top: 32px;
	text-align: left;
}
.pulse {
	animation: pulse 1.5s infinite;
}
@keyframes pulse {
	0% {
		box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.4);
	}
	70% {
		box-shadow: 0 0 0 16px rgba(234, 88, 12, 0);
	}
	100% {
		box-shadow: 0 0 0 0 rgba(234, 88, 12, 0);
	}
}

/* --- Redesigned Skills Section (Tech Card Style) --- */
.skills-section {
	padding: 70px 0 60px 0;
	background: #f8faff;
}
.tech-skills-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 32px;
	justify-content: center;
	margin-top: 0;
}
.tech-block {
	background: #fff;
	border-radius: 18px;
	box-shadow: 0 4px 24px 0 rgba(34, 34, 59, 0.07);
	padding: 32px 28px 24px 28px;
	min-width: 320px;
	max-width: 370px;
	flex: 1 1 320px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	transition: box-shadow 0.18s, transform 0.18s;
	border: 1.5px solid #e0e7ef;
}
.tech-block:hover {
	box-shadow: 0 8px 32px 0 rgba(34, 34, 59, 0.13);
	transform: translateY(-6px) scale(1.025);
	border-color: #b6b6f3;
}
.tech-block h4 {
	font-size: 1.18rem;
	font-weight: 700;
	color: #22223b;
	margin-bottom: 18px;
	display: flex;
	align-items: center;
	gap: 7px;
}
.star-icon {
	color: #3b82f6;
	font-size: 1.2em;
	margin-right: 2px;
	filter: drop-shadow(0 1px 2px #b6b6f3);
}
.tech-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}
.tech-tag {
	background: #f1f5fa;
	color: #22223b;
	font-size: 0.98rem;
	font-weight: 500;
	border-radius: 8px;
	padding: 6px 16px;
	box-shadow: 0 1px 4px 0 #e0e7ef;
	transition: background 0.18s, color 0.18s;
	border: 1px solid #e0e7ef;
	margin-bottom: 4px;
}
.tech-tag:hover {
	background: #3b82f6;
	color: #fff;
	border-color: #3b82f6;
}
@media (max-width: 1100px) {
	.tech-skills-grid {
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}
	.tech-block {
		min-width: 0;
		width: 100%;
		max-width: 500px;
	}
}
@media (max-width: 600px) {
	.skills-section {
		padding: 32px 0 18px 0;
	}
	.tech-block {
		padding: 18px 8px 14px 8px;
		font-size: 0.97rem;
	}
	.tech-block h4 {
		font-size: 1rem;
	}
	.tech-tag {
		font-size: 0.93rem;
		padding: 5px 10px;
	}
}
@media (max-width: 768px) {
	.skills-section {
		padding: 48px 0;
	}
	.skills-grid {
		grid-template-columns: 1fr;
		gap: 24px;
	}
}
</style>
