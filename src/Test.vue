<template>
	<div class="min-h-screen">
		<!-- Navigation -->
		<header class="py-6 px-4 md:px-8 lg:px-16">
			<div class="container mx-auto flex justify-between items-center">
				<a href="#" class="text-2xl font-bold">DESIGNER</a>

				<nav class="hidden md:flex space-x-8">
					<a
						href="#work"
						class="hover:text-orange-500 transition-colors"
						@click="smoothScroll"
						>Work</a
					>
					<a
						href="#about"
						class="hover:text-orange-500 transition-colors"
						@click="smoothScroll"
						>About</a
					>
					<a
						href="#services"
						class="hover:text-orange-500 transition-colors"
						@click="smoothScroll"
						>Services</a
					>
					<a
						href="#contact"
						class="hover:text-orange-500 transition-colors"
						@click="smoothScroll"
						>Contact</a
					>
				</nav>

				<button class="md:hidden" @click="toggleMobileMenu">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</button>
			</div>

			<!-- Mobile Menu -->
			<div v-show="mobileMenuOpen" class="md:hidden mt-4 space-y-2">
				<a
					href="#work"
					class="block text-gray-300 hover:text-orange-500 transition-colors"
					@click="smoothScroll"
					>Work</a
				>
				<a
					href="#about"
					class="block text-gray-300 hover:text-orange-500 transition-colors"
					@click="smoothScroll"
					>About</a
				>
				<a
					href="#services"
					class="block text-gray-300 hover:text-orange-500 transition-colors"
					@click="smoothScroll"
					>Services</a
				>
				<a
					href="#contact"
					class="block text-gray-300 hover:text-orange-500 transition-colors"
					@click="smoothScroll"
					>Contact</a
				>
			</div>
		</header>

		<!-- Hero Section -->
		<section class="py-20 px-4 md:px-8 lg:px-16">
			<div class="container mx-auto">
				<div class="flex flex-col md:flex-row items-center">
					<div class="md:w-1/2 mb-10 md:mb-0">
						<h1
							class="text-5xl md:text-7xl font-bold leading-tight mb-6"
						>
							UI/UX <span class="accent">Designer</span> &
							Creative Director
						</h1>

						<p class="text-xl text-gray-300 mb-8">
							Creating exceptional digital experiences that blend
							aesthetics with functionality to solve real user
							problems.
						</p>

						<div class="flex flex-wrap gap-4">
							<a
								href="#work"
								class="px-8 py-3 bg-orange-600 text-white font-medium rounded-full hover:bg-orange-700 transition-colors"
								@click="smoothScroll"
							>
								View My Work
							</a>
							<a
								href="#contact"
								class="px-8 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
								@click="smoothScroll"
							>
								Get In Touch
							</a>
						</div>
					</div>

					<div class="md:w-1/2 md:pl-10">
						<div class="relative">
							<div
								class="w-full h-80 md:h-96 bg-gradient-to-br from-orange-600 to-orange-400 rounded-2xl flex items-center justify-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-32 w-32 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1"
										d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									></path>
								</svg>
							</div>
						</div>
					</div>
				</div>

				<div
					class="mt-20 flex flex-wrap justify-center gap-10 md:gap-20"
				>
					<div class="text-center">
						<p class="text-4xl font-bold">10+</p>
						<p class="text-gray-400">Years Experience</p>
					</div>
					<div class="text-center">
						<p class="text-4xl font-bold">150+</p>
						<p class="text-gray-400">Projects Completed</p>
					</div>
					<div class="text-center">
						<p class="text-4xl font-bold">30+</p>
						<p class="text-gray-400">Design Awards</p>
					</div>
					<div class="text-center">
						<p class="text-4xl font-bold">98%</p>
						<p class="text-gray-400">Client Satisfaction</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Work Section -->
		<section id="work" class="py-20 px-4 md:px-8 lg:px-16 bg-black">
			<div class="container mx-auto">
				<div class="mb-12">
					<h2 class="text-4xl md:text-5xl font-bold mb-6">
						Featured <span class="accent">Projects</span>
					</h2>
					<p class="text-xl text-gray-300 max-w-3xl">
						A selection of my award-winning work across various
						industries and design challenges.
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<!-- Project 1 -->
					<div
						class="project-card bg-zinc-900 rounded-xl overflow-hidden"
					>
						<div
							class="h-64 bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-20 w-20 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
								></path>
							</svg>
						</div>
						<div class="p-6">
							<span
								class="text-orange-500 text-sm font-medium uppercase tracking-wider"
								>Mobile App</span
							>
							<h3 class="text-2xl font-bold mt-2">
								FinTech Revolution
							</h3>
							<p class="text-gray-400 mt-2 mb-4">
								Redesigned a leading financial app, increasing
								user engagement by 45% and improving conversion
								rates.
							</p>
							<div class="flex flex-wrap gap-2">
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>UX Research</span
								>
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>UI Design</span
								>
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>Prototyping</span
								>
							</div>
						</div>
					</div>

					<!-- Project 2 -->
					<div
						class="project-card bg-zinc-900 rounded-xl overflow-hidden"
					>
						<div
							class="h-64 bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-20 w-20 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
								></path>
							</svg>
						</div>
						<div class="p-6">
							<span
								class="text-orange-500 text-sm font-medium uppercase tracking-wider"
								>E-commerce</span
							>
							<h3 class="text-2xl font-bold mt-2">
								Luxury Retail Platform
							</h3>
							<p class="text-gray-400 mt-2 mb-4">
								Created an immersive shopping experience for a
								luxury brand, resulting in 60% increase in time
								spent on site.
							</p>
							<div class="flex flex-wrap gap-2">
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>UX Design</span
								>
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>Visual Design</span
								>
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>Animation</span
								>
							</div>
						</div>
					</div>

					<!-- Project 3 -->
					<div
						class="project-card bg-zinc-900 rounded-xl overflow-hidden"
					>
						<div
							class="h-64 bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-20 w-20 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								></path>
							</svg>
						</div>
						<div class="p-6">
							<span
								class="text-orange-500 text-sm font-medium uppercase tracking-wider"
								>Dashboard</span
							>
							<h3 class="text-2xl font-bold mt-2">
								Analytics Platform
							</h3>
							<p class="text-gray-400 mt-2 mb-4">
								Designed an intuitive analytics dashboard that
								simplified complex data visualization for
								non-technical users.
							</p>
							<div class="flex flex-wrap gap-2">
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>Information Architecture</span
								>
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>Data Visualization</span
								>
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>UI Design</span
								>
							</div>
						</div>
					</div>

					<!-- Project 4 -->
					<div
						class="project-card bg-zinc-900 rounded-xl overflow-hidden"
					>
						<div
							class="h-64 bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-20 w-20 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								></path>
							</svg>
						</div>
						<div class="p-6">
							<span
								class="text-orange-500 text-sm font-medium uppercase tracking-wider"
								>Health Tech</span
							>
							<h3 class="text-2xl font-bold mt-2">
								Wellness Tracker
							</h3>
							<p class="text-gray-400 mt-2 mb-4">
								Created a user-friendly health monitoring app
								that simplifies tracking daily wellness metrics.
							</p>
							<div class="flex flex-wrap gap-2">
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>UX Design</span
								>
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>Data Visualization</span
								>
								<span
									class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs"
									>UI Design</span
								>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-12 text-center">
					<a
						href="#"
						class="inline-block px-8 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
					>
						View All Projects
					</a>
				</div>
			</div>
		</section>

		<!-- About Section -->
		<section id="about" class="py-20 px-4 md:px-8 lg:px-16">
			<div class="container mx-auto">
				<div class="flex flex-col md:flex-row items-center">
					<div class="md:w-1/2 mb-10 md:mb-0">
						<div
							class="w-full h-80 md:h-96 bg-zinc-900 rounded-2xl flex items-center justify-center"
						>
							<div
								class="w-48 h-48 rounded-full bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-24 w-24 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									></path>
								</svg>
							</div>
						</div>
					</div>

					<div class="md:w-1/2 md:pl-12">
						<h2 class="text-4xl md:text-5xl font-bold mb-6">
							About <span class="accent">Me</span>
						</h2>
						<p class="text-xl text-gray-300 mb-6">
							I'm a passionate UI/UX designer with over 10 years
							of experience creating user-centered digital
							experiences. My approach combines aesthetic
							sensibility with a deep understanding of user
							behavior to create designs that are both beautiful
							and functional.
						</p>
						<p class="text-xl text-gray-300 mb-8">
							I believe that great design is invisible – it should
							feel intuitive and natural to the user. My goal is
							to solve complex problems with simple, elegant
							solutions that delight users and help businesses
							achieve their objectives.
						</p>

						<h3 class="text-2xl font-bold mb-4">My Skills</h3>
						<div class="flex flex-wrap gap-3 mb-8">
							<span
								class="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium"
								>UI Design</span
							>
							<span
								class="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium"
								>UX Research</span
							>
							<span
								class="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium"
								>Wireframing</span
							>
							<span
								class="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium"
								>Prototyping</span
							>
							<span
								class="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium"
								>User Testing</span
							>
							<span
								class="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium"
								>Design Systems</span
							>
						</div>

						<a
							href="#"
							class="inline-block px-8 py-3 bg-orange-600 text-white font-medium rounded-full hover:bg-orange-700 transition-colors"
						>
							Download Resume
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Services Section -->
		<section id="services" class="py-20 px-4 md:px-8 lg:px-16 bg-black">
			<div class="container mx-auto">
				<div class="text-center mb-16">
					<h2 class="text-4xl md:text-5xl font-bold mb-6">
						My <span class="accent">Services</span>
					</h2>
					<p class="text-xl text-gray-300 max-w-3xl mx-auto">
						I offer a comprehensive range of design services to help
						businesses create exceptional digital experiences.
					</p>
				</div>

				<div
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					<!-- Service 1 -->
					<div class="bg-zinc-900 p-8 rounded-xl">
						<div
							class="w-16 h-16 bg-orange-600/20 rounded-lg flex items-center justify-center mb-6"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 text-orange-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								></path>
							</svg>
						</div>
						<h3 class="text-2xl font-bold mb-4">UI Design</h3>
						<p class="text-gray-400">
							Creating visually stunning interfaces that align
							with your brand identity and provide a seamless user
							experience.
						</p>
					</div>

					<!-- Service 2 -->
					<div class="bg-zinc-900 p-8 rounded-xl">
						<div
							class="w-16 h-16 bg-orange-600/20 rounded-lg flex items-center justify-center mb-6"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 text-orange-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
								></path>
							</svg>
						</div>
						<h3 class="text-2xl font-bold mb-4">UX Research</h3>
						<p class="text-gray-400">
							Conducting in-depth user research to understand your
							audience's needs, behaviors, and pain points.
						</p>
					</div>

					<!-- Service 3 -->
					<div class="bg-zinc-900 p-8 rounded-xl">
						<div
							class="w-16 h-16 bg-orange-600/20 rounded-lg flex items-center justify-center mb-6"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 text-orange-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
								></path>
							</svg>
						</div>
						<h3 class="text-2xl font-bold mb-4">Design Systems</h3>
						<p class="text-gray-400">
							Building comprehensive design systems that ensure
							consistency and scalability across all your digital
							products.
						</p>
					</div>

					<!-- Service 4 -->
					<div class="bg-zinc-900 p-8 rounded-xl">
						<div
							class="w-16 h-16 bg-orange-600/20 rounded-lg flex items-center justify-center mb-6"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 text-orange-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
								></path>
							</svg>
						</div>
						<h3 class="text-2xl font-bold mb-4">Prototyping</h3>
						<p class="text-gray-400">
							Creating interactive prototypes that allow you to
							test and validate your ideas before development.
						</p>
					</div>

					<!-- Service 5 -->
					<div class="bg-zinc-900 p-8 rounded-xl">
						<div
							class="w-16 h-16 bg-orange-600/20 rounded-lg flex items-center justify-center mb-6"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 text-orange-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
								></path>
							</svg>
						</div>
						<h3 class="text-2xl font-bold mb-4">
							Responsive Design
						</h3>
						<p class="text-gray-400">
							Ensuring your digital products look and function
							perfectly across all devices and screen sizes.
						</p>
					</div>

					<!-- Service 6 -->
					<div class="bg-zinc-900 p-8 rounded-xl">
						<div
							class="w-16 h-16 bg-orange-600/20 rounded-lg flex items-center justify-center mb-6"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 text-orange-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								></path>
							</svg>
						</div>
						<h3 class="text-2xl font-bold mb-4">
							Design to Development
						</h3>
						<p class="text-gray-400">
							Collaborating with development teams to ensure
							designs are implemented accurately and efficiently.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Testimonials Section -->
		<section class="py-20 px-4 md:px-8 lg:px-16">
			<div class="container mx-auto">
				<div class="text-center mb-16">
					<h2 class="text-4xl md:text-5xl font-bold mb-6">
						Client <span class="accent">Testimonials</span>
					</h2>
					<p class="text-xl text-gray-300 max-w-3xl mx-auto">
						Don't just take my word for it. Here's what my clients
						have to say about working with me.
					</p>
				</div>

				<div
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					<!-- Testimonial 1 -->
					<div class="bg-zinc-900 p-8 rounded-xl">
						<div class="flex items-center mb-6">
							<div
								class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl"
							>
								S
							</div>
							<div class="ml-4">
								<h4 class="font-bold">Sarah Johnson</h4>
								<p class="text-gray-400 text-sm">
									CEO, TechStart
								</p>
							</div>
						</div>
						<p class="text-gray-300">
							"Working with this designer was a game-changer for
							our product. They understood our vision perfectly
							and delivered a design that exceeded our
							expectations. Our user engagement has increased by
							40% since the redesign."
						</p>
					</div>

					<!-- Testimonial 2 -->
					<div class="bg-zinc-900 p-8 rounded-xl">
						<div class="flex items-center mb-6">
							<div
								class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl"
							>
								M
							</div>
							<div class="ml-4">
								<h4 class="font-bold">Michael Chen</h4>
								<p class="text-gray-400 text-sm">
									Product Manager, FinanceApp
								</p>
							</div>
						</div>
						<p class="text-gray-300">
							"The attention to detail and user-centered approach
							was impressive. They didn't just make our app look
							better, they made it work better for our users. The
							design process was collaborative and insightful."
						</p>
					</div>

					<!-- Testimonial 3 -->
					<div class="bg-zinc-900 p-8 rounded-xl">
						<div class="flex items-center mb-6">
							<div
								class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl"
							>
								A
							</div>
							<div class="ml-4">
								<h4 class="font-bold">Amanda Rodriguez</h4>
								<p class="text-gray-400 text-sm">
									Marketing Director, LuxuryBrand
								</p>
							</div>
						</div>
						<p class="text-gray-300">
							"Our e-commerce platform needed a complete overhaul,
							and this designer delivered beyond our expectations.
							The new design not only looks stunning but has
							significantly improved our conversion rates."
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Contact Section -->
		<section id="contact" class="py-20 px-4 md:px-8 lg:px-16 bg-black">
			<div class="container mx-auto">
				<div class="flex flex-col md:flex-row">
					<div class="md:w-1/2 mb-10 md:mb-0">
						<h2 class="text-4xl md:text-5xl font-bold mb-6">
							Let's <span class="accent">Connect</span>
						</h2>
						<p class="text-xl text-gray-300 mb-8">
							Have a project in mind? Let's discuss how I can help
							bring your vision to life. Fill out the form and
							I'll get back to you within 24 hours.
						</p>

						<div class="flex flex-col space-y-4">
							<div class="flex items-center">
								<div
									class="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mr-4"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-orange-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										></path>
									</svg>
								</div>
								<span class="text-gray-300"
									>hello@designerportfolio.com</span
								>
							</div>

							<div class="flex items-center">
								<div
									class="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mr-4"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-orange-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
										></path>
									</svg>
								</div>
								<span class="text-gray-300"
									>+1 (555) 123-4567</span
								>
							</div>

							<div class="flex items-center">
								<div
									class="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mr-4"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-orange-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										></path>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										></path>
									</svg>
								</div>
								<span class="text-gray-300"
									>San Francisco, CA</span
								>
							</div>
						</div>

						<div class="mt-8 flex space-x-6">
							<a
								href="#"
								class="text-gray-400 hover:text-orange-500 transition-colors"
							>
								<svg
									class="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									></path>
								</svg>
							</a>
							<a
								href="#"
								class="text-gray-400 hover:text-orange-500 transition-colors"
							>
								<svg
									class="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
									></path>
								</svg>
							</a>
							<a
								href="#"
								class="text-gray-400 hover:text-orange-500 transition-colors"
							>
								<svg
									class="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"
									></path>
								</svg>
							</a>
							<a
								href="#"
								class="text-gray-400 hover:text-orange-500 transition-colors"
							>
								<svg
									class="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"
									></path>
								</svg>
							</a>
						</div>
					</div>

					<div class="md:w-1/2 md:pl-12">
						<form
							class="bg-zinc-900 p-8 rounded-xl"
							@submit.prevent="submitForm"
						>
							<div class="mb-6">
								<label
									for="name"
									class="block text-gray-300 mb-2"
									>Name</label
								>
								<input
									type="text"
									id="name"
									v-model="form.name"
									class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
									placeholder="Your name"
								/>
							</div>

							<div class="mb-6">
								<label
									for="email"
									class="block text-gray-300 mb-2"
									>Email</label
								>
								<input
									type="email"
									id="email"
									v-model="form.email"
									class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
									placeholder="Your email"
								/>
							</div>

							<div class="mb-6">
								<label
									for="subject"
									class="block text-gray-300 mb-2"
									>Subject</label
								>
								<input
									type="text"
									id="subject"
									v-model="form.subject"
									class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
									placeholder="Subject"
								/>
							</div>

							<div class="mb-6">
								<label
									for="message"
									class="block text-gray-300 mb-2"
									>Message</label
								>
								<textarea
									id="message"
									rows="5"
									v-model="form.message"
									class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
									placeholder="Your message"
								></textarea>
							</div>

							<button
								type="submit"
								class="w-full bg-orange-600 text-white font-medium py-3 rounded-lg hover:bg-orange-700 transition-colors"
							>
								Send Message
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>

		<!-- Footer -->
		<footer class="py-12 px-4 md:px-8 lg:px-16 border-t border-zinc-800">
			<div class="container mx-auto">
				<div
					class="flex flex-col md:flex-row justify-between items-center"
				>
					<div class="mb-6 md:mb-0">
						<a href="#" class="text-2xl font-bold">DESIGNER</a>
						<p class="text-gray-400 mt-2">
							Creating exceptional digital experiences.
						</p>
					</div>

					<div class="flex flex-wrap gap-8">
						<a
							href="#work"
							class="text-gray-300 hover:text-orange-500 transition-colors"
							@click="smoothScroll"
							>Work</a
						>
						<a
							href="#about"
							class="text-gray-300 hover:text-orange-500 transition-colors"
							@click="smoothScroll"
							>About</a
						>
						<a
							href="#services"
							class="text-gray-300 hover:text-orange-500 transition-colors"
							@click="smoothScroll"
							>Services</a
						>
						<a
							href="#contact"
							class="text-gray-300 hover:text-orange-500 transition-colors"
							@click="smoothScroll"
							>Contact</a
						>
					</div>
				</div>

				<div
					class="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center"
				>
					<p class="text-gray-400 mb-4 md:mb-0">
						© 2023 Designer Portfolio. All rights reserved.
					</p>

					<div class="flex space-x-6">
						<a
							href="#"
							class="text-gray-400 hover:text-orange-500 transition-colors"
						>
							<svg
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								></path>
							</svg>
						</a>
						<a
							href="#"
							class="text-gray-400 hover:text-orange-500 transition-colors"
						>
							<svg
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
								></path>
							</svg>
						</a>
						<a
							href="#"
							class="text-gray-400 hover:text-orange-500 transition-colors"
						>
							<svg
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"
								></path>
							</svg>
						</a>
						<a
							href="#"
							class="text-gray-400 hover:text-orange-500 transition-colors"
						>
							<svg
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"
								></path>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { ref } from "vue";

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

<style scoped>
/* Import all Tailwind CSS utilities */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

body {
	background-color: #111111;
	color: #ffffff;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
		Roboto, sans-serif;
}

.accent {
	color: #ff4500;
}

.project-card {
	transition: transform 0.3s ease;
}

.project-card:hover {
	transform: translateY(-10px);
}

.container {
	width: 100%;
}

@media (min-width: 640px) {
	.container {
		max-width: 640px;
	}
}

@media (min-width: 768px) {
	.container {
		max-width: 768px;
	}
}

@media (min-width: 1024px) {
	.container {
		max-width: 1024px;
	}
}

@media (min-width: 1280px) {
	.container {
		max-width: 1280px;
	}
}

@media (min-width: 1536px) {
	.container {
		max-width: 1536px;
	}
}
</style>
