"use client";

import { useEffect, useRef, useState } from "react";
import {
	AnimatePresence,
	motion,
	useScroll,
	useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { scrollToSection } from "../../hooks/useSmoothScroll";

interface HeroProps {
	ready: boolean;
}

export const heroRotatingWords = [
	"digital experiences",
	"scalable systems",
	"modern interfaces",
	"creative web apps",
	"interactive worlds",
];

const line1 = "Agentic Developer";
const line3 = "that refuse to be ordinary.";

const LETTER_STAGGER = 0.02;
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

interface SplitLineProps {
	text: string;
	ready: boolean;
	delay?: number;
}

function SplitLine({ text, ready, delay = 0.45 }: SplitLineProps) {
	let index = 0;
	return (
		<span className="block overflow-hidden pb-[0.06em]">
			{text.split(" ").map((word, wi) => (
				<span
					key={wi}
					className="mr-[0.24em] inline-block whitespace-nowrap last:mr-0"
				>
					{word.split("").map((char, ci) => {
						const i = index++;
						return (
							<motion.span
								key={ci}
								className="inline-block"
								initial={{ y: "115%" }}
								animate={ready ? { y: "0%" } : { y: "115%" }}
								transition={{
									duration: 0.75,
									ease: [0.33, 1, 0.68, 1],
									delay: delay + i * LETTER_STAGGER,
								}}
							>
								{char}
							</motion.span>
						);
					})}
				</span>
			))}
		</span>
	);
}

interface RotatingPhraseProps {
	words?: string[];
	ready: boolean;
	delay?: number;
}

function RotatingPhrase({
	words = heroRotatingWords,
	ready,
	delay = 0.65,
}: RotatingPhraseProps) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (!ready) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
			return;
		const id = window.setInterval(() => {
			setIndex((v) => (v + 1) % words.length);
		}, 2800);
		return () => window.clearInterval(id);
	}, [ready, words.length]);

	const phrase = words[index];

	return (
		<span
			className="block overflow-hidden pb-[0.08em] font-display uppercase tracking-[-0.03em] text-accent"
			style={{ fontVariationSettings: "'wght' 780, 'wdth' 78" }}
		>
			<motion.span
				className="inline-block"
				initial={{ y: "115%" }}
				animate={ready ? { y: "0%" } : { y: "115%" }}
				transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1], delay }}
			>
				<span className="text-muted mr-[0.24em]">
					crafting
				</span>
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={phrase}
						className="inline-block"
						initial="hidden"
						animate="show"
						exit="exit"
					>
						{phrase.split(" ").map((word, wi) => (
							<span
								key={wi}
								className="mr-[0.22em] inline-block whitespace-nowrap last:mr-0"
							>
								{word.split("").map((char, ci) => (
									<motion.span
										key={ci}
										className="inline-block"
										variants={{
											hidden: { y: "115%", opacity: 0 },
											show: {
												y: "0%",
												opacity: 1,
												transition: {
													duration: 0.35,
													ease: EASE,
													delay:
														(wi * 8 + ci) * 0.018,
												},
											},
											exit: {
												y: "-115%",
												opacity: 0,
												transition: {
													duration: 0.25,
													ease: EASE,
													delay:
														(wi * 8 + ci) * 0.012,
												},
											},
										}}
									>
										{char}
									</motion.span>
								))}
							</span>
						))}
					</motion.span>
				</AnimatePresence>
			</motion.span>
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

	const line1Delay = 0.5;
	const rotatingDelay = line1Delay + line1.length * LETTER_STAGGER;
	const line3Delay = rotatingDelay + 0.25;

	return (
		<section
			id="hero"
			ref={ref}
			className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-transparent px-6 pb-10 pt-28 md:px-10"
			aria-label="Introduction"
		>
			{/* faint grid lines */}
			<div
				className="pointer-events-none absolute inset-0"
				aria-hidden="true"
			>
				<div className="absolute left-1/4 top-0 h-full w-px bg-hair" />
				<div className="absolute left-2/4 top-0 h-full w-px bg-hair" />
				<div className="absolute left-3/4 top-0 h-full w-px bg-hair" />
			</div>

			<motion.div
				style={{ y, opacity }}
				className="relative flex flex-1 flex-col justify-center"
			>
				<h1
					className="font-display text-[clamp(2.8rem,7.5vw,7.8rem)] uppercase leading-[0.92] tracking-[-0.03em] text-fg"
					style={{ fontVariationSettings: "'wght' 780, 'wdth' 78" }}
				>
					<span className="sr-only">
						Agentic Developer crafting digital experiences that
						refuse to be ordinary.
					</span>
					<span aria-hidden="true" className="block">
						<SplitLine
							text={line1}
							ready={ready}
							delay={line1Delay}
						/>
						<span className="block pl-[4vw] md:pl-[10vw]">
							<RotatingPhrase
								ready={ready}
								delay={rotatingDelay}
							/>
						</span>
						<SplitLine
							text={line3}
							ready={ready}
							delay={line3Delay}
						/>
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
							className="group flex items-center gap-3 rounded-full border border-hair px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
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
				className="relative mt-10 flex items-center justify-between border-t border-hair pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
			>
				<span>Agentic Developer</span>
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
