"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSmoothScroll } from "@/src/hooks/useSmoothScroll";
import { Cursor } from "@/src/components/Cursor";
import { Preloader } from "@/src/components/Preloader";
import { Navbar } from "@/src/components/Navbar";
import { Hero } from "@/src/components/sections/Hero";
import { Marquee } from "@/src/components/sections/Marquee";
import { Work } from "@/src/components/sections/Work";
import { About } from "@/src/components/sections/About";
import { Services } from "@/src/components/sections/Services";
import { Certificates } from "@/src/components/sections/Certificates";
import { Testimonials } from "@/src/components/sections/Testimonials";
import { Contact } from "@/src/components/sections/Contact";

const marqueeItems = [
	"Design",
	"Development",
	"Motion",
	"Strategy",
	"Direction",
];

export default function Home() {
	const [loaded, setLoaded] = useState<boolean>(false);
	useSmoothScroll();

	return (
		<div className="relative w-full bg-ink">
			<div className="noise-overlay" aria-hidden="true" />
			<Cursor />

			<AnimatePresence mode="wait">
				{!loaded && (
					<Preloader
						key="preloader"
						onComplete={() => setLoaded(true)}
					/>
				)}
			</AnimatePresence>

			<Navbar ready={loaded} />

			<main>
				<Hero ready={loaded} />

				<div className="border-y border-line bg-ink py-6 md:py-8">
					<Marquee baseVelocity={2.5}>
						{marqueeItems.map((item) => (
							<span
								key={item}
								className="mx-6 flex items-center gap-12 font-display text-4xl uppercase text-cream md:text-6xl"
							>
								{item}
								<motion.span
									className="text-accent"
									animate={{ rotate: 360 }}
									transition={{
										duration: 6,
										repeat: Infinity,
										ease: "linear",
									}}
								>
									✳
								</motion.span>
							</span>
						))}
					</Marquee>
				</div>

				<Work />
				<About />
				<Services />
				<Certificates />
				<Testimonials />
			</main>

			<Contact />
		</div>
	);
}
