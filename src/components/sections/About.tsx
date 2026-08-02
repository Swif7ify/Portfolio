"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealText } from "../RevealText";

const stats = [
	{ value: "4+", label: "Years crafting" },
	{ value: "20+", label: "Projects" },
	{ value: "1", label: "Awards" },
];

export function About() {
	const imgRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: imgRef,
		offset: ["start end", "end start"],
	});
	const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
	const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

	return (
		<section
			id="about"
			className="relative w-full border-t border-line bg-panel px-6 py-24 md:px-10 md:py-36"
			aria-label="About me"
		>
			<div className="grid grid-cols-1 gap-16 md:grid-cols-12">
				<div className="md:col-span-7">
					<p className="mb-8 font-sans text-xs uppercase tracking-[0.3em] text-accent">
						(About) — The human behind the pixels
					</p>
					<RevealText
						text="I'm Earl — a fullstack-developer who believes the best interfaces are felt before they're understood. Every project is a chance to make the web a little less boring."
						className="font-serif text-3xl leading-[1.15] text-cream md:text-5xl"
					/>

					<RevealText
						text="I have a keen interest in game development, leveraging my skills in 3D modeling and programming to create engaging and interactive games. My approach combines creativity with technical expertise, ensuring that every project is not only functional but also visually stunning."
						className="mt-8 max-w-xl font-sans text-base leading-relaxed text-muted"
						delay={0.2}
					/>

					<div className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-8">
						{stats.map((stat, i) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.6,
									delay: i * 0.12,
									ease: [0.33, 1, 0.68, 1],
								}}
							>
								<span className="font-display text-4xl text-cream md:text-6xl">
									{stat.value}
								</span>
								<p className="mt-2 font-sans text-[11px] uppercase tracking-[0.2em] text-muted">
									{stat.label}
								</p>
							</motion.div>
						))}
					</div>
				</div>

				<div className="md:col-span-5">
					<motion.div
						ref={imgRef}
						style={{ rotate }}
						className="sticky top-28 overflow-hidden rounded-sm"
					>
						<motion.img
							src="/EARL_ORDOVEZ.jpg"
							alt="Portrait of Earl Ordovez"
							style={{ y, scale: 1.04 }}
							className="aspect-[3/4] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
							loading="lazy"
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
