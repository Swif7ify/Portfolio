"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { scrollToSection } from "../../hooks/useSmoothScroll";

interface HeroProps {
	ready: boolean;
}

const line1 = "CREATIVE";
const line2 = "DEVELOPER";

function AnimatedLine({
	text,
	ready,
	delay,
}: {
	text: string;
	ready: boolean;
	delay: number;
}) {
	return (
		<span className="block overflow-hidden">
			<span className="flex justify-between">
				{text.split("").map((char, i) => (
					<motion.span
						key={i}
						className="inline-block"
						initial={{ y: "110%", rotate: 6 }}
						animate={ready ? { y: 0, rotate: 0 } : {}}
						transition={{
							duration: 0.9,
							ease: [0.33, 1, 0.68, 1],
							delay: delay + i * 0.035,
						}}
					>
						{char}
					</motion.span>
				))}
			</span>
		</span>
	);
}

export function Hero({ ready }: HeroProps) {
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
	const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

	return (
		<section
			id="hero"
			ref={ref}
			className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-ink px-6 pb-10 pt-28 md:px-10"
			aria-label="Introduction"
		>
			{/* faint grid lines */}
			<div
				className="pointer-events-none absolute inset-0"
				aria-hidden="true"
			>
				<div className="absolute left-1/4 top-0 h-full w-px bg-line/40" />
				<div className="absolute left-2/4 top-0 h-full w-px bg-line/40" />
				<div className="absolute left-3/4 top-0 h-full w-px bg-line/40" />
			</div>

			<motion.div
				style={{ y, opacity }}
				className="relative flex flex-1 flex-col justify-center"
			>
				<div className="mb-6 flex items-center gap-4 overflow-hidden">
					<motion.p
						initial={{ y: "120%" }}
						animate={ready ? { y: 0 } : {}}
						transition={{
							duration: 0.8,
							ease: [0.33, 1, 0.68, 1],
							delay: 0.5,
						}}
						className="font-serif text-xl italic text-muted md:text-2xl"
					>
						Earl Ordovez — OneDev PH
					</motion.p>
				</div>

				<h1 className="font-display text-[17.5vw] uppercase leading-[0.86] tracking-tight text-cream md:text-[15.5vw]">
					<AnimatedLine text={line1} ready={ready} delay={0.55} />
					<span className="block text-accent">
						<AnimatedLine text={line2} ready={ready} delay={0.75} />
					</span>
				</h1>

				<div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={ready ? { opacity: 1, y: 0 } : {}}
						transition={{
							duration: 0.8,
							delay: 1.3,
							ease: [0.33, 1, 0.68, 1],
						}}
						className="max-w-md font-sans text-sm leading-relaxed text-muted md:text-base"
					>
						I design and build immersive digital experiences for
						brands that refuse to be ordinary. Currently crafting
						the web&apos;s next generation of interfaces.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={ready ? { opacity: 1, y: 0 } : {}}
						transition={{
							duration: 0.8,
							delay: 1.45,
							ease: [0.33, 1, 0.68, 1],
						}}
						className="flex items-center gap-4"
					>
						<button
							onClick={() => scrollToSection("#work")}
							data-cursor
							className="group flex items-center gap-3 rounded-full border border-line px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
						>
							Selected Work
							<ArrowDown
								size={14}
								className="transition-transform duration-300 group-hover:translate-y-1"
								aria-hidden="true"
							/>
						</button>
					</motion.div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={ready ? { opacity: 1 } : {}}
				transition={{ delay: 1.8, duration: 1 }}
				className="relative mt-10 flex items-center justify-between border-t border-line pt-4 font-sans text-[11px] uppercase tracking-[0.2em] text-muted"
			>
				<span>Fullstack Developer</span>
				<span className="flex items-center gap-2">
					<span className="relative flex h-2 w-2">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
						<span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
					</span>
					Open for Projects
				</span>
				<span className="hidden md:inline">Scroll to explore</span>
			</motion.div>
		</section>
	);
}
