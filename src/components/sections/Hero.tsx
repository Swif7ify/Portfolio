"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { getImagePath } from "../../utils/image";

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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero({ ready }: HeroProps) {
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	// Subtle parallax on scroll
	const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
	const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
	const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

	return (
		<section
			id="hero"
			ref={ref}
			className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#000000] px-6 pb-10 pt-28 sm:px-10 md:pb-14 lg:px-14"
			aria-label="Introduction"
		>
			{/* Ambient Cobalt/Electric Blue Spotlight Glows */}
			<motion.div
				initial={{ opacity: 0, scale: 0.85 }}
				animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
				transition={{ duration: 1.4, ease: EASE }}
				className="pointer-events-none absolute left-1/2 top-[38%] h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[860px] sm:w-[860px] md:h-[1000px] md:w-[1000px]"
				style={{
					background:
						"radial-gradient(ellipse 65% 55% at 50% 45%, rgba(18, 98, 255, 0.55) 0%, rgba(12, 65, 210, 0.32) 35%, rgba(3, 20, 90, 0.10) 62%, transparent 80%)",
					filter: "blur(75px)",
				}}
				aria-hidden="true"
			/>

			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
				transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
				className="pointer-events-none absolute left-1/2 top-[35%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[480px] sm:w-[480px] md:h-[580px] md:w-[580px]"
				style={{
					background:
						"radial-gradient(circle, rgba(35, 130, 255, 0.72) 0%, rgba(16, 85, 240, 0.40) 40%, transparent 72%)",
					filter: "blur(45px)",
				}}
				aria-hidden="true"
			/>

			{/* Center Stage: Earl's Portrait */}
			<motion.div
				style={{ y: portraitY }}
				initial={{ opacity: 0, y: 35, scale: 0.96 }}
				animate={
					ready
						? { opacity: 1, y: 0, scale: 1 }
						: { opacity: 0, y: 35, scale: 0.96 }
				}
				transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
				className="pointer-events-none absolute left-1/2 top-1/2 z-[2] flex h-[84vh] max-h-[1020px] w-[90vw] max-w-[760px] -translate-x-1/2 -translate-y-[47%] items-start justify-center sm:w-[76vw] md:w-[56vw] lg:w-[50vw]"
			>
				<div
					className="relative h-full w-full"
					style={{
						WebkitMaskImage:
							"linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 10%, black 26%, black 100%)",
						maskImage:
							"linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 10%, black 26%, black 100%)",
					}}
				>
					<Image
						src={getImagePath("/earl-portrait-cutout.png")}
						alt="Earl Romeo Ordovez — Agentic Developer"
						fill
						priority
						sizes="(max-width: 768px) 88vw, 50vw"
						className="object-contain object-top"
					/>
				</div>
			</motion.div>

			{/* Vignette fade at very bottom to guarantee seamless blend */}
			<div
				className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-28 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent"
				aria-hidden="true"
			/>

			{/* Bottom Content Grid */}
			<motion.div
				style={{ y: contentY, opacity }}
				className="relative z-10 flex w-full flex-col justify-between gap-8 md:flex-row md:items-end md:gap-12"
			>
				{/* Left Block: Greeting, Huge Name & Title, Status Badge */}
				<div className="flex max-w-2xl flex-col">
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
						className="font-serif text-2xl italic tracking-tight text-[#edeae1] sm:text-3xl md:text-4xl"
					>
						Hi, I&apos;m
					</motion.span>

					<motion.h1
						initial={{ opacity: 0, y: 24 }}
						animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
						transition={{ duration: 0.85, delay: 0.55, ease: EASE }}
						className="mt-1 font-display font-black uppercase leading-[0.92] tracking-[-0.04em] text-white"
					>
						<span className="block text-[clamp(2.8rem,6.4vw,6.4rem)]">
							EARL,
						</span>
						<span className="block pl-6 text-[clamp(2rem,4.4vw,4.4rem)] text-white sm:pl-10 md:pl-14">
							AGENTIC DEVELOPER
						</span>
					</motion.h1>

					<motion.div
						initial={{ opacity: 0, y: 16 }}
						animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
						transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
						className="mt-5 flex items-center gap-3 sm:mt-6 sm:gap-3.5"
					>
						<span className="font-serif text-xl italic text-[#cdc9b7] sm:text-2xl md:text-[26px]">
							Working at
						</span>
						<span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 font-sans text-xs font-bold tracking-tight text-black shadow-[0_4px_16px_rgba(255,255,255,0.18)] transition-transform duration-300 hover:scale-105 sm:text-sm">
							OneDev
						</span>
					</motion.div>
				</div>

				{/* Right Block: Editorial Bio Paragraph */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
					className="max-w-md pb-1 text-xs leading-relaxed text-[#8f9ea9] sm:text-sm md:text-[15px]"
				>
					<p>
						Logic showed me how things work; design showed me why
						they matter. Building scalable systems and intuitive
						digital experiences that balance clarity, function, and
						emotion.
					</p>
				</motion.div>
			</motion.div>
		</section>
	);
}
